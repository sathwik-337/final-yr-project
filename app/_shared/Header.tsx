"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();


  return (
    <header className="w-full border-b border-white/5 bg-[var(--background)]/60 backdrop-blur-xl sticky top-0 z-[100] transition-all duration-300 hover:bg-[var(--background)]/80">
      <div className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* LEFT — Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={140} 
              height={90} 
              className="relative transition-transform duration-300 group-hover:scale-105 brightness-0 invert opacity-90"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="font-bold text-white tracking-tight leading-none">
              PixPrompt
            </h2>
            <span className="text-[10px] font-medium text-indigo-300/70 uppercase tracking-widest mt-1">
              AI Design Studio
            </span>
          </div>
        </div>

        {/* CENTER — Nav */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-8 items-center text-sm font-semibold text-foreground/70">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Pricing", path: "/pricing" }
            ].map((item) => (
              <li 
                key={item.name} 
                className="relative group cursor-pointer transition-colors hover:text-foreground"
                onClick={() => router.push(item.path)}
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, var(--primary), #a855f7)` }}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT — Button + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {!user ? (
            <SignInButton mode="modal">
              <button
                className="relative group px-6 py-2.5 rounded-full font-bold text-sm text-background transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-indigo-500/20"
              >
                <div className="absolute inset-0 bg-primary rounded-full transition-all duration-300 group-hover:opacity-90"></div>
                <span className="relative">Get Started</span>
              </button>
            </SignInButton>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-inner group transition-all duration-300 hover:bg-white/10">
                <div className="relative">
                  <Zap size={16} className="text-primary fill-primary animate-pulse group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-bold text-foreground">
                  {userDetail?.credits ?? 0}
                </span>
              </div>
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500">
                <div className="bg-background p-0.5 rounded-full">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-xl bg-white/5 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-2xl animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col items-center gap-6 py-8">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Pricing", path: "/pricing" }
            ].map((item) => (
              <li
                key={item.name}
                className="text-lg font-bold text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
              >
                {item.name}
              </li>
            ))}

            {!user ? (
              <SignInButton mode="modal">
                <button className="px-8 py-3 rounded-full bg-primary text-background font-bold shadow-lg">
                  Get Started
                </button>
              </SignInButton>
            ) : null}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
