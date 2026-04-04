"use client";

import { useState } from "react";
import type { ContentEntry } from "@/lib/content";
import Image from "next/image";

type Props = {
  entry: ContentEntry;
  onPullAnother: () => void;
};

export default function OracleCard({ entry, onPullAnother }: Props) {
  const [flipped, setFlipped] = useState(false);

  function handleShare() {
    const text = `"${entry.quote}" — Uncle Shaan\n\n${entry.source_url}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto px-4">
      {/* Card */}
      <div
        className="card-container w-full"
        style={{ height: "420px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`card-inner w-full h-full ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="card-face bg-white rounded-2xl border-2 border-[#F5A623] shadow-lg p-8 flex flex-col justify-between cursor-pointer">
            <div className="text-xs font-medium tracking-widest text-[#6B6B6B] uppercase">
              Uncle Shaan says...
            </div>
            <blockquote className="text-xl font-semibold leading-snug text-[#111111]">
              &ldquo;{entry.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <Image
                src="/shaan-avatar.svg"
                alt="Uncle Shaan"
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-[#111111]">{entry.source_title}</div>
                <div className="text-xs text-[#6B6B6B]">{entry.date}</div>
              </div>
            </div>
            <div className="text-xs text-center text-[#6B6B6B]">Tap to flip</div>
          </div>

          {/* Back */}
          <div className="card-face card-back bg-[#111111] rounded-2xl border-2 border-[#F5A623] shadow-lg p-8 flex flex-col justify-between cursor-pointer">
            <div className="text-xs font-medium tracking-widest text-[#F5A623] uppercase">
              The full story
            </div>
            <p className="text-base leading-relaxed text-[#FAFAF8]">
              {entry.full_excerpt}
            </p>
            <a
              href={entry.source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[#F5A623] font-semibold text-sm hover:underline"
            >
              Go deeper →
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <button
          onClick={onPullAnother}
          className="flex-1 py-3 px-4 bg-[#F5A623] text-[#111111] font-semibold rounded-xl text-sm active:scale-95 transition-transform"
        >
          Pull another
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 px-4 bg-white border border-[#111111] text-[#111111] font-semibold rounded-xl text-sm active:scale-95 transition-transform"
        >
          Share this
        </button>
      </div>
    </div>
  );
}
