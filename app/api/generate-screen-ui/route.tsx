import { groq } from "@/config/groq";
import { geminiModel } from "@/config/gemini"; // ⭐ Re-added for safety
import { DEEPSEEK_CONFIG } from "@/config/deepseek"; // ⭐ Official DeepSeek
import { GENERATION_SCREEN_PROMPT } from "@/data/Prompt";
import { db } from "@/config/db";
import { ScreenConfig, usersTable } from "@/config/schema";
import { and, eq, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { buildThemePrompt, resolveThemeKey } from "@/data/Themes";
import { formatExistingScreenCodeForPrompt, serializeScreenCodePayload } from "@/lib/screen-code";

/* =====================================================
   SAFE JSON PARSER (handles bad AI outputs)
===================================================== */
function safeParseJSON(text: string) {
  try {
    // 1. First attempt: direct parse
    return JSON.parse(text);
  } catch {
    // 2. Second attempt: cleanup code blocks
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      // 3. Third attempt: try to extract JSON with regex if there's surrounding text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch {
          // If all JSON parsing fails, but we have text, return it as code
          console.warn("Regex JSON match failed to parse. Returning raw text as code.");
          return { code: text, css: "" };
        }
      }
      
      console.error("❌ ALL JSON PARSE ATTEMPTS FAILED:\n", text);
      throw new Error("AI returned invalid JSON structure");
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    /* ---------- BODY ---------- */
    const body = await req.json();

    const {
      projectId,
      screenId,
      screenName,
      purpose,
      screenDescription,
      projectVisualDescription,
      theme: themeKey,
      existingCode,
      deviceType,
    } = body;

    /* ---------- VALIDATION ---------- */
    if (!projectId || !screenId) {
      return NextResponse.json(
        { success: false, error: "Missing projectId or screenId" },
        { status: 400 }
      );
    }

    /* ---------- USER & CREDIT CHECK ---------- */

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userData || userData.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if ((userData[0].credits ?? 0) <= 0) {
      return NextResponse.json(
        { success: false, error: "Insufficient credits" },
        { status: 403 }
      );
    }

    /* ---------- BUILD PROMPT ---------- */
    const resolvedTheme = resolveThemeKey(themeKey);
    const themePrompt = buildThemePrompt(resolvedTheme);

    let userInput = `
Screen Name: ${screenName}
Screen Purpose: ${purpose}
Screen Description: ${screenDescription}
Project Visual Style: ${projectVisualDescription ?? "modern UI"}
Theme Context:
${themePrompt}
Device Context: ${deviceType ?? "Desktop"}

Theme Usage Rules:
- Use semantic theme classes like bg-background, text-foreground, bg-card, text-card-foreground, bg-primary, text-primary-foreground, bg-secondary, text-secondary-foreground, border-border, text-muted-foreground, and ring-ring.
- Avoid hardcoded utility colors such as indigo, purple, pink, blue, rose, emerald, zinc, slate, etc.
- If you need custom gradients or glow effects, derive them from var(--primary), var(--accent), var(--secondary), and rgba(var(--primary-rgb), ...).
`;

    if (existingCode) {
      const existingScreenCode = formatExistingScreenCodeForPrompt(existingCode);
      userInput += `\n\nEXISTING SCREEN TO MODIFY:\n${existingScreenCode || existingCode}\n\nUSER REQUEST: ${screenDescription}`;
    }

    /* ---------- AI CALL ---------- */

    console.log("🚀 STARTING UI GENERATION FOR:", screenId);
    console.log("DEBUG: DEEPSEEK_API_KEY exists:", !!DEEPSEEK_CONFIG.apiKey);
    if (DEEPSEEK_CONFIG.apiKey) {
        console.log("DEBUG: DEEPSEEK_API_KEY prefix:", DEEPSEEK_CONFIG.apiKey.substring(0, 5) + "...");
    }

    const systemPrompt =
      GENERATION_SCREEN_PROMPT +
      "\n\nIMPORTANT: Respond ONLY in valid JSON format. NO markdown code blocks (no ```json). The 'code' field must contain the full HTML markup. The 'css' field must contain any supporting plain CSS rules.";

    let aiResult;
    try {
      // 🥇 PRIMARY: Official DeepSeek V3 (High Quality UI Expert)
      console.log("🚀 PRIMARY: Official DeepSeek (deepseek-chat)");
      if (DEEPSEEK_CONFIG.apiKey) {
        const response = await fetch(`${DEEPSEEK_CONFIG.baseURL}/chat/completions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: DEEPSEEK_CONFIG.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userInput },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("❌ DEEPSEEK API ERROR STATUS:", response.status);
          console.error("❌ DEEPSEEK API ERROR BODY:", JSON.stringify(errorData, null, 2));
          throw new Error(`DeepSeek API failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const deepSeekData = await response.json();
        
        aiResult = deepSeekData.choices[0].message.content;
      } else {
        throw new Error("Missing DEEPSEEK_API_KEY");
      }
    } catch (deepSeekErr: any) {
      console.warn("⚠️ OFFICIAL DEEPSEEK FAILED, FALLING BACK TO GROQ:", deepSeekErr?.message);

      try {
        // 🥈 SECONDARY: Groq Llama 3.3 70B (Fast Backup)
        console.log("🚀 SECONDARY: Groq Llama 3.3 70B");
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInput },
          ],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" },
          temperature: 0.85,
          max_tokens: 8192,
        });
        aiResult = chatCompletion.choices[0].message.content;
      } catch (aiErr: any) {
        console.warn("⚠️ GROQ FAILED, FALLING BACK TO GEMINI:", aiErr?.message);

        // 🥉 TERTIARY: Gemini 1.5 Flash (Safety Net)
        try {
          console.log("🚀 TERTIARY: Gemini 1.5 Flash (UI Safety Net)");
          const result = await geminiModel.generateContent({
            contents: [
              { role: "user", parts: [{ text: systemPrompt + "\n\n" + userInput }] }
            ],
            generationConfig: {
              maxOutputTokens: 8192,
              temperature: 0.8,
              responseMimeType: "application/json",
            },
          });
          aiResult = result.response.text();
        } catch (geminiErr: any) {
          console.error("❌ ALL AI ATTEMPTS FAILED (DeepSeek, Groq, & Gemini):", geminiErr);
          throw new Error(`All providers failed. Last error: ${geminiErr.message}`);
        }
      }
    }

    if (!aiResult) {
      throw new Error("AI returned an empty response");
    }

    console.log("✅ AI RESPONSE RECEIVED (length):", aiResult.length);

    /* ---------- PARSE AI OUTPUT ---------- */

    let parsed: any;
    try {
      parsed = safeParseJSON(aiResult);
    } catch {
      console.warn("AI returned non-JSON. Saving raw output.");
      parsed = { code: aiResult, css: "" };
    }

    let html: string = parsed.code || parsed.html || "";
    let css: string = parsed.css || "";
    
    if (!html && typeof aiResult === 'string' && aiResult.length > 50) {
        // If we have a long string but no 'code' field, the whole string might be the code
        // Or it might be the JSON that we failed to extract from
        html = aiResult;
    }

    if (!html) {
        throw new Error("AI failed to generate any code in the response");
    }

    const code = serializeScreenCodePayload({ html, css });

    /* ---------- DB UPDATE ---------- */

    const updateResult = await db
      .update(ScreenConfig)
      .set({ code })
      .where(
        and(
          eq(ScreenConfig.projectId, projectId),
          eq(ScreenConfig.screenId, screenId)
        )
      )
      .returning();

    /* ---------- DEDUCT CREDIT ---------- */

    await db
      .update(usersTable)
      .set({ credits: sql`${usersTable.credits} - 1` })
      .where(eq(usersTable.email, email));

    console.log(`✅ Credit deducted for user: ${email} (Screen UI)`);

    /* ---------- RESPONSE ---------- */

    return NextResponse.json({
      success: true,
      data: updateResult,
    });
  } catch (error) {
    console.error("🔥 GENERATE SCREEN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate screen",
      },
      { status: 500 }
    );
  }
}
