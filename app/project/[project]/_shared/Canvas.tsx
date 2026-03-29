"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { ScreenConfig } from "@/type/types";
import { Copy, Monitor, Smartphone, Code2, Eye, Sparkles, Maximize2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng } from "html-to-image";

import { THEMES, ThemeKey } from "@/data/Themes";

interface CanvasProps {
  screens: ScreenConfig[];
  selectedScreenIndex: number;
  onScreenSelect: (index: number) => void;
  deviceType?: string;
  selectedTheme?: ThemeKey;
}

const Canvas = forwardRef((props: CanvasProps, ref) => {
  const {
    screens,
    selectedScreenIndex,
    onScreenSelect,
    deviceType = "website",
    selectedTheme = "NETFLIX",
  } = props;

  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set preview device based on project device type
  const previewDevice = deviceType === "mobile" ? "mobile" : "desktop";

  const currentScreen = screens[selectedScreenIndex];

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    downloadImage,
    copyToClipboard
  }));

  /* ---------------- AUTO SCALE LOGIC ---------------- */
  useEffect(() => {
    if (viewMode === "preview" && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48; // accounting for padding
      const containerHeight = containerRef.current.clientHeight - 48;
      
      let scale = 100;
      if (previewDevice === "mobile") {
        const mobileWidth = 375 + 24; // width + border
        const mobileHeight = 667 + 24;
        const scaleX = containerWidth / mobileWidth;
        const scaleY = containerHeight / mobileHeight;
        scale = Math.min(scaleX, scaleY, 1) * 100;
      } else {
        // For desktop, we want to see more of the page
        // If the container is smaller than a standard desktop view (1280px)
        const desktopWidth = 1280;
        if (containerWidth < desktopWidth) {
          scale = (containerWidth / desktopWidth) * 100;
        }
      }
      setZoom(Math.floor(scale));
    }
  }, [previewDevice, viewMode, selectedScreenIndex]);

  // ⭐ Extract HTML from potential JSON schema
  let finalHtmlCode = currentScreen?.code || "";
  try {
    if (finalHtmlCode.trim().startsWith('{')) {
      const parsed = JSON.parse(finalHtmlCode);
      if (parsed.code) {
        finalHtmlCode = parsed.code;
      } else if (parsed.html) {
        finalHtmlCode = parsed.html;
      } else if (typeof parsed === 'object') {
        // If it's valid JSON but has no code field, it's a failed generation
        finalHtmlCode = `<div class="flex flex-col items-center justify-center h-full p-10 text-center bg-slate-900 text-white">
          <div class="bg-red-500/20 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <h2 class="text-xl font-bold mb-2">Generation Failed</h2>
          <p class="text-slate-400 max-w-md">The AI returned a metadata response instead of actual code. This usually happens when the request is too complex. Please try regenerating this screen.</p>
          <button onclick="window.parent.postMessage('regenerate', '*')" class="mt-6 px-6 py-2 bg-primary rounded-full font-medium">Try Again</button>
        </div>`;
      }
    }
  } catch (e) {
    // Not JSON or parse failed, use raw code
  }

  // Use the selected theme with a fallback to NETFLIX
  const theme = (THEMES as any)[selectedTheme] || THEMES.NETFLIX;

  // Simple HTML Formatter
  const formatHTML = (html: string) => {
    let rawHtml = html;
    try {
      // If it's a JSON string with a code field, extract the code
      const parsed = JSON.parse(html);
      if (parsed.code) rawHtml = parsed.code;
      else if (parsed.html) rawHtml = parsed.html;
    } catch (e) {
      // Not JSON, continue with raw HTML
    }
    
    let formatted = "";
    let indent = 0;
    rawHtml.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indent--;
      }
      
      // Safety check: ensure indent never goes below 0 to avoid RangeError
      const safeIndent = Math.max(0, indent);
      formatted += "  ".repeat(safeIndent) + "<" + element + ">\n";
      
      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br") && !element.startsWith("hr") && !element.startsWith("meta") && !element.startsWith("link")) {
        indent++;
      }
    });
    return formatted.trim();
  };

  const themeStyle = `
    @theme {
      --color-background: ${theme.background};
      --color-foreground: ${theme.foreground};
      --color-primary: ${theme.primary};
      --color-primary-rgb: ${theme.primaryRgb || "255, 255, 255"};
      --color-primary-muted: ${theme.primary}26;
      --color-primary-foreground: ${theme.primaryForeground || "#ffffff"};
      --color-secondary: ${theme.secondary};
      --color-secondary-foreground: ${theme.secondaryForeground || "#ffffff"};
      --color-card: ${theme.card};
      --color-card-foreground: ${theme.cardForeground};
      --color-popover: ${theme.popover || theme.card};
      --color-popover-foreground: ${theme.popoverForeground || theme.cardForeground};
      --color-muted: ${theme.muted};
      --color-muted-foreground: ${theme.mutedForeground};
      --color-accent: ${theme.accent};
      --color-accent-muted: ${theme.accent}26;
      --color-accent-foreground: ${theme.accentForeground || "#000000"};
      --color-destructive: ${theme.destructive || "#ef4444"};
      --color-border: ${theme.border};
      --color-input: ${theme.input || theme.border};
      --color-ring: ${theme.ring || theme.primary};
      --radius-sm: calc(${theme.radius} - 4px);
      --radius-md: calc(${theme.radius} - 2px);
      --radius-lg: ${theme.radius};
      --radius-xl: calc(${theme.radius} + 4px);
      --radius-2xl: calc(${theme.radius} + 8px);
      --radius-3xl: calc(${theme.radius} + 12px);
    }
  `;

  const copyToClipboard = () => {
    if (currentScreen?.code) {
      // If it's a JSON string, extract the code
      let codeToCopy = currentScreen.code;
      try {
        if (codeToCopy.trim().startsWith('{')) {
          const parsed = JSON.parse(codeToCopy);
          if (parsed.code) codeToCopy = parsed.code;
          else if (parsed.html) codeToCopy = parsed.html;
        }
      } catch (e) {
        // Not JSON or parse failed, use raw code
      }
      
      navigator.clipboard.writeText(codeToCopy);
      toast.success("Code copied to clipboard!");
    }
  };

  const downloadImage = async () => {
    try {
      toast.info("Preparing download...");
      
      // Select the preview container
      const previewContainer = containerRef.current?.querySelector(".preview-container") as HTMLElement;
      if (!previewContainer) throw new Error("Preview container not found");

      // 🥇 We'll try to capture the container.
      // If html-to-image fails with the iframe, we'll try a different approach.
      
      let dataUrl;
      try {
        // html-to-image often fails on iframes.
        // Let's try to capture the iframe body specifically if accessible.
        const iframe = previewContainer.querySelector("iframe");
        const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
        
        if (iframeDoc && iframeDoc.body) {
          // If we can access the iframe body, capture it directly.
          // This is much more reliable than capturing the iframe element itself.
          dataUrl = await toPng(iframeDoc.body as HTMLElement, {
            cacheBust: true,
            backgroundColor: theme.background,
            width: previewDevice === "mobile" ? 375 : 1280,
            height: previewDevice === "mobile" ? 667 : 800,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
            },
            skipFonts: true,
          });
        } else {
          // Fallback to capturing the container
          dataUrl = await toPng(previewContainer, {
            cacheBust: true,
            backgroundColor: theme.background,
            skipFonts: true,
          });
        }
      } catch (err) {
        console.warn("Standard toPng failed, trying fallback...", err);
        // Last resort: capture the container with minimal options
        dataUrl = await toPng(previewContainer, {
          pixelRatio: 1,
          backgroundColor: theme.background,
          skipFonts: true,
        });
      }
      
      const link = document.createElement("a");
      link.download = `${currentScreen?.screenName || "ui-preview"}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("UI Photo downloaded!");
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to capture photo. Try again.");
    }
  };

  if (screens.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Eye className="text-primary" size={32} />
          </div>
          <p className="text-foreground/50 font-medium">Waiting for generation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background/50">
      {/* TOOLBAR */}
      <div className="h-14 border-b border-white/10 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                viewMode === "preview"
                  ? "bg-white/10 shadow-sm text-primary"
                  : "text-foreground/50 hover:text-foreground/80"
              }`}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
                viewMode === "code"
                  ? "bg-white/10 shadow-sm text-primary"
                  : "text-foreground/50 hover:text-foreground/80"
              }`}
            >
              <Code2 size={14} /> Code
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-md border border-white/5">
            {previewDevice === "desktop" ? (
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <Monitor size={14} /> Desktop View
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <Smartphone size={14} /> Mobile View
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
            <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">Zoom</span>
            <input 
              type="range" 
              min="20" 
              max="150" 
              value={zoom} 
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-[10px] text-primary font-bold min-w-[2.5rem] text-right">{zoom}%</span>
            <button 
              onClick={() => {
                // Trigger auto-scale again
                if (containerRef.current) {
                  const containerWidth = containerRef.current.clientWidth - 48;
                  const containerHeight = containerRef.current.clientHeight - 48;
                  let scale = 100;
                  if (previewDevice === "mobile") {
                    scale = Math.min(containerWidth / 399, containerHeight / 691, 1) * 100;
                  } else {
                    scale = Math.min(containerWidth / 1280, 1) * 100;
                  }
                  setZoom(Math.floor(scale));
                }
              }}
              className="p-1 hover:bg-white/10 rounded-md text-foreground/40 hover:text-primary transition-colors"
              title="Reset Zoom"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedScreenIndex}
            onChange={(e) => onScreenSelect(Number(e.target.value))}
            className="text-xs border border-white/10 rounded-lg px-3 py-2 bg-white/5 text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer pr-8"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
          >
            {screens.map((screen, idx) => (
              <option key={idx} value={idx} className="bg-slate-900 text-foreground">
                {screen.screenName || `Screen ${idx + 1}`}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={downloadImage}
            className="gap-2 text-xs border-white/10 hover:bg-white/5 hover:text-foreground"
          >
            <Download size={14} /> Download Photo
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2 text-xs border-white/10 hover:bg-white/5 hover:text-foreground"
          >
            <Copy size={14} /> Copy Code
          </Button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative" ref={containerRef}>
        {viewMode === "preview" ? (
          <div className="w-full h-full flex items-center justify-center p-2 md:p-4 bg-[radial-gradient(circle_at_center,var(--primary-muted)_0%,transparent_100%)] overflow-auto scrollbar-hide">
            <div
              className={`
                preview-container bg-background shadow-2xl transition-all duration-500 overflow-hidden
                ${
                  previewDevice === "mobile"
                    ? "w-[375px] h-[667px] rounded-[3rem] border-[12px] border-slate-900 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative"
                    : "w-full h-full rounded-xl border border-white/10 max-w-7xl mx-auto"
                }
              `}
              style={{ 
                transform: `scale(${zoom / 100})`, 
                transformOrigin: 'center center',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Browser Bar for Desktop View */}
              {previewDevice === "desktop" && (
                <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="mx-auto bg-white/5 px-4 py-1 rounded-md text-[10px] text-foreground/40 w-1/3 text-center truncate">
                    https://{currentScreen?.screenName?.toLowerCase().replace(/\s+/g, '-') || 'preview'}.app
                  </div>
                </div>
              )}

              {/* Mobile Notch for Mobile View */}
              {previewDevice === "mobile" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/10 rounded-full" />
                </div>
              )}

              <iframe
                key={`${selectedScreenIndex}-${selectedTheme}`}
                title="Preview"
                className={`w-full h-full ${previewDevice === "desktop" ? "h-[calc(100%-40px)]" : ""}`}
                srcDoc={`
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
                      <style type="text/tailwindcss">
                        ${themeStyle}
                        
                        @layer base {
                          body { 
                            background-color: var(--color-background); 
                            color: var(--color-foreground);
                            font-family: ui-sans-serif, system-ui, sans-serif;
                            margin: 0;
                            padding: 0;
                            position: relative;
                            overflow-x: hidden;
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            /* Default to standard page alignment */
                            justify-content: flex-start;
                            align-items: stretch;
                          }
                          * {
                            box-sizing: border-box;
                            color: inherit;
                          }
                          /* Fix for overflow and height issues */
                          #root, main {
                            flex: 1;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                          }
                          /* Ensure grid layouts don't break on mobile and have reasonable card behavior */
                          .grid {
                            width: 100%;
                            align-items: start; /* Prevent cards from stretching to match row height unless wanted */
                          }
                          .grid > * {
                            min-width: 0; /* Prevent overflow issues in grid children */
                          }
                          /* Floating Particle Animation */
                          @keyframes float {
                            0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                            33% { transform: translate(30px, -50px) scale(1.1); opacity: 0.5; }
                            66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.2; }
                            100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                          }
                          .particle {
                            position: absolute;
                            border-radius: 50%;
                            filter: blur(40px);
                            z-index: -1;
                            animation: float 15s infinite ease-in-out;
                          }
                        }
                        /* Hide scrollbar */
                        ::-webkit-scrollbar { display: none; }
                      </style>
                    </head>
                    <body>
                      ${finalHtmlCode}
                    </body>
                  </html>
                `}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-[#0d1117] overflow-auto p-6 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <pre className="text-gray-300">
              <code className="language-html">
                {formatHTML(currentScreen?.code || "")}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
});

export default Canvas;

