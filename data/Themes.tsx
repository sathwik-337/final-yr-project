const BASE_THEME = {
  popoverForeground: "",
  cardForeground: "",
  primaryForeground: "",
  secondaryForeground: "",
  accentForeground: "",
  mutedForeground: "",
  destructive: "",
  input: "",
  ring: "",
  radius: "",
  chart: ["", "", "", "", ""] as [string, string, string, string, string],
};

export const THEMES = {
  AURORA_SURGE: {
    ...BASE_THEME,
    label: "Aurora Surge",
    description: "Dark glass UI with electric cyan and violet highlights.",
    background: "#08111f",
    foreground: "#edf6ff",
    card: "#101b2e",
    cardForeground: "#edf6ff",
    popover: "#101b2e",
    popoverForeground: "#edf6ff",
    primary: "#67e8f9",
    primaryRgb: "103, 232, 249",
    primaryForeground: "#06252f",
    secondary: "#172554",
    secondaryForeground: "#dbeafe",
    muted: "#0f172a",
    mutedForeground: "#93accd",
    accent: "#8b5cf6",
    accentForeground: "#f5f3ff",
    destructive: "#ef4444",
    border: "#21304c",
    input: "#1b2a43",
    ring: "#67e8f9",
    radius: "1.25rem",
    chart: ["#67e8f9", "#8b5cf6", "#22d3ee", "#38bdf8", "#c084fc"],
  },
  EMBER_STUDIO: {
    ...BASE_THEME,
    label: "Ember Studio",
    description: "Moody editorial palette with ember orange and soft amber glow.",
    background: "#141018",
    foreground: "#fbf4eb",
    card: "#1d1821",
    cardForeground: "#fbf4eb",
    popover: "#1d1821",
    popoverForeground: "#fbf4eb",
    primary: "#ff7a45",
    primaryRgb: "255, 122, 69",
    primaryForeground: "#2f1206",
    secondary: "#3b221d",
    secondaryForeground: "#ffe4d4",
    muted: "#221a20",
    mutedForeground: "#bfa79a",
    accent: "#f59e0b",
    accentForeground: "#271300",
    destructive: "#dc2626",
    border: "#3a2a31",
    input: "#33252c",
    ring: "#ff7a45",
    radius: "1.1rem",
    chart: ["#ff7a45", "#f59e0b", "#fb7185", "#fdba74", "#fca5a5"],
  },
  FOREST_SIGNAL: {
    ...BASE_THEME,
    label: "Forest Signal",
    description: "Deep green control room aesthetic with bright botanical accents.",
    background: "#081511",
    foreground: "#edfdf4",
    card: "#10211a",
    cardForeground: "#edfdf4",
    popover: "#10211a",
    popoverForeground: "#edfdf4",
    primary: "#34d399",
    primaryRgb: "52, 211, 153",
    primaryForeground: "#052116",
    secondary: "#163126",
    secondaryForeground: "#d1fae5",
    muted: "#0d1b16",
    mutedForeground: "#8fb6a7",
    accent: "#a3e635",
    accentForeground: "#162400",
    destructive: "#ef4444",
    border: "#234336",
    input: "#1a352b",
    ring: "#34d399",
    radius: "1.15rem",
    chart: ["#34d399", "#a3e635", "#2dd4bf", "#4ade80", "#bef264"],
  },
  PAPER_HARBOR: {
    ...BASE_THEME,
    label: "Paper Harbor",
    description: "Light canvas with crisp navy structure and aqua accents.",
    background: "#f6f2e8",
    foreground: "#14263c",
    card: "#fffdf8",
    cardForeground: "#14263c",
    popover: "#fffdf8",
    popoverForeground: "#14263c",
    primary: "#2563eb",
    primaryRgb: "37, 99, 235",
    primaryForeground: "#eff6ff",
    secondary: "#dde7f5",
    secondaryForeground: "#1e3a5f",
    muted: "#ece5d8",
    mutedForeground: "#6b7b8e",
    accent: "#06b6d4",
    accentForeground: "#083344",
    destructive: "#dc2626",
    border: "#d7d2c4",
    input: "#d7d2c4",
    ring: "#2563eb",
    radius: "1rem",
    chart: ["#2563eb", "#06b6d4", "#0f766e", "#60a5fa", "#38bdf8"],
  },
  NOIR_GILT: {
    ...BASE_THEME,
    label: "Noir Gilt",
    description: "Dark luxury interface with brass highlights and rich neutrals.",
    background: "#0d0b0f",
    foreground: "#f8f1e6",
    card: "#171319",
    cardForeground: "#f8f1e6",
    popover: "#171319",
    popoverForeground: "#f8f1e6",
    primary: "#d4a24c",
    primaryRgb: "212, 162, 76",
    primaryForeground: "#24170a",
    secondary: "#2a1e16",
    secondaryForeground: "#f6e7cd",
    muted: "#1a1519",
    mutedForeground: "#b6a48f",
    accent: "#f97316",
    accentForeground: "#2b1204",
    destructive: "#ef4444",
    border: "#372921",
    input: "#2b211b",
    ring: "#d4a24c",
    radius: "1.3rem",
    chart: ["#d4a24c", "#f97316", "#fbbf24", "#facc15", "#fdba74"],
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];

const LEGACY_THEME_ALIASES = {
  NETFLIX: "NOIR_GILT",
  SPOTIFY: "FOREST_SIGNAL",
  CYBERPUNK: "AURORA_SURGE",
  OCEAN_BREEZE: "PAPER_HARBOR",
  ROSE_GOLD: "EMBER_STUDIO",
} as const;

export const DEFAULT_THEME_KEY: ThemeKey = "AURORA_SURGE";
export const THEME_NAME_LIST = Object.keys(THEMES) as ThemeKey[];

export function resolveThemeKey(theme?: string | null): ThemeKey {
  if (theme && theme in THEMES) {
    return theme as ThemeKey;
  }

  if (theme && theme in LEGACY_THEME_ALIASES) {
    return LEGACY_THEME_ALIASES[theme as keyof typeof LEGACY_THEME_ALIASES];
  }

  return DEFAULT_THEME_KEY;
}

export function getThemeByKey(theme?: string | null): Theme {
  return THEMES[resolveThemeKey(theme)];
}

export function getThemeLabel(theme?: string | null): string {
  return getThemeByKey(theme).label;
}

export function buildThemePrompt(theme?: string | null): string {
  const key = resolveThemeKey(theme);
  const palette = THEMES[key];

  return [
    `Selected Theme Key: ${key}`,
    `Selected Theme Label: ${palette.label}`,
    `Theme Intent: ${palette.description}`,
    "Palette Tokens:",
    `- background: ${palette.background}`,
    `- foreground: ${palette.foreground}`,
    `- card: ${palette.card}`,
    `- primary: ${palette.primary}`,
    `- secondary: ${palette.secondary}`,
    `- accent: ${palette.accent}`,
    `- border: ${palette.border}`,
    `- muted: ${palette.muted}`,
    `- ring: ${palette.ring}`,
    `- radius: ${palette.radius}`,
  ].join("\n");
}

export function buildThemeCssVariables(theme?: string | null): Record<string, string> {
  const palette = getThemeByKey(theme);

  return {
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--card": palette.card,
    "--card-foreground": palette.cardForeground,
    "--popover": palette.popover,
    "--popover-foreground": palette.popoverForeground,
    "--primary": palette.primary,
    "--primary-rgb": palette.primaryRgb,
    "--primary-muted": `${palette.primary}26`,
    "--primary-foreground": palette.primaryForeground,
    "--secondary": palette.secondary,
    "--secondary-foreground": palette.secondaryForeground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--accent": palette.accent,
    "--accent-muted": `${palette.accent}26`,
    "--accent-foreground": palette.accentForeground,
    "--destructive": palette.destructive,
    "--border": palette.border,
    "--input": palette.input,
    "--ring": palette.ring,
    "--radius": palette.radius,
    "--chart-1": palette.chart[0],
    "--chart-2": palette.chart[1],
    "--chart-3": palette.chart[2],
    "--chart-4": palette.chart[3],
    "--chart-5": palette.chart[4],
    "--sidebar": palette.card,
    "--sidebar-foreground": palette.cardForeground,
    "--sidebar-primary": palette.primary,
    "--sidebar-primary-foreground": palette.primaryForeground,
    "--sidebar-accent": palette.secondary,
    "--sidebar-accent-foreground": palette.secondaryForeground,
    "--sidebar-border": palette.border,
    "--sidebar-ring": palette.ring,
    "--color-background": palette.background,
    "--color-foreground": palette.foreground,
    "--color-card": palette.card,
    "--color-card-foreground": palette.cardForeground,
    "--color-popover": palette.popover,
    "--color-popover-foreground": palette.popoverForeground,
    "--color-primary": palette.primary,
    "--color-primary-rgb": palette.primaryRgb,
    "--color-primary-muted": `${palette.primary}26`,
    "--color-primary-foreground": palette.primaryForeground,
    "--color-secondary": palette.secondary,
    "--color-secondary-foreground": palette.secondaryForeground,
    "--color-muted": palette.muted,
    "--color-muted-foreground": palette.mutedForeground,
    "--color-accent": palette.accent,
    "--color-accent-muted": `${palette.accent}26`,
    "--color-accent-foreground": palette.accentForeground,
    "--color-destructive": palette.destructive,
    "--color-border": palette.border,
    "--color-input": palette.input,
    "--color-ring": palette.ring,
  };
}

export const TAILWIND_THEME_INLINE_CSS = `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
}`;

export function buildThemeCssVariableBlock(
  theme?: string | null,
  selector = ":root"
): string {
  const declarations = Object.entries(buildThemeCssVariables(theme))
    .map(([token, value]) => `  ${token}: ${value};`)
    .join("\n");

  return `${selector} {\n${declarations}\n}`;
}
