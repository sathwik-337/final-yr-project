"use client";

import React from "react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { 
  Zap, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Layout,
  Smartphone,
  Cpu
} from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for exploring the power of AI design.",
      features: ["5 credits included", "Basic templates", "Community support", "Public projects"],
      color: "bg-white/5 text-white border-white/5",
      buttonText: "Start for Free",
      isPopular: false
    },
    {
      name: "Pro",
      price: "29",
      description: "For designers who want to build and ship fast.",
      features: ["100 credits monthly", "Premium 3D templates", "Priority AI generation", "Private projects", "Export to code"],
      color: "bg-indigo-600 text-white border-indigo-500",
      buttonText: "Go Pro",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Unlimited power for high-performance teams.",
      features: ["Unlimited credits", "Custom design systems", "Dedicated support", "Team collaboration", "SSO & Security"],
      color: "bg-white/5 text-white border-white/5",
      buttonText: "Contact Us",
      isPopular: false
    }
  ];

  return (    <div className="bg-[var(--background)] min-h-screen">
      <Header />
      
      {/* Pricing Hero */}
      <section className="relative py-32 px-6">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8">
            <Zap size={16} className="text-indigo-400 fill-indigo-400" />
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
              Flexible Pricing
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Simple Plans for <br />
            <span className="text-foreground/40">Extraordinary Designs</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed mb-20">
            Choose the plan that's right for you and start building stunning interfaces today.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border ${plan.color} relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-xs font-black uppercase tracking-widest shadow-lg border border-indigo-400">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold uppercase tracking-widest mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black tracking-tighter">$</span>
                  <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                  <span className={`${plan.isPopular ? "text-indigo-900/60" : "text-foreground/40"} font-bold`}>/mo</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed mb-8 ${plan.isPopular ? "text-indigo-900/70" : "text-foreground/60"}`}>
                  {plan.description}
                </p>

                <ul className="space-y-4 mb-10 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${plan.isPopular ? "bg-indigo-900/10" : "bg-white/10"}`}>
                        <Check size={14} className={plan.isPopular ? "text-indigo-900" : "text-indigo-400"} />
                      </div>
                      <span className={`text-sm font-bold tracking-tight ${plan.isPopular ? "text-indigo-900/80" : "text-foreground/80"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                  plan.isPopular 
                    ? "bg-indigo-600 text-white hover:bg-indigo-500" 
                    : "bg-white text-indigo-900 hover:bg-gray-100"
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-32 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
              Why Upgrade to Pro?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
              Unlock the full potential of AI-driven design with our advanced features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Privacy First", desc: "Private projects and secure collaboration." },
              { icon: Smartphone, title: "App Export", desc: "Direct export to React and Next.js." },
              { icon: Layout, title: "Custom Themes", desc: "Build your own design system." },
              { icon: Cpu, title: "Priority AI", desc: "Faster generation with advanced models." }
            ].map((f, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 border border-white/5">
                  <f.icon size={28} className="text-foreground/40 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{f.title}</h4>
                <p className="text-sm text-foreground/60 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
