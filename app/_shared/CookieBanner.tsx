"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pixprompt-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);

    if (!consent) {
      setVisible(true);
    }

    const handleOpen = () => setVisible(true);
    window.addEventListener("open-cookie-banner", handleOpen);

    return () => window.removeEventListener("open-cookie-banner", handleOpen);
  }, []);

  const saveConsent = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-background/95 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/80">
            Cookie Notice
          </p>
          <h3 className="text-lg font-black text-foreground">
            We use cookies to remember preferences and improve the site.
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
            Essential cookies keep the website working. Optional analytics cookies help us understand product usage. Read more in our{" "}
            <Link href="/privacy#cookies" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>
            .
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => saveConsent("declined")}
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-foreground/70 transition hover:bg-white/5 hover:text-foreground"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-background transition hover:opacity-90"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
