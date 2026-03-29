"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { Sparkles, Users, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              Redefining the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Future of Design
              </span>
            </h1>
            <p className="text-xl text-foreground/60 font-medium leading-relaxed max-w-2xl mx-auto">
              PixPrompt was founded with a single mission: to bridge the gap between imagination and implementation using the power of generative AI.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "User-Centric",
                description: "We build tools that empower creators, not replace them. Our AI is designed to be your ultimate design partner."
              },
              {
                icon: Target,
                title: "Precision Driven",
                description: "Generating high-fidelity code is our priority. We ensure every pixel and every line of code meets industry standards."
              },
              {
                icon: ShieldCheck,
                title: "Reliable & Secure",
                description: "Your data and designs are protected with enterprise-grade security, ensuring total peace of mind."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-foreground/60 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center p-12">
                 <div className="text-center">
                   <div className="text-6xl font-black text-indigo-400 mb-4 tracking-tighter">99.9%</div>
                   <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Accuracy in Code Generation</div>
                 </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tighter leading-tight">
                Empowering the next generation of <span className="text-indigo-400">Digital Architects</span>.
              </h2>
              <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                We believe that great design should be accessible to everyone. By removing the technical barriers of frontend development, we allow designers to focus on what truly matters: the user experience.
              </p>
              <div className="pt-4">
                 <button className="px-8 py-4 rounded-full bg-primary text-background font-black text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-indigo-500/20">
                   Join Our Mission
                 </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
