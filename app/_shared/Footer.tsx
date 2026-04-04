"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Zap, 
  Layout
} from "lucide-react";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const openCookieBanner = () => {
    window.dispatchEvent(new Event("open-cookie-banner"));
  };

  return (
    <footer className="w-full bg-[var(--background)] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-20"></div>
                <Image src="/logo.png" alt="logo" width={120} height={80} className="relative brightness-0 invert opacity-90" />
              </div>
            </div>
            <p className="text-foreground/60 text-sm font-medium leading-relaxed">
              Empowering designers and developers with AI-driven interface generation. Create stunning UIs in seconds.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-foreground font-bold mb-6 tracking-tight text-sm uppercase">Product</h4>
            <ul className="space-y-4">
              {[
                { name: "UI Generator", icon: Zap, href: "/" },
                { name: "Templates", icon: Layout, href: "/templates" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium">
                    <item.icon size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-foreground font-bold mb-6 tracking-tight text-sm uppercase">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-foreground/60 hover:text-foreground transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/20 text-xs font-bold uppercase tracking-widest">
            © {currentYear} PixPrompt UI. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Terms</Link>
            <Link href="/privacy" className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Privacy</Link>
            <button
              type="button"
              onClick={openCookieBanner}
              className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] py-3">
          <div className="footer-marquee-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/35"
              >
                <span>Disclaimer</span>
                <span>AI-generated output should be reviewed before production use.</span>
                <span>Validate layout, accessibility, and code quality before shipping.</span>
                <span>PixPrompt assists design workflows and does not replace engineering review.</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
