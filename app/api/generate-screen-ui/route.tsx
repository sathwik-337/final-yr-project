import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "@/config/openrouter";
import { GENERATION_SCREEN_PROMPT } from "@/data/Prompt";
import { db } from "@/config/db";
import { ScreenConfig } from "@/config/schema";
import { and, eq } from "drizzle-orm";

/* =====================================================
   SAFE JSON PARSER (handles bad AI outputs)
===================================================== */
function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .trim();

    return JSON.parse(cleaned);
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
    } = body;

    /* ---------- VALIDATION ---------- */
    if (!projectId || !screenId) {
      return NextResponse.json(
        { success: false, error: "Missing projectId or screenId" },
        { status: 400 }
      );
    }

    /* ---------- BUILD PROMPT ---------- */
    const userInput = `
Screen Name: ${screenName}
Screen Purpose: ${purpose}
Screen Description: ${screenDescription}
Project Visual Style: ${projectVisualDescription ?? "modern UI"}
`;

    /* ---------- AI CALL ---------- */
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
          GENERATION_SCREEN_PROMPT +
          "\n\nIMPORTANT: Respond ONLY in valid JSON format.",
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  },
});

    console.log("✅ AI RESPONSE RECEIVED");

    /* ---------- EXTRACT CONTENT SAFELY ---------- */

    const content = aiResult?.choices?.[0]?.message?.content;

    // OpenRouter may return string OR array
    const text =
      typeof content === "string"
        ? content
        : (content as any)?.[0]?.text ?? "";

    if (!text) {
      throw new Error("Empty AI response");
    }

    /* ---------- PARSE AI OUTPUT ---------- */

    let parsed: any;

    try {
      parsed = safeParseJSON(text);
    } catch {
      console.warn("AI returned non-JSON. Saving raw output.");
      parsed = { code: text };
    }

    const code: string = parsed.code || text;

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