"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { FileText, ShieldCheck, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black tracking-tighter mb-4">Terms of Service</h1>
            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Last Updated: April 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: FileText, title: "Clear Usage", text: "Use PixPrompt for lawful design and development workflows only." },
              { icon: ShieldCheck, title: "Account Responsibility", text: "You are responsible for activity performed through your account." },
              { icon: Scale, title: "Fair Access", text: "Credits, limits, and service protections apply to prevent abuse." },
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                <item.icon className="mx-auto text-indigo-400 mb-4" size={24} />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">1. Service Use</h2>
              <p>
                PixPrompt provides AI-assisted interface generation and editing tools. You may use the service only in compliance with applicable laws and these terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">2. Accounts and Credits</h2>
              <p>
                Some features require authentication and consume credits. You are responsible for maintaining account security and for all usage initiated under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">3. Generated Content</h2>
              <p>
                You are responsible for reviewing generated outputs before using them in production. AI output may require modification, testing, and legal review depending on your use case.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-foreground">4. Availability</h2>
              <p>
                We may improve, limit, or suspend parts of the service to maintain reliability, security, and fair usage across all users.
              </p>
            </section>

            <section className="space-y-4 p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
              <h2 className="text-xl font-bold text-indigo-400">Questions about these terms?</h2>
              <p className="text-sm">
                Contact the PixPrompt team through the product support channels listed in your account dashboard.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
