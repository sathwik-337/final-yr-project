"use client";

import React, { useEffect, useState, useRef } from "react";
import { Send, Sparkles, Loader } from "lucide-react";
import { templates } from "../../data/constant";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

export default function Hero() {
  const [userInput, setUserInput] = useState<string>("");
  const [device, setDevice] = useState<string>("website");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  useEffect(() => {
    const prompt = searchParams.get("prompt");

    if (prompt) {
      setUserInput(prompt);
    }
  }, [searchParams]);

  const onCreateProject = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (!userInput?.trim()) return;

    try {
      setLoading(true);

      const { data } = await axios.post("/api/project", {
        userInput,
        device,
      });

      // 👇 Take projectId from backend response
      const projectId = data.projectId;

      if (!projectId) {
        throw new Error("Project ID not returned from backend");
      }

      router.push(`/project/${projectId}`);
    } catch (error) {
      console.error("Project creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    const generated = Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 10 + 10,
    }));

    setParticles(generated);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center py-20 px-6 overflow-hidden bg-[var(--background)]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Centered Badge */}
        <div
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-10 transition-all duration-1000 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="p-1 bg-indigo-500/20 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
            AI Design Studio
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter transition-all duration-1000 delay-200 ease-out text-foreground
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          Your Vision, <br />
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x"
          >
            Instantly Designed
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-base md:text-xl text-foreground/60 font-medium max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          Transform abstract ideas into high-fidelity web and mobile interfaces with the power of generative AI.
        </p>

        {/* Premium Prompt Interface */}
        <div
          className={`mt-12 group transition-all duration-1000 delay-600 ease-out
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="relative max-w-3xl mx-auto p-1.5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/10">
            <div className="flex flex-col p-3">
              <textarea
                ref={textareaRef}
                placeholder="Describe your dream app... (e.g., A minimalist meditation app with glassmorphism)"
                className="w-full resize-none outline-none text-lg p-3 rounded-2xl bg-white/5 text-foreground placeholder:text-foreground/30 font-medium min-h-[100px] transition-all focus:bg-white/10 scrollbar-hide overflow-hidden"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />

              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  {["website", "mobile"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDevice(t)}
                      className={`px-5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-300 ${
                        device === t
                          ? "bg-primary text-background shadow-sm"
                          : "text-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  className="relative group flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  onClick={onCreateProject}
                  disabled={loading || !userInput.trim()}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform group-hover:scale-110"></div>
                  <span className="relative text-background font-bold tracking-tight text-sm">
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Generate UI
                        <Send className="inline-block ml-2 w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Templates */}
        <div
          className={`flex flex-wrap justify-center gap-3 mt-16 transition-all duration-1000 delay-800 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {templates.slice(0, 5).map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => setUserInput(item.description)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5 shadow-sm hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-1 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-foreground/40 group-hover:text-primary" />
                </div>
                <span className="text-xs font-bold text-foreground/40 group-hover:text-foreground">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
