import Groq from "groq-sdk";

// Trim the key to prevent accidental whitespace issues
const apiKey = process.env.GROQ_API_KEY?.trim();

if (!apiKey) {
  console.warn("⚠️ MISSING GROQ_API_KEY in .env file");
}

export const groq = new Groq({
  apiKey: apiKey || "",
});
