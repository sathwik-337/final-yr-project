import { openrouter } from "@/config/openrouter";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import { db } from "@/config/db";
import { ScreenConfig } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userInput, deviceType, projectId } = await req.json();

    /* ---------------- AI REQUEST ---------------- */

    const aiResult = await openrouter.chat.send({
      chatGenerationParams: {
        model: "openai/gpt-5.1-codex-mini",
        stream: false,
        maxTokens: 2000,
        temperature: 0.6,

        // ⭐ forces JSON response
        responseFormat: { type: "json_object" },

        messages: [
          {
            role: "system",
            content:
              APP_LAYOUT_CONFIG_PROMPT.replace(
                "{deviceType}",
                deviceType
              ) + "\nReturn ONLY valid JSON.",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      },
    });

    console.log("AI RESULT:", aiResult);

    /* ---------------- EXTRACT TEXT ---------------- */

    const choice = aiResult?.choices?.[0];
    const content = choice?.message?.content ?? "";

    let text =
      typeof content === "string"
        ? content
        : content?.[0]?.text ?? "";

    /* ---------------- CLEAN RESPONSE ---------------- */

    let cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/[“”]/g, '"') // smart quotes
      .replace(/[‘’]/g, "'")
      .replace(/[\u0000-\u001F]+/g, "")
      .trim();

    /* ---------------- FIX UNESCAPED QUOTES ---------------- */
    // Fix strings like: "labelled "Start organizing" plus"
    cleanedText = cleanedText.replace(
      /(:\s*")(.*?)(?=",\s*("|[a-zA-Z0-9_]+")\s*:)/gs,
      (_, start, value) => {
        const escaped = value.replace(/"/g, '\\"');
        return `${start}${escaped}`;
      }
    );

    /* ---------------- PARSE JSON ---------------- */

    let jsonData;

    try {
      jsonData = JSON.parse(cleanedText);
    } catch (e) {
      console.error("❌ Invalid JSON:", cleanedText);

      return NextResponse.json(
        {
          error: "Invalid JSON returned from AI",
          raw: cleanedText,
        },
        { status: 500 }
      );
    }

    /* ---------------- INSERT INTO DB ---------------- */

    const screens = jsonData?.screens ?? [];

    if (!screens.length) {
      return NextResponse.json(
        { error: "No screens generated" },
        { status: 400 }
      );
    }

    const insertData = screens.map((screen: any) => ({
      projectId: projectId,
      screenId: screen.id,
      screenName: screen.name,
      purpose: screen.purpose,
      screenDescription: screen.layoutDescription,
      code: "",
    }));

    await db.insert(ScreenConfig).values(insertData);

    console.log("✅ Screens inserted:", insertData.length);

    /* ---------------- RESPONSE ---------------- */

    return NextResponse.json({
      success: true,
      projectName: jsonData.projectName,
      theme: jsonData.theme,
      screens: insertData,
    });

  } catch (error) {
    console.error("🔥 GENERATE CONFIG ERROR:", error);

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}