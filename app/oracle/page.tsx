"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import OracleCard from "@/components/OracleCard";
import { getOracleCards } from "@/lib/content";
import type { ContentEntry } from "@/lib/content";

const allCards = getOracleCards();

function pickCard(seen: Set<string>): ContentEntry {
  const unseen = allCards.filter((c) => !seen.has(c.id));
  const pool = unseen.length > 0 ? unseen : allCards;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function OraclePage() {
  const [seen] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<ContentEntry | null>(null);
  const [revealed, setRevealed] = useState(false);

  const pull = useCallback(() => {
    const card = pickCard(seen);
    seen.add(card.id);
    setCurrent(card);
    setRevealed(true);
  }, [seen]);

  return (
    <main
      className="min-h-screen flex flex-col px-6 py-12"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Header */}
      <div className="w-full max-w-xs mx-auto mb-8">
        <div className="rule-double mb-4" />
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[0.62rem] tracking-widest uppercase transition-colors hover:text-[var(--rust)]"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            ← Back
          </Link>
          <div className="flex items-center gap-2">
            <Image
              src="/shaan-avatar.png"
              alt="Shaan Puri"
              width={20}
              height={20}
              className="rounded-full"
              style={{ filter: "sepia(0.2)", objectFit: "cover" }}
            />
            <span
              className="text-[0.62rem] tracking-wider uppercase"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              Uncle Shaan
            </span>
          </div>
        </div>
        <div className="rule mt-4" />
      </div>

      {!revealed ? (
        /* ── Pre-pull state ── */
        <div className="flex flex-col items-center text-center gap-8 max-w-xs mx-auto flex-1 justify-center">

          {/* Stacked deck visual */}
          <div className="relative w-44 h-60 mx-auto">
            <div
              className="absolute inset-0 translate-x-2.5 translate-y-2.5 card-back-face"
              style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
            />
            <div
              className="absolute inset-0 translate-x-1 translate-y-1 card-back-face"
              style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
            />
            <div
              className="absolute inset-0 card-back-face flex flex-col items-center justify-center"
              style={{ boxShadow: "4px 5px 20px rgba(26,16,8,0.35)" }}
            >
              <div className="absolute inset-3 border border-[var(--rust)] opacity-25" />
              <div className="absolute inset-[18px] border border-[var(--rust)] opacity-12" />
              <div className="flex flex-col items-center gap-3 z-10">
                <span className="text-[var(--rust)] opacity-35 text-2xl select-none">✦</span>
                <p
                  className="text-[var(--ink-ghost)] text-xl font-bold italic opacity-40"
                  style={{ fontFamily: "var(--display)" }}
                >
                  Shaan
                </p>
                <span className="text-[var(--rust)] opacity-35 text-2xl select-none">✦</span>
              </div>
            </div>
          </div>

          <div>
            <h1
              className="text-4xl font-black italic leading-tight mb-3"
              style={{ fontFamily: "var(--display)" }}
            >
              What does<br />Uncle Shaan say?
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              Pull a card. Get a piece of wisdom<br />from Shaan&apos;s actual writing.
            </p>
          </div>

          <button
            onClick={pull}
            className="w-full max-w-[240px] py-4 text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
            style={{
              fontFamily: "var(--type)",
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
            }}
          >
            Pull a card
          </button>

          <Link
            href="/quiz"
            className="text-[0.62rem] tracking-wider underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            Or take the quiz for a prescription →
          </Link>
        </div>
      ) : (
        current && (
          <div className="flex flex-col items-center max-w-xs mx-auto w-full">
            <OracleCard entry={current} onPullAnother={pull} />
          </div>
        )
      )}

      {/* Footer */}
      <div className="mt-12 text-center max-w-xs mx-auto">
        <div className="rule mb-4" />
        <p
          className="text-[0.58rem] tracking-widest uppercase"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          {allCards.length} cards from Shaan&apos;s essays &amp; newsletters
        </p>
      </div>
    </main>
  );
}
