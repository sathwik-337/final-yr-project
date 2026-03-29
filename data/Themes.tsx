export const THEMES = {
  /* ================= NETFLIX (Cinematic Dark) ================= */
  NETFLIX: {
    background: "#000000",
    foreground: "#ffffff",
    card: "#141414",
    cardForeground: "#ffffff",
    popover: "#141414",
    popoverForeground: "#ffffff",
    primary: "#E50914", // Netflix Red
    primaryRgb: "229, 9, 20",
    primaryForeground: "#ffffff",
    secondary: "#222222",
    secondaryForeground: "#ffffff",
    muted: "#222222",
    mutedForeground: "#808080",
    accent: "#E50914",
    accentForeground: "#ffffff",
    destructive: "#b91c1c",
    border: "#333333",
    input: "#333333",
    ring: "#E50914",
    radius: "0.5rem",
    chart: ["#E50914", "#ffffff", "#444444", "#808080", "#222222"],
  },

  /* ================= SPOTIFY (Music Dark) ================= */
  SPOTIFY: {
    background: "#121212",
    foreground: "#ffffff",
    card: "#181818",
    cardForeground: "#ffffff",
    popover: "#181818",
    popoverForeground: "#ffffff",
    primary: "#1DB954", // Spotify Green
    primaryRgb: "29, 185, 84",
    primaryForeground: "#000000",
    secondary: "#282828",
    secondaryForeground: "#ffffff",
    muted: "#282828",
    mutedForeground: "#b3b3b3",
    accent: "#1DB954",
    accentForeground: "#000000",
    destructive: "#e11d48",
    border: "#333333",
    input: "#333333",
    ring: "#1DB954",
    radius: "0.75rem",
    chart: ["#1DB954", "#ffffff", "#535353", "#b3b3b3", "#282828"],
  },

  /* ================= CYBERPUNK (Neon Night) ================= */
  CYBERPUNK: {
    background: "#050505",
    foreground: "#ffffff",
    card: "#0f0f14",
    cardForeground: "#ffffff",
    popover: "#0f0f14",
    popoverForeground: "#ffffff",
    primary: "#f0f", // Neon Magenta
    primaryRgb: "255, 0, 255",
    primaryForeground: "#ffffff",
    secondary: "#1c1c25",
    secondaryForeground: "#ffffff",
    muted: "#171720",
    mutedForeground: "#0ff", // Neon Cyan
    accent: "#0ff",
    accentForeground: "#000000",
    destructive: "#ff3d5a",
    border: "#2a2a37",
    input: "#2a394a",
    ring: "#f0f",
    radius: "0.25rem",
    chart: ["#f0f", "#0ff", "#ffff00", "#ff00aa", "#00ff00"],
  },

  /* ================= OCEAN_BREEZE (Calm Blue) ================= */
  OCEAN_BREEZE: {
    background: "#f0f9ff", // Light blue tint
    foreground: "#0c4a6e", // Sky 900
    card: "#ffffff",
    cardForeground: "#0c4a6e",
    popover: "#ffffff",
    popoverForeground: "#0c4a6e",
    primary: "#0284c7", // Sky 600
    primaryRgb: "2, 132, 199",
    primaryForeground: "#ffffff",
    secondary: "#e0f2fe", // Sky 100
    secondaryForeground: "#0369a1",
    muted: "#f0f9ff",
    mutedForeground: "#7dd3fc",
    accent: "#0ea5e9",
    accentForeground: "#ffffff",
    destructive: "#e11d48",
    border: "#bae6fd",
    input: "#bae6fd",
    ring: "#0284c7",
    radius: "1rem",
    chart: ["#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"],
  },

  /* ================= ROSE_GOLD (Elegant) ================= */
  ROSE_GOLD: {
    background: "#fffafb",
    foreground: "#431407", // Warm Brown
    card: "#ffffff",
    cardForeground: "#431407",
    popover: "#ffffff",
    popoverForeground: "#431407",
    primary: "#e11d48", // Rose 600
    primaryRgb: "225, 29, 72",
    primaryForeground: "#ffffff",
    secondary: "#fff1f2", // Rose 50
    secondaryForeground: "#9f1239",
    muted: "#fff1f2",
    mutedForeground: "#fda4af",
    accent: "#fb7185",
    accentForeground: "#ffffff",
    destructive: "#be123c",
    border: "#fecdd3",
    input: "#fecdd3",
    ring: "#e11d48",
    radius: "1.5rem",
    chart: ["#e11d48", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"],
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export const THEME_NAME_LIST = Object.keys(THEMES) as ThemeKey[];
export type Theme = (typeof THEMES)[ThemeKey];
