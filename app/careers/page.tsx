"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Frontend Developer (Next.js)",
      department: "Engineering",
      location: "Remote / London",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "Full-time",
    },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 relative overflow-hidden text-center">
          <div className="absolute inset-0 -z-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Revolution</span>
            </h1>
            <p className="text-xl text-foreground/60 font-medium max-w-2xl mx-auto">
              Help us build the next generation of AI-powered design tools. We're looking for passionate individuals to join our global team.
            </p>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-12 px-6 max-w-5xl mx-auto w-full pb-24">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                      {job.department}
                    </span>
                    <div className="flex items-center gap-1.5 text-foreground/40 text-[10px] font-bold uppercase tracking-widest">
                      <Clock size={12} />
                      {job.type}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black group-hover:text-indigo-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-foreground/40 text-sm font-medium">
                    <MapPin size={14} />
                    {job.location}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 rounded-full border border-white/10 font-bold text-sm hover:bg-white/5 transition-all">
                    View Details
                  </button>
                  <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center">
            <Briefcase size={48} className="mx-auto text-indigo-400 mb-6" />
            <h3 className="text-3xl font-black mb-4">Don't see a perfect fit?</h3>
            <p className="text-foreground/60 font-medium max-w-xl mx-auto mb-8">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings.
            </p>
            <button className="px-8 py-4 rounded-full bg-primary text-background font-black text-sm hover:scale-105 transition-transform active:scale-95">
              Send Open Application
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
