import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ MISSING NEXT_PUBLIC_GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
}); // Defaulting to stable v1 if possible
