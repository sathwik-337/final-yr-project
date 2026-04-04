"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Settings,
  Folder,
  Zap,
  Camera,
  Save,
  Palette,
  Sparkles,
  Wand2,
  LayoutTemplate,
  Wrench,
} from "lucide-react";

import { DEFAULT_THEME_KEY, THEMES, THEME_NAME_LIST, ThemeKey } from "@/data/Themes";

const PRIMARY = "var(--primary)";
const PRIMARY_FOREGROUND = "var(--primary-foreground)";

const QUICK_ACTIONS = [
  {
    label: "Improve",
    prompt:
      "Improve the current screen. Keep the overall structure, but refine spacing, hierarchy, typography, and visual polish.",
    icon: Sparkles,
  },
  {
    label: "Redesign",
    prompt:
      "Redesign this screen with a stronger visual direction, better composition, and more premium UI details while keeping the same purpose.",
    icon: Wand2,
  },
  {
    label: "Add Section",
    prompt:
      "Add a new section to this screen that fits naturally with the existing layout and improves the user journey.",
    icon: LayoutTemplate,
  },
  {
    label: "Fix Layout",
    prompt:
      "Fix the layout issues on this screen. Improve spacing, alignment, responsiveness, and card structure without changing the main content.",
    icon: Wrench,
  },
] as const;

const PROMPT_SUGGESTIONS = [
  "Make this screen feel more premium with stronger typography, better spacing, and layered glass cards.",
  "Add a testimonials or social proof section with realistic names, avatars, and review stats.",
  "Convert this into a cleaner SaaS dashboard with KPI cards, charts, and sharper information hierarchy.",
  "Turn this into a bold landing page with a stronger hero, clearer CTA, and more visual depth.",
  "Improve mobile responsiveness and tighten the layout so sections feel balanced on smaller screens.",
] as const;

interface ProjectSidebarProps {
  onGenerate?: (prompt: string, theme: ThemeKey) => void;
  onThemeSelect?: (theme: ThemeKey) => void;
  onSave?: (projectName: string) => void;
  onProjectNameChange?: (projectName: string) => void;
  onScreenshot?: () => void;
  isGenerating?: boolean;
  selectedTheme?: ThemeKey;
  projectName?: string;
}

export default function ProjectSidebar({
  onGenerate,
  onThemeSelect,
  onSave,
  onProjectNameChange,
  onScreenshot,
  isGenerating,
  selectedTheme: propSelectedTheme = DEFAULT_THEME_KEY,
  projectName = "My Screen",
}: ProjectSidebarProps) {
  /* ---------------- STATE ---------------- */

  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  // AI Prompt
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.min(Math.max(event.clientX, 220), 420);
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  /* ---------------- HANDLERS ---------------- */

  const handleThemeSelect = (themeKey: ThemeKey) => {
    onThemeSelect?.(themeKey);
    console.log("Selected Theme:", themeKey);
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    onProjectNameChange?.(newName);
  };

  const applyPrompt = (nextPrompt: string) => {
    setPrompt(nextPrompt);
  };

  /* ---------------- UI ---------------- */

  return (
    <aside
      className="
        relative h-full shrink-0 flex flex-col
        border-r border-white/10 backdrop-blur-xl
        bg-background/95
      "
      style={{ width: `${sidebarWidth}px` }}
    >
      <button
        type="button"
        aria-label="Resize sidebar"
        onMouseDown={() => setIsResizing(true)}
        className={`absolute top-0 right-0 z-20 h-full w-2 cursor-col-resize transition-colors ${
          isResizing ? "bg-primary/30" : "bg-transparent hover:bg-white/10"
        }`}
      />

      {/* HEADER */}
      <div className="px-3 py-3 border-b border-white/10 flex items-center gap-2">
        <Settings size={14} className="text-primary" />
        <h2 className="font-semibold text-xs text-foreground/90 tracking-wide">
          Settings
        </h2>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* PROJECT */}
        <section className="bg-white/5 rounded-xl border border-white/10 p-3 shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <Folder size={12} className="text-primary/70" />
            <p className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider">
              Project
            </p>
          </div>

          <input
            value={projectName}
            onChange={handleProjectNameChange}
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </section>

        {/* AI PROMPT */}
        <section className="bg-white/5 rounded-xl border border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary/70" />
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
              AI Prompt
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => applyPrompt(action.prompt)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-[11px] font-semibold text-foreground/75 transition-all hover:bg-white/10 hover:text-foreground"
                  >
                    <Icon size={12} className="text-primary/80 shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe UI..."
            className="
              w-full min-h-[128px] bg-background/50 border border-white/10 rounded-lg p-3
              text-xs text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-1 focus:ring-primary/50 transition
              resize-none overflow-hidden
            "
          />

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
              Suggestions
            </p>
            <div className="space-y-2">
              {PROMPT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => applyPrompt(suggestion)}
                  className="w-full rounded-lg border border-white/8 bg-background/35 px-3 py-2 text-left text-[11px] leading-relaxed text-foreground/60 transition-all hover:border-white/12 hover:bg-white/5 hover:text-foreground/80"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onGenerate?.(prompt, propSelectedTheme)}
            disabled={isGenerating || !prompt.trim()}
            className="
              w-full py-2 rounded-lg text-white
              text-xs font-semibold transition
              hover:scale-[1.01] active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg shadow-primary/20
            "
            style={{ background: PRIMARY, color: PRIMARY_FOREGROUND }}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </section>

        {/* THEMES */}
        <section className="bg-white/5 rounded-xl border border-white/10 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Palette size={14} className="text-primary/70" />
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
              Themes
            </p>
          </div>

          <div className="space-y-3">
            {THEME_NAME_LIST.map((themeKey) => {
              const theme = THEMES[themeKey];
              const isActive = propSelectedTheme === themeKey;

              return (
                <div
                  key={themeKey}
                  onClick={() => handleThemeSelect(themeKey)}
                  className={`
                    flex items-center justify-between
                    p-3 rounded-lg cursor-pointer
                    transition-all duration-200 border
                    ${
                      isActive
                        ? "border-primary/50 bg-white/10 shadow-md scale-[1.02]"
                        : "border-white/5 bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] font-semibold text-foreground/85 truncate">
                      {theme.label}
                    </p>
                    <p className="text-[10px] text-foreground/45 truncate">
                      {theme.description}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    {[theme.primary, theme.accent, theme.secondary].map(
                      (color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                          style={{ background: color }}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="border-t border-white/10 px-4 py-4 bg-background/80 backdrop-blur-md space-y-3">
        <button
          onClick={onScreenshot}
          className="
            w-full flex items-center justify-center gap-2
            py-2 rounded-lg border border-white/10 text-xs font-semibold
            text-foreground/70 hover:bg-white/5 hover:text-foreground transition
          "
        >
          <Camera size={14} />
          Screenshot
        </button>

        <button
          className="
            w-full flex items-center justify-center gap-2
            py-2 rounded-lg text-white text-xs font-semibold
            hover:scale-[1.01] active:scale-[0.98] transition
            shadow-lg shadow-primary/20
          "
          style={{ background: PRIMARY, color: PRIMARY_FOREGROUND }}
          onClick={() => onSave?.(projectName)}
        >
          <Save size={14} />
          Save
        </button>
      </div>
    </aside>
  );
}
