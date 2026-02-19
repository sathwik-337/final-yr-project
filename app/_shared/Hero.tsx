"use client";

import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { templates } from "../../data/constant";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader } from "lucide-react";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

export default function Hero() {
  const [userInput, setUserInput] = useState<string>("");
  const [device, setDevice] = useState<string>("website");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();

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
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-purple-100 to-blue-100" />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-40 animate-float"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/70 backdrop-blur shadow-md mb-8 transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
        >
          <HiSparkles style={{ color: PRIMARY }} />
          <span style={{ color: PRIMARY }}>Introducing PixPrompt UI</span>
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl md:text-6xl font-bold leading-tight tracking-tight transition-all duration-700 delay-100
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Design High Quality{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${PRIMARY}, #ff7a7a)`,
            }}
          >
            Website and Mobile App
          </span>{" "}
          Designs
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-200
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          From websites to mobile apps, we turn ideas into intuitive,
          high-impact digital experiences ✨
        </p>

        {/* Prompt Box */}
        <div
          className={`mt-12 bg-white rounded-2xl shadow-xl border p-4 max-w-3xl mx-auto transition-all duration-700 delay-300
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <textarea
            placeholder="Enter what design you want to create"
            className="w-full resize-none outline-none text-lg p-3 rounded-lg"
            rows={3}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className="flex items-center justify-between mt-3">
            <select
              className="px-4 py-2 rounded-lg border bg-gray-50 text-gray-700"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
            >
              <option value="mobile">Mobile</option>
              <option value="website">Website</option>
            </select>

            <button
              className="p-3 rounded-xl text-white transition hover:scale-110 active:scale-95 disabled:opacity-50"
              style={{ background: PRIMARY }}
              onClick={onCreateProject}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-14 transition-all duration-700 delay-500
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {templates.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                onClick={() => setUserInput(item.description)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border bg-white/80 backdrop-blur shadow-sm text-gray-700 text-sm md:text-base font-medium transition hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] hover:ring-2 cursor-pointer"
                style={{ "--tw-ring-color": PRIMARY } as React.CSSProperties}
              >
                <Icon style={{ color: PRIMARY }} />
                {item.title}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
