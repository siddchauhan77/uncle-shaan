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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="w-full max-w-sm mx-auto mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm text-[#6B6B6B] hover:text-[#111111] transition-colors">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/shaan-avatar.png" alt="Uncle Shaan" width={28} height={28} />
          <span className="text-sm font-medium text-[#111111]">Uncle Shaan</span>
        </div>
      </div>

      {!revealed ? (
        /* Pre-pull state */
        <div className="flex flex-col items-center text-center gap-6 max-w-sm mx-auto px-4">
          <Image src="/shaan-avatar.png" alt="Uncle Shaan" width={96} height={96} className="mb-2" />
          <h1 className="text-3xl font-bold text-[#111111]">What does<br />Uncle Shaan say?</h1>
          <p className="text-[#6B6B6B] text-base leading-relaxed">
            Pull a card. Get a piece of wisdom from Shaan&apos;s actual writing.
            No algorithm. Just the good stuff.
          </p>
          <button
            onClick={pull}
            className="w-full py-4 bg-[#F5A623] text-[#111111] font-bold rounded-xl text-base active:scale-95 transition-transform hover:bg-amber-400"
          >
            Pull a card
          </button>
          <Link
            href="/quiz"
            className="text-sm text-[#6B6B6B] hover:text-[#111111] underline underline-offset-2"
          >
            Or take the quiz for a personalized prescription →
          </Link>
        </div>
      ) : (
        /* Card revealed */
        current && (
          <OracleCard
            entry={current}
            onPullAnother={pull}
          />
        )
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-xs text-[#6B6B6B]">
          {allCards.length} cards from Shaan&apos;s essays &amp; newsletters
        </p>
      </div>
    </main>
  );
}
