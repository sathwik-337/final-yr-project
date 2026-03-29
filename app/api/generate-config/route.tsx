import { groq } from "@/config/groq";
import { geminiModel } from "@/config/gemini"; // ⭐ Re-added for safety
import { DEEPSEEK_CONFIG } from "@/config/deepseek"; // ⭐ Official DeepSeek
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import { db } from "@/config/db";
import { ScreenConfig, usersTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

/* =========================================================
   ✅ SAFE JSON PARSER (AI OUTPUT PROTECTION)
========================================================= */

function safeParseJSON(text: string) {
  try {
    // 1. Direct parse
    return JSON.parse(text);
  } catch (err) {
    // 2. Cleanup and retry
    let repaired = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    try {
      return JSON.parse(repaired);
    } catch (err2) {
      // 3. Extract JSON with regex
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch {
          console.error("❌ ALL JSON PARSE ATTEMPTS FAILED:\n", text);
          throw new Error("AI returned invalid JSON structure");
        }
      }
      throw new Error("AI returned invalid JSON structure");
    }
  }
}

/* =========================================================
   ✅ ROUTE HANDLER
========================================================= */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userInput, deviceType, projectId, theme } = body;

    /* ---------- VALIDATION ---------- */

    if (!projectId || !deviceType || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------- USER & CREDIT CHECK ---------- */

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!userData || userData.length === 0) {
      console.warn("User not found in database:", email);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userCredits = userData[0].credits ?? 0;
    console.log(`User credits for ${email}: ${userCredits}`);

    if (userCredits <= 0) {
      console.error("Insufficient credits for user:", email);
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    /* ---------- AI REQUEST ---------- */

    console.log("🚀 STARTING CONFIG GENERATION FOR:", projectId);
    console.log("DEBUG: DEEPSEEK_API_KEY exists:", !!DEEPSEEK_CONFIG.apiKey);
    if (DEEPSEEK_CONFIG.apiKey) {
        console.log("DEBUG: DEEPSEEK_API_KEY prefix:", DEEPSEEK_CONFIG.apiKey.substring(0, 5) + "...");
    }

    const systemPrompt =
      APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType).replace(
        "{theme}",
        theme || "AURORA_INK"
      ) +
      `
      CRITICAL OUTPUT RULES:
      - Output ONLY a VALID JSON object
      - NO markdown code blocks (no \`\`\`json)
      - NO preamble or postscript text
      - JSON must follow the specified structure exactly
      `;

    let aiResult;
    try {
      // 🥇 PRIMARY: Official DeepSeek V3 (High Quality Planning)
      console.log("🚀 PRIMARY: Official DeepSeek (deepseek-chat - Config)");
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
          console.error("❌ DEEPSEEK CONFIG API ERROR STATUS:", response.status);
          console.error("❌ DEEPSEEK CONFIG API ERROR BODY:", JSON.stringify(errorData, null, 2));
          throw new Error(`DeepSeek API failed with status ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const deepSeekData = await response.json();
        
        aiResult = deepSeekData.choices[0].message.content;
      } else {
        throw new Error("Missing DEEPSEEK_API_KEY");
      }
    } catch (deepSeekErr: any) {
      console.warn("⚠️ OFFICIAL DEEPSEEK FAILED (Config), FALLING BACK TO GROQ:", deepSeekErr?.message);

      try {
        // 🥈 SECONDARY: Groq Llama 3.3 70B (Fast Backup)
        console.log("🚀 SECONDARY: Groq Llama 3.3 70B (Config)");
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInput },
          ],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" },
          temperature: 0.7,
          max_tokens: 4096,
        });
        aiResult = chatCompletion.choices[0].message.content;
      } catch (aiErr: any) {
        console.warn("⚠️ GROQ FAILED (Config), FALLING BACK TO GEMINI:", aiErr?.message);

        // 🥉 TERTIARY: Gemini 1.5 Flash (Safety Net)
        try {
          console.log("🚀 TERTIARY: Gemini 1.5 Flash (Config Safety Net)");
          const result = await geminiModel.generateContent({
            contents: [
              { role: "user", parts: [{ text: systemPrompt + "\n\n" + userInput }] }
            ],
            generationConfig: {
              maxOutputTokens: 4096,
              temperature: 0.7,
              responseMimeType: "application/json",
            },
          });
          aiResult = result.response.text();
        } catch (geminiErr: any) {
          console.error("❌ ALL AI ATTEMPTS FAILED (Config):", geminiErr);
          throw new Error(`All providers (DeepSeek, Groq, Gemini) failed for config. Last error: ${geminiErr.message}`);
        }
      }
    }

    if (!aiResult) {
      throw new Error("AI returned an empty response");
    }

    console.log("✅ AI RESPONSE RECEIVED (length):", aiResult.length);

    /* ---------- SAFE JSON PARSE ---------- */

    const jsonData = safeParseJSON(aiResult);

    /* ---------- VALIDATE SCREENS ---------- */

    const screens = jsonData?.screens ?? [];

    if (!Array.isArray(screens) || screens.length === 0) {
      return NextResponse.json(
        { error: "No screens generated" },
        { status: 400 }
      );
    }

    /* ---------- PREPARE DB INSERT ---------- */

    const insertData = screens.map((screen: any) => ({
      projectId: projectId,
      screenId: screen.id || `screen-${Math.random().toString(36).substr(2, 9)}`,
      screenName: screen.name || "Untitled Screen",
      purpose: screen.purpose || "No purpose provided",
      screenDescription: screen.layoutDescription || "No description provided",
      code: "",
    }));

    /* ---------- INSERT INTO DATABASE ---------- */

    try {
      await db.insert(ScreenConfig).values(insertData);
      console.log(`✅ Screens inserted: ${insertData.length}`);
    } catch (dbErr) {
      console.error("❌ DATABASE INSERT ERROR:", dbErr);
      throw new Error("Failed to save screen configurations to database");
    }

    /* ---------- DEDUCT CREDIT ---------- */

    await db
      .update(usersTable)
      .set({ credits: sql`${usersTable.credits} - 1` })
      .where(eq(usersTable.email, email));

    console.log(`✅ Credit deducted for user: ${email}`);

    /* ---------- RESPONSE ---------- */

    return NextResponse.json({
      success: true,
      projectName: jsonData.projectName,
      theme: jsonData.theme,
      screens: insertData,
    });

  } catch (error) {
    console.error("🔥 GENERATE CONFIG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Generation failed",
      },
      { status: 500 }
    );
  }
}