"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

const PRIMARY = "var(--primary)";

interface ProjectHeaderProps {
  projectName?: string;
  onSave?: () => void;
}

function ProjectHeader({ projectName = "PixPrompt Project", onSave }: ProjectHeaderProps) {
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);

  return (
    <header className="w-full border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT — Back + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-white/5 transition text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={100} height={60} className="brightness-110" />
            <div className="flex flex-col">
              <span className="hidden sm:block font-bold text-xs text-primary uppercase tracking-widest">
                PixPrompt
              </span>
              <span className="hidden sm:block font-semibold text-sm text-foreground/90 truncate max-w-[200px]">
                {projectName}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER — Project Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
          <div
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]"
            style={{ background: PRIMARY }}
          />
          <span className="text-xs text-foreground/60 font-medium">
            Live Editor
          </span>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full shadow-sm">
            <Zap size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500">
              {userDetail?.credits ?? 0}
            </span>
          </div>

          <Button
            className="text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
            style={{ background: PRIMARY }}
            onClick={onSave}
          >
            Save Project
          </Button>

          <div className="border-l border-white/10 pl-4">
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "border border-white/10"
              }
            }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;
