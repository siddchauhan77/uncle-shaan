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

type Phase = "pre-pull" | "materializing" | "revealed" | "dissolving";

const MATERIALIZE_MS = 640;
const DISSOLVE_MS = 420;

export default function OraclePage() {
  const [seen] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<ContentEntry | null>(null);
  const [phase, setPhase] = useState<Phase>("pre-pull");
  const [cardKey, setCardKey] = useState(0);
  const [cardState, setCardState] = useState<"hidden" | "shown">("hidden");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Drive the CSS data-state: start hidden, flip to shown on next frame
  // so the browser registers the initial state and the transition fires.
  useEffect(() => {
    if (phase === "materializing") {
      setCardState("hidden");
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setCardState("shown"));
      });
      return () => cancelAnimationFrame(raf1);
    }
    if (phase === "dissolving") {
      setCardState("hidden");
    }
    if (phase === "pre-pull") {
      setCardState("hidden");
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const pull = useCallback(() => {
    if (phase === "pre-pull") {
      const card = pickCard(seen);
      seen.add(card.id);
      setCurrent(card);
      setCardKey((k) => k + 1);
      setPhase("materializing");
      timers.current.push(
        setTimeout(() => setPhase("revealed"), MATERIALIZE_MS)
      );
      return;
    }

    if (phase !== "revealed") return;

    clearTimers();

    // 1. Dissolve the current card out
    setPhase("dissolving");

    // 2. Mid-dissolve, swap entry + remount + materialize new card
    timers.current.push(
      setTimeout(() => {
        const card = pickCard(seen);
        seen.add(card.id);
        setCurrent(card);
        setCardKey((k) => k + 1);
        setPhase("materializing");
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate?.(10);
        }
      }, DISSOLVE_MS)
    );

    // 3. Settle into revealed after materialize completes
    timers.current.push(
      setTimeout(() => {
        setPhase("revealed");
      }, DISSOLVE_MS + MATERIALIZE_MS)
    );
  }, [phase, seen]);

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
        /* ── Active area: persistent deck + card materializing on top ── */
        <div className="flex flex-col items-center max-w-xs mx-auto w-full">
          <div className="relative w-full" style={{ minHeight: "620px" }}>

            {/* Persistent deck — sits behind, always visible */}
            <div className="persistent-deck">
              <div className="relative w-44 h-60">
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
            </div>

            {/* Active card — materializes on top of deck */}
            {current && (
              <div className="active-card" data-state={cardState}>
                <OracleCard
                  key={cardKey}
                  entry={current}
                  onPullAnother={pull}
                  autoFlipDelay={320}
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
