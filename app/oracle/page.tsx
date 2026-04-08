"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

type Phase = "pre-pull" | "dealing-out" | "revealed" | "returning";

// Timing constants (ms)
const SLIDE_MS = 520;
const FLIP_BACK_MS = 220;
const AUTO_FLIP_DELAY_FIRST = 350;
const AUTO_FLIP_DELAY_SUBSEQUENT = 200;

export default function OraclePage() {
  const [seen] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<ContentEntry | null>(null);
  const [phase, setPhase] = useState<Phase>("pre-pull");
  const [cardKey, setCardKey] = useState(0);
  const [isFirstPull, setIsFirstPull] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const pull = useCallback(() => {
    // First pull — transition pre-pull UI out, deal first card
    if (phase === "pre-pull") {
      const card = pickCard(seen);
      seen.add(card.id);
      setCurrent(card);
      setCardKey((k) => k + 1);
      // Start at "in-deck", then next frame transition to "out"
      setPhase("dealing-out");
      timers.current.push(
        setTimeout(() => {
          setPhase("revealed");
          setIsFirstPull(false);
        }, SLIDE_MS)
      );
      return;
    }

    // Block during any transition
    if (phase !== "revealed") return;

    clearTimers();

    // 1. Returning phase: card flips back, slides up into the deck
    setPhase("returning");

    // 2. After slide-in completes, swap entry + remount + start slide-out
    timers.current.push(
      setTimeout(() => {
        const card = pickCard(seen);
        seen.add(card.id);
        setCurrent(card);
        setCardKey((k) => k + 1);
        setPhase("dealing-out");
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate?.(12);
        }
      }, SLIDE_MS)
    );

    // 3. After slide-out completes, back to revealed
    timers.current.push(
      setTimeout(() => {
        setPhase("revealed");
      }, SLIDE_MS * 2)
    );
  }, [phase, seen]);

  // Track the active-card slide target. When phase flips to "dealing-out",
  // we start at "in" then flip to "out" on the next frame so the CSS
  // transition fires. Returning goes the other way.
  const [slideTarget, setSlideTarget] = useState<"in" | "out">("in");

  useEffect(() => {
    if (phase === "dealing-out") {
      setSlideTarget("in");
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlideTarget("out"));
      });
      return () => cancelAnimationFrame(raf);
    }
    if (phase === "returning") {
      setSlideTarget("in");
    }
    if (phase === "pre-pull") {
      setSlideTarget("in");
    }
  }, [phase]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const remaining = allCards.length - seen.size;
  const showActiveArea = phase !== "pre-pull";

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

      {!showActiveArea ? (
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
        /* ── Active area: persistent deck + sliding card ── */
        <div className="flex flex-col items-center max-w-xs mx-auto w-full">
          <div className="relative w-full" style={{ minHeight: "820px" }}>

            {/* Persistent mini deck at top — never moves */}
            <div className="mini-deck" style={{ height: "240px" }}>
              <div className="relative w-44 h-60 mx-auto">
                <div
                  className="absolute inset-0 translate-x-2 translate-y-2 card-back-face"
                  style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
                />
                <div
                  className="absolute inset-0 translate-x-1 translate-y-1 card-back-face"
                  style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
                />
                <div
                  className="absolute inset-0 card-back-face flex flex-col items-center justify-center"
                  style={{ boxShadow: "3px 4px 18px rgba(26,16,8,0.3)" }}
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
            </div>

            {/* Active card — transitions between deck position and table position */}
            {current && (
              <div className="active-card" data-slide={slideTarget}>
                <OracleCard
                  key={cardKey}
                  entry={current}
                  onPullAnother={pull}
                  exiting={phase === "returning"}
                  autoFlipDelay={
                    isFirstPull ? AUTO_FLIP_DELAY_FIRST : AUTO_FLIP_DELAY_SUBSEQUENT
                  }
                  disabled={phase !== "revealed"}
                />
              </div>
            )}
          </div>
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
