"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

function ProjectHeader() {
  const router = useRouter();

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT — Back + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={130} height={80} />
            <span className="hidden sm:block font-semibold text-gray-700">
              PixPrompt Project
            </span>
          </div>
        </div>

        {/* CENTER — Project Indicator */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ background: PRIMARY }}
          />
          <span className="text-sm text-gray-600 font-medium">
            Editing Project
          </span>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="text-white hover:scale-105 transition-all duration-300"
            style={{ background: PRIMARY }}
          >
            Save Project
          </Button>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;
