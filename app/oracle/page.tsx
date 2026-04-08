"use client";

import { useState, useCallback, useRef } from "react";
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

type Phase = "pre-pull" | "revealed" | "tossing" | "drawing";

export default function OraclePage() {
  const [seen] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<ContentEntry | null>(null);
  const [phase, setPhase] = useState<Phase>("pre-pull");
  const [cardKey, setCardKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const pull = useCallback(() => {
    // First pull — instant reveal, no deck animation
    if (phase === "pre-pull") {
      const card = pickCard(seen);
      seen.add(card.id);
      setCurrent(card);
      setCardKey((k) => k + 1);
      setPhase("revealed");
      return;
    }

    // Block if an animation is already running
    if (phase !== "revealed") return;

    clearTimers();
    setPhase("tossing");

    // After toss, swap card + switch to drawing phase (deck + drawn card animate in)
    timers.current.push(
      setTimeout(() => {
        const card = pickCard(seen);
        seen.add(card.id);
        setCurrent(card);
        setCardKey((k) => k + 1);
        setPhase("drawing");
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate?.(15);
        }
      }, 420)
    );

    // After draw animation completes, switch to revealed (new card takes over)
    timers.current.push(
      setTimeout(() => {
        setPhase("revealed");
      }, 420 + 460)
    );
  }, [phase, seen]);

  const showCard = phase === "revealed" || phase === "tossing";
  const remaining = allCards.length - seen.size;

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

      {phase === "pre-pull" ? (
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
        <div className="flex flex-col items-center max-w-xs mx-auto w-full relative">

          {/* Mini deck — visible during drawing phase */}
          {phase === "drawing" && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-60 pointer-events-none anim-deck-appear"
              style={{ zIndex: 5 }}
            >
              <div
                className="absolute inset-0 translate-x-2 translate-y-2 card-back-face anim-deck-wobble"
                style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
              />
              <div
                className="absolute inset-0 translate-x-1 translate-y-1 card-back-face anim-deck-wobble"
                style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
              />
            </div>
          )}

          {/* Drawn card — slides down from deck during drawing phase */}
          {phase === "drawing" && (
            <div
              className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none anim-card-draw"
              style={{ zIndex: 10 }}
            >
              <div
                className="w-44 h-60 card-back-face flex flex-col items-center justify-center relative"
                style={{ boxShadow: "5px 7px 28px rgba(26,16,8,0.4)" }}
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
          )}

          {/* Main oracle card — visible during revealed + tossing phases */}
          {showCard && current && (
            <OracleCard
              key={cardKey}
              entry={current}
              onPullAnother={pull}
              exiting={phase === "tossing"}
              autoFlipDelay={phase === "tossing" ? 0 : 350}
              disabled={phase !== "revealed"}
            />
          )}

          {/* Placeholder to hold layout height during drawing */}
          {phase === "drawing" && <div style={{ height: "620px" }} />}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center max-w-xs mx-auto">
        <div className="rule mb-4" />
        <p
          className="text-[0.58rem] tracking-widest uppercase"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          {phase === "pre-pull"
            ? `${allCards.length} cards from Shaan's essays & newsletters`
            : `${remaining} of ${allCards.length} cards remaining`}
        </p>
      </div>
    </main>
  );
}
