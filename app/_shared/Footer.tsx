"use client";

import React from "react";
import Image from "next/image";
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Zap, 
  Layout, 
  ShieldCheck 
} from "lucide-react";

const PRIMARY = "oklch(0.3871 0.1796 289.69)";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--background)] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2.5 rounded-xl bg-white/5 text-foreground/40 hover:text-primary hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-foreground font-bold mb-6 tracking-tight text-sm uppercase">Product</h4>
            <ul className="space-y-4">
              {[
                { name: "UI Generator", icon: Zap, href: "/" },
                { name: "Templates", icon: Layout, href: "/" },
                { name: "Mobile Apps", icon: ShieldCheck, href: "/" },
                { name: "Pricing", icon: ArrowUpRight, href: "/pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="group flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium">
                    <item.icon size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                    {item.name}
                  </a>
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
                { name: "Contact", href: "/contact" },
                { name: "Careers", href: "/careers" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-foreground/60 hover:text-foreground transition-colors text-sm font-medium">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-foreground font-bold mb-6 tracking-tight text-sm uppercase">Newsletter</h4>
            <p className="text-foreground/60 text-sm font-medium mb-4">
              Stay updated with the latest AI design trends.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-foreground/20 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 rounded-xl bg-primary text-background hover:opacity-90 transition-opacity">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/20 text-xs font-bold uppercase tracking-widest">
            © {currentYear} PixPrompt UI. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Terms</a>
            <a href="#" className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-foreground/20 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
