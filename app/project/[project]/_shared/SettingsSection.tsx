"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Settings,
  Folder,
  Zap,
  Camera,
  Save,
  Palette,
} from "lucide-react";

import { THEMES, THEME_NAME_LIST, ThemeKey } from "@/data/Themes";

const PRIMARY = "var(--primary)";

interface ProjectSidebarProps {
  onGenerate?: (prompt: string, theme: ThemeKey) => void;
  onThemeSelect?: (theme: ThemeKey) => void;
  onSave?: (projectName: string) => void;
  onScreenshot?: () => void;
  isGenerating?: boolean;
  selectedTheme?: ThemeKey;
  initialProjectName?: string;
}

export default function ProjectSidebar({
  onGenerate,
  onThemeSelect,
  onSave,
  onScreenshot,
  isGenerating,
  selectedTheme: propSelectedTheme = "NETFLIX",
  initialProjectName = "My Screen",
}: ProjectSidebarProps) {
  /* ---------------- STATE ---------------- */

  // project name
  const [projectName, setProjectName] =
    useState(initialProjectName);

  // AI Prompt
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync initial name if it changes
  useEffect(() => {
    if (initialProjectName) {
      setProjectName(initialProjectName);
    }
  }, [initialProjectName]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  /* ---------------- HANDLERS ---------------- */

  const handleThemeSelect = (themeKey: ThemeKey) => {
    onThemeSelect?.(themeKey);
    console.log("Selected Theme:", themeKey);
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setProjectName(newName);
    onSave?.(newName); // Proactively save on change or debounce this
  };

  /* ---------------- UI ---------------- */

  return (
    <aside
      className="
        w-[220px] h-full flex flex-col
        border-r border-white/10 backdrop-blur-xl
        bg-background/95
      "
    >
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
            style={{ background: PRIMARY }}
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
                  <p className="text-[11px] font-medium text-foreground/80 capitalize truncate pr-2">
                    {themeKey.toLowerCase().replace(/_/g, ' ')}
                  </p>

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
          style={{ background: PRIMARY }}
          onClick={() => onSave?.(projectName)}
        >
          <Save size={14} />
          Save
        </button>
      </div>
    </aside>
  );
}
