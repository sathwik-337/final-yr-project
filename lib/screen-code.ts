type ScreenCodeShape = {
  code?: unknown;
  html?: unknown;
  css?: unknown;
};

export type ParsedScreenCode = {
  html: string;
  css: string;
  isStructured: boolean;
  parsedObject: ScreenCodeShape | null;
};

function sanitizeJsonText(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```html/g, "")
    .replace(/```css/g, "")
    .replace(/```/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function tryParseJson(text?: string | null): ScreenCodeShape | null {
  if (!text?.trim()) return null;

  const cleaned = sanitizeJsonText(text);

  try {
    const parsed = JSON.parse(cleaned);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return typeof parsed === "object" && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }
}

export function parseScreenCodePayload(value?: string | null): ParsedScreenCode {
  if (!value?.trim()) {
    return {
      html: "",
      css: "",
      isStructured: false,
      parsedObject: null,
    };
  }

  const parsedObject = tryParseJson(value);
  if (!parsedObject) {
    return {
      html: value,
      css: "",
      isStructured: false,
      parsedObject: null,
    };
  }

  const html =
    typeof parsedObject.code === "string"
      ? parsedObject.code
      : typeof parsedObject.html === "string"
        ? parsedObject.html
        : "";

  const css = typeof parsedObject.css === "string" ? parsedObject.css : "";

  return {
    html,
    css,
    isStructured: true,
    parsedObject,
  };
}

export function serializeScreenCodePayload(payload: { html: string; css?: string }) {
  return JSON.stringify({
    code: payload.html,
    css: payload.css ?? "",
  });
}

export function formatExistingScreenCodeForPrompt(value?: string | null) {
  const { html, css } = parseScreenCodePayload(value);

  if (!html.trim() && !css.trim()) return "";

  return [
    "EXISTING HTML:",
    html || "(none)",
    "",
    "EXISTING CSS:",
    css || "(none)",
  ].join("\n");
}
