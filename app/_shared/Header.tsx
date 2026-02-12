"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

function Header() {
  const [open, setOpen] = useState(false);

const {user}=useUser();


  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* LEFT — Logo */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={150} height={100} />
          <h2 className="hidden sm:block font-semibold text-gray-700 tracking-wide">
            Design Without Limits
          </h2>
        </div>

        {/* CENTER — Nav */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 items-center text-lg font-medium">
          {["Home", "Pricing"].map((item) => (
            <li key={item} className="relative group cursor-pointer">
              {item}
              <span
                className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ background: PRIMARY }}
              />
            </li>
          ))}
        </ul>

        {/* RIGHT — Button + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop Button */}
          <div className="hidden md:block">
  {!user ? (
    <SignInButton mode="modal">
    <Button
      className="transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
      style={{ background: PRIMARY }}
    >
      Get Started
    </Button>
    </SignInButton>
  ) : (
    <UserButton />
  )}
</div>


          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium">
            {["Home", "Pricing"].map((item) => (
              <li
                key={item}
                className="transition cursor-pointer hover:scale-105"
                style={{ color: PRIMARY }}
              >
                {item}
              </li>
            ))}

            {!user ? (
                <SignInButton mode="modal">
    <Button
      className="transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
      style={{ background: PRIMARY }}
    >
      Get Started
    </Button>
    </SignInButton>
  ) : (
    <UserButton />
  )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
