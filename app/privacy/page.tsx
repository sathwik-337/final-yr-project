"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black tracking-tighter mb-4">Privacy Policy</h1>
            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Last Updated: March 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
             {[
               { icon: Shield, title: "Data Security", text: "Enterprise-grade encryption for all your design data." },
               { icon: Lock, title: "Private Projects", text: "Your prompts and code are yours alone." },
               { icon: Eye, title: "Transparency", text: "Clear disclosure on how we use AI models." }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                 <item.icon className="mx-auto text-indigo-400 mb-4" size={24} />
                 <h3 className="font-bold mb-2">{item.title}</h3>
                 <p className="text-xs text-foreground/60 leading-relaxed">{item.text}</p>
               </div>
             ))}
          </div>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, use our AI generation tools, or contact support. This includes your name, email address, and the prompts you provide to our AI models.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, including training our internal AI models (unless you opt out). We do NOT sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">3. Data Retention</h2>
              <p>
                We retain your project data as long as your account is active. You can delete your projects or your entire account at any time through your settings panel.
              </p>
            </section>

            <section className="space-y-4 p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
               <h2 className="text-xl font-bold text-indigo-400">Questions?</h2>
               <p className="text-sm">
                 If you have any questions about this Privacy Policy, please contact our data protection officer at privacy@pixprompt.ai.
               </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
