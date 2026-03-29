"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { Mail, MessageSquare, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
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
              Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-foreground/60 font-medium max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team is here to help you build better.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 px-6 max-w-7xl mx-auto w-full pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Mail, label: "Email Us", value: "support@pixprompt.ai" },
                  { icon: MessageSquare, label: "Live Chat", value: "Available 24/7" },
                  { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000" },
                  { icon: MapPin, label: "Visit Us", value: "San Francisco, CA" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                 <h3 className="text-2xl font-black mb-4">Enterprise Inquiries</h3>
                 <p className="text-foreground/60 font-medium mb-8">
                   Looking for custom AI solutions for your large-scale design team? Let's talk about our enterprise plans.
                 </p>
                 <button className="px-6 py-3 rounded-full bg-indigo-500 text-white font-bold text-sm hover:scale-105 transition-transform active:scale-95">
                   Schedule a Demo
                 </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm relative">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Send size={120} className="rotate-12" />
               </div>
               
               <form className="relative space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest px-2">Full Name</label>
                     <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest px-2">Email Address</label>
                     <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest px-2">Subject</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium appearance-none">
                      <option className="bg-background">General Inquiry</option>
                      <option className="bg-background">Support Request</option>
                      <option className="bg-background">Feedback</option>
                      <option className="bg-background">Other</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest px-2">Message</label>
                    <textarea rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none"></textarea>
                 </div>

                 <button className="w-full py-4 rounded-2xl bg-primary text-background font-black text-sm hover:scale-[1.02] transition-all active:scale-[0.98] shadow-xl shadow-indigo-500/20">
                   Send Message
                 </button>
               </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
