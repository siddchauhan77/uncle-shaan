"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after the user has scrolled past ~60% of the first viewport
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 pointer-events-none transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        background:
          "linear-gradient(to top, var(--paper) 60%, rgba(240,232,213,0.85) 85%, rgba(240,232,213,0))",
      }}
    >
      <Link
        href="/quiz"
        className={`mx-auto flex items-center justify-center gap-2 max-w-md w-full py-4 text-[0.72rem] tracking-[0.18em] uppercase ${
          visible ? "pointer-events-auto" : ""
        }`}
        style={{
          fontFamily: "var(--type)",
          backgroundColor: "var(--ink)",
          color: "var(--paper)",
          boxShadow: "4px 4px 0 var(--rust)",
        }}
      >
        <span>Take the 60-second quiz</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
