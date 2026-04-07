import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Header from "../_shared/Header";
import Footer from "../_shared/Footer";
import { templates } from "@/data/constant";

function TemplatePreview({ slug }: { slug: string }) {
  if (slug === "modern-navbar") {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="h-3 w-20 rounded-full bg-white/70" />
          <div className="hidden gap-2 sm:flex">
            <div className="h-2.5 w-12 rounded-full bg-white/20" />
            <div className="h-2.5 w-10 rounded-full bg-white/15" />
            <div className="h-2.5 w-14 rounded-full bg-white/15" />
          </div>
          <div className="h-8 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="h-3 w-16 rounded-full bg-indigo-400/70" />
            <div className="h-6 w-36 rounded-full bg-white/80" />
            <div className="h-6 w-28 rounded-full bg-white/30" />
          </div>
          <div className="h-24 w-24 rounded-[1.75rem] bg-gradient-to-br from-indigo-500/70 via-purple-500/50 to-pink-500/30 shadow-2xl" />
        </div>
      </div>
    );
  }

  if (slug === "pricing-section") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[false, true, false].map((featured, index) => (
          <div
            key={index}
            className={`rounded-[1.75rem] border p-3 ${
              featured
                ? "border-indigo-400/60 bg-gradient-to-b from-indigo-500/30 to-indigo-950/40"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <div className="mb-3 h-3 w-12 rounded-full bg-white/65" />
            <div className="mb-1 h-7 w-10 rounded-full bg-white/85" />
            <div className="mb-4 h-2.5 w-14 rounded-full bg-white/20" />
            <div className="space-y-2">
              <div className="h-2.5 rounded-full bg-white/20" />
              <div className="h-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (slug === "feature-grid") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/50 to-purple-500/20" />
            <div className="mb-2 h-3 w-20 rounded-full bg-white/75" />
            <div className="h-2.5 rounded-full bg-white/20" />
            <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (slug === "dashboard-sidebar") {
    return (
      <div className="grid min-h-[220px] grid-cols-[72px_1fr] gap-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">
          <div className="mb-5 h-10 w-10 rounded-2xl bg-indigo-500/30" />
          <div className="space-y-3">
            <div className="h-8 rounded-xl bg-white/15" />
            <div className="h-8 rounded-xl bg-white/10" />
            <div className="h-8 rounded-xl bg-white/10" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 h-3 w-24 rounded-full bg-white/70" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded-2xl bg-white/10" />
              <div className="h-16 rounded-2xl bg-indigo-500/20" />
              <div className="h-16 rounded-2xl bg-white/10" />
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/10 p-4">
            <div className="mb-2 h-3 w-20 rounded-full bg-white/80" />
            <div className="h-10 rounded-2xl bg-black/20" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "auth-forms") {
    return (
      <div className="grid min-h-[220px] grid-cols-2 gap-3">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-5 h-4 w-20 rounded-full bg-white/80" />
          <div className="space-y-3">
            <div className="h-10 rounded-2xl bg-white/10" />
            <div className="h-10 rounded-2xl bg-white/10" />
            <div className="h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-pink-500/10 p-4">
          <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/10">
            <div className="h-24 w-24 rounded-[2rem] bg-white/15 shadow-[0_20px_40px_-12px_rgba(99,102,241,0.7)]" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "content-card") {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-4 h-28 rounded-[1.5rem] bg-gradient-to-br from-orange-400/50 via-rose-500/35 to-indigo-500/30" />
        <div className="mb-3 flex items-center justify-between">
          <div className="h-4 w-24 rounded-full bg-white/80" />
          <div className="h-7 w-7 rounded-full bg-white/10" />
        </div>
        <div className="h-2.5 rounded-full bg-white/20" />
        <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/10" />
      </div>
    );
  }

  if (slug === "analytics-stats") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded-full bg-white/70" />
            <div className="h-2.5 w-28 rounded-full bg-white/20" />
          </div>
          <div className="h-8 w-16 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-2.5 w-16 rounded-full bg-white/60" />
                <div className="h-5 w-10 rounded-full bg-emerald-400/20" />
              </div>
              <div className="mb-2 h-6 w-20 rounded-full bg-white/85" />
              <div className="h-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-400/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "testimonials-section") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 h-3 w-20 rounded-full bg-white/70" />
          <div className="mb-2 h-2.5 rounded-full bg-white/20" />
          <div className="mb-2 h-2.5 w-5/6 rounded-full bg-white/15" />
          <div className="mb-4 h-2.5 w-2/3 rounded-full bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400/50 to-pink-400/30" />
            <div className="space-y-2">
              <div className="h-2.5 w-16 rounded-full bg-white/70" />
              <div className="h-2 w-20 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4">
          <div className="mb-3 flex gap-1">
            {[0, 1, 2, 3, 4].map((star) => (
              <div key={star} className="h-3 w-3 rounded-full bg-amber-300/70" />
            ))}
          </div>
          <div className="mb-2 h-2.5 rounded-full bg-white/20" />
          <div className="mb-2 h-2.5 w-11/12 rounded-full bg-white/15" />
          <div className="mb-5 h-2.5 w-4/5 rounded-full bg-white/10" />
          <div className="h-16 rounded-[1.2rem] bg-indigo-500/15" />
        </div>
      </div>
    );
  }

  if (slug === "faq-accordion") {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-40 rounded-full bg-white/75" />
              <div className="h-7 w-7 rounded-full bg-white/10" />
            </div>
            {item === 0 && (
              <div className="mt-4 space-y-2">
                <div className="h-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-5/6 rounded-full bg-white/15" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (slug === "contact-section") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 h-3 w-24 rounded-full bg-white/75" />
          <div className="space-y-3">
            <div className="h-10 rounded-2xl bg-white/10" />
            <div className="h-10 rounded-2xl bg-white/10" />
            <div className="h-16 rounded-[1.2rem] bg-white/10" />
            <div className="h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-400/10 p-4">
          <div className="mb-4 h-3 w-20 rounded-full bg-white/80" />
          <div className="space-y-3">
            <div className="h-12 rounded-[1.1rem] bg-black/20" />
            <div className="h-12 rounded-[1.1rem] bg-black/20" />
            <div className="h-20 rounded-[1.25rem] bg-black/15" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "dashboard-header") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="space-y-2">
            <div className="h-2.5 w-16 rounded-full bg-white/20" />
            <div className="h-4 w-28 rounded-full bg-white/80" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded-2xl bg-white/10" />
            <div className="h-9 w-9 rounded-full bg-white/10" />
            <div className="h-9 w-9 rounded-full bg-indigo-500/30" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 h-20 rounded-[1.5rem] border border-white/10 bg-white/[0.04]" />
          <div className="h-20 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10" />
        </div>
      </div>
    );
  }

  if (slug === "kanban-board") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((column) => (
          <div key={column} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-3 w-16 rounded-full bg-white/70" />
              <div className="h-5 w-5 rounded-full bg-white/10" />
            </div>
            <div className="space-y-2">
              {[0, 1].map((card) => (
                <div key={card} className="rounded-[1rem] bg-black/20 p-2.5">
                  <div className="mb-2 h-2.5 w-4/5 rounded-full bg-white/70" />
                  <div className="mb-3 h-2 w-2/3 rounded-full bg-white/15" />
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-10 rounded-full bg-indigo-500/20" />
                    <div className="h-6 w-6 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-h-[220px] gap-3 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.5rem] bg-white/10 p-4">
          <div className="mb-3 h-3 w-12 rounded-full bg-white/75" />
          <div className="h-16 rounded-2xl bg-white/10" />
        </div>
        <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-500/30 to-purple-500/10 p-4" />
      </div>
      <div className="space-y-2 rounded-[1.5rem] bg-black/20 p-4">
        <div className="h-3 w-24 rounded-full bg-white/75" />
        <div className="h-2.5 rounded-full bg-white/15" />
        <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative overflow-hidden px-6 py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_32%)]" />
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-300">
                Ready-to-use component prompts
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-[-0.05em] text-white md:text-7xl">
              Template Library for
              <span className="block bg-gradient-to-r from-indigo-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                Instant UI Generation
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-foreground/60">
              Explore component-level prompts with a quick visual preview before you generate. Every card includes the exact prompt used to produce that style.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => {
              const Icon = template.icon;

              return (
                <article
                  key={template.slug}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  <div className="border-b border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5">
                    <TemplatePreview slug={template.slug} />
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                          <Icon className="h-3.5 w-3.5 text-indigo-300" />
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50">
                            {template.slug.replaceAll("-", " ")}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-white">
                          {template.title}
                        </h2>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                        Prompt
                      </p>
                      <p className="text-sm leading-7 text-foreground/70">
                        {template.description}
                      </p>
                    </div>

                    <Link
                      href={`/?prompt=${encodeURIComponent(template.description)}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-background transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_18px_40px_-16px_rgba(99,102,241,0.85)]"
                    >
                      Use This Prompt
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
