import { openrouter } from "@/config/openrouter";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import { db } from "@/config/db";
import { ScreenConfig } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

/* =========================================================
   ✅ SAFE JSON PARSER (AI OUTPUT PROTECTION)
========================================================= */

function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn("⚠️ First JSON parse failed. Attempting cleanup...");

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
      console.error("❌ JSON STILL INVALID:\n", repaired);
      throw new Error("AI returned invalid JSON");
    }
  }
}

/* =========================================================
   ✅ ROUTE HANDLER
========================================================= */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userInput, deviceType, projectId } = body;

    /* ---------- VALIDATION ---------- */

    if (!projectId || !deviceType || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------- AI REQUEST ---------- */

    const aiResult = await openrouter.chat.send({
      chatGenerationParams: {
        model: "openai/gpt-5.1-codex-mini",
        stream: false,
        maxTokens: 2000,
        temperature: 0.6,
        responseFormat: { type: "json_object" },

        messages: [
          {
            role: "system",
            content:
              APP_LAYOUT_CONFIG_PROMPT.replace(
                "{deviceType}",
                deviceType
              ) +
              `
CRITICAL OUTPUT RULES:
- Output STRICT VALID JSON
- No markdown or backticks
- Escape quotes using \\" inside strings
- JSON must pass JSON.parse()
`,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      },
    });

    console.log("✅ AI RESPONSE RECEIVED");

    /* ---------- EXTRACT TEXT ---------- */

    const choice = aiResult?.choices?.[0];
    const content = choice?.message?.content ?? "";

    const text =
      typeof content === "string"
        ? content
        : (content as any)?.[0]?.text ?? "";

    if (!text) {
      throw new Error("Empty AI response");
    }

    /* ---------- SAFE JSON PARSE ---------- */

    const jsonData = safeParseJSON(text);

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
      screenId: screen.id,
      screenName: screen.name,
      purpose: screen.purpose,
      screenDescription: screen.layoutDescription,
      code: "",
    }));

    /* ---------- INSERT INTO DATABASE ---------- */

    await db.insert(ScreenConfig).values(insertData);

    console.log(`✅ Screens inserted: ${insertData.length}`);

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