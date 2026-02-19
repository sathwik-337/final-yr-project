"use client";

import React, { useState } from "react";
import {
  Settings,
  Folder,
  Sparkles,
  Palette,
  Camera,
  Save,
} from "lucide-react";

import { THEMES, THEME_NAME_LIST, ThemeKey } from "@/data/Themes";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

export default function ProjectSidebar() {

  /* ---------------- STATE ---------------- */

  // selected theme
  const [selectedTheme, setSelectedTheme] =
    useState<ThemeKey>("AURORA_INK");

  // project name
  const [projectName, setProjectName] =
    useState("My Screen");

  // ai prompt
  const [prompt, setPrompt] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const handleThemeSelect = (themeKey: ThemeKey) => {
    setSelectedTheme(themeKey);
    console.log("Selected Theme:", themeKey);
  };

  /* ---------------- UI ---------------- */

  return (
    <aside
      className="
        w-[240px] h-screen flex flex-col
        border-r backdrop-blur-xl
        bg-gradient-to-b from-white via-purple-50/30 to-blue-50/20
      "
    >
      {/* HEADER */}
      <div className="px-4 py-4 border-b flex items-center gap-2">
        <Settings size={16} style={{ color: PRIMARY }} />
        <h2 className="font-semibold text-sm text-gray-800 tracking-wide">
          Settings
        </h2>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">

        {/* PROJECT */}
        <section className="bg-white/80 rounded-xl border p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Folder size={14} style={{ color: PRIMARY }} />
            <p className="text-xs font-semibold text-gray-700">
              Project
            </p>
          </div>

          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-xs outline-none focus:ring-2"
            style={{ "--tw-ring-color": PRIMARY } as React.CSSProperties}
          />
        </section>

        {/* AI PROMPT */}
        <section className="bg-white/80 rounded-xl border p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: PRIMARY }} />
            <p className="text-xs font-semibold text-gray-700">
              AI Prompt
            </p>
          </div>

          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe UI..."
            className="w-full px-3 py-2 rounded-lg border text-xs resize-none outline-none focus:ring-2"
            style={{ "--tw-ring-color": PRIMARY } as React.CSSProperties}
          />

          <button
            className="
              w-full py-2 rounded-lg text-white
              text-xs font-semibold transition
              hover:scale-[1.01] active:scale-[0.98]
            "
            style={{ background: PRIMARY }}
          >
            Generate
          </button>
        </section>

        {/* THEMES */}
        <section className="bg-white/80 rounded-xl border p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Palette size={14} style={{ color: PRIMARY }} />
            <p className="text-xs font-semibold text-gray-700">
              Themes
            </p>
          </div>

          <div className="space-y-3">
            {THEME_NAME_LIST.map((themeKey) => {
              const theme = THEMES[themeKey];
              const isActive = selectedTheme === themeKey;

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
                        ? "border-2 bg-gray-50 shadow-md scale-[1.02]"
                        : "border-transparent hover:bg-gray-50"
                    }
                  `}
                  style={{
                    borderColor: isActive
                      ? theme.primary
                      : "transparent",
                  }}
                >
                  <p className="text-[11px] font-medium text-gray-700 capitalize">
                    {themeKey.replaceAll("_", " ")}
                  </p>

                  <div className="flex gap-1.5">
                    {[theme.primary, theme.accent, theme.secondary].map(
                      (color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-white shadow"
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
      <div className="border-t px-4 py-4 bg-white/90 space-y-3">
        <button
          className="
            w-full flex items-center justify-center gap-2
            py-2 rounded-lg border text-xs font-semibold
            hover:bg-gray-50 transition
          "
        >
          <Camera size={14} />
          Screenshot
        </button>

        <button
          className="
            w-full flex items-center justify-center gap-2
            py-2 rounded-lg text-white text-xs font-semibold
            hover:opacity-90 transition
          "
          style={{ background: PRIMARY }}
          onClick={() =>
            console.log({
              projectName,
              prompt,
              selectedTheme,
            })
          }
        >
          <Save size={14} />
          Save
        </button>
      </div>
    </aside>
  );
}
