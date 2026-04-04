"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ContentEntry } from "@/lib/content";

type Props = {
  entry: ContentEntry;
  onPullAnother: () => void;
};

export default function OracleCard({ entry, onPullAnother }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-flip to reveal after mount
  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 350);
    return () => clearTimeout(t);
  }, []);

  async function handleShare() {
    const text = `"${entry.quote}"\n\n— ${entry.source_title}\n\nvia Uncle Shaan`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex flex-col items-center gap-7 w-full max-w-xs mx-auto">

      {/* ── Card ── */}
      <div
        className="card-scene w-full cursor-pointer"
        style={{ height: "460px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>

          {/* FRONT = decorative back-of-card (shows before flip) */}
          <div
            className="card-front rounded-sm overflow-hidden"
            style={{ boxShadow: "5px 7px 28px rgba(26,16,8,0.4)" }}
          >
            <div className="card-back-face w-full h-full flex flex-col items-center justify-center p-8 relative">
              {/* Inset border frames */}
              <div className="absolute inset-3  border border-[var(--rust)] opacity-25 rounded-sm" />
              <div className="absolute inset-[18px] border border-[var(--rust)] opacity-12 rounded-sm" />

              {/* Centre motif */}
              <div className="flex flex-col items-center gap-4 relative z-10">
                <span className="text-[var(--rust)] opacity-35 text-3xl select-none">✦</span>
                <div className="text-center">
                  <p
                    className="font-type text-[var(--ink-ghost)] text-[0.6rem] tracking-[0.35em] uppercase opacity-50"
                    style={{ fontFamily: "var(--type)" }}
                  >
                    Uncle
                  </p>
                  <p
                    className="text-[var(--ink-ghost)] text-2xl font-bold italic opacity-40"
                    style={{ fontFamily: "var(--display)" }}
                  >
                    Shaan
                  </p>
                </div>
                <span className="text-[var(--rust)] opacity-35 text-3xl select-none">✦</span>
              </div>

              {/* Corner ornaments */}
              {["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} text-[var(--rust)] opacity-20 text-xs select-none`}
                >
                  ◈
                </span>
              ))}
            </div>
          </div>

          {/* BACK = parchment content face (shows after flip) */}
          <div
            className="card-back rounded-sm overflow-hidden"
            style={{
              backgroundColor: "var(--paper-light)",
              boxShadow: "5px 7px 28px rgba(26,16,8,0.25)",
            }}
          >
            <div className="w-full h-full flex flex-col p-7">
              <div className="rule-double mb-5" />

              {/* Stamp */}
              <div className="mb-4">
                <span className="stamp">{entry.source_title}</span>
              </div>

              {/* Quote */}
              <blockquote
                className="flex-1 text-[1.15rem] font-bold italic leading-snug text-[var(--ink)]"
                style={{ fontFamily: "var(--display)" }}
              >
                &ldquo;{entry.quote}&rdquo;
              </blockquote>

              {/* Excerpt */}
              {entry.full_excerpt && entry.full_excerpt !== entry.quote && (
                <p
                  className="text-[0.68rem] text-[var(--ink-faded)] leading-relaxed mt-4 line-clamp-3"
                  style={{ fontFamily: "var(--type)" }}
                >
                  {entry.full_excerpt}
                </p>
              )}

              <div className="rule-double mt-5 mb-4" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/shaan-avatar.png"
                    alt="Shaan Puri"
                    width={22}
                    height={22}
                    className="rounded-full"
                    style={{ filter: "sepia(0.25) contrast(1.05)", objectFit: "cover" }}
                  />
                  <span
                    className="text-[0.6rem] text-[var(--ink-faded)] tracking-wider"
                    style={{ fontFamily: "var(--type)" }}
                  >
                    {entry.date}
                  </span>
                </div>
                <a
                  href={entry.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[0.6rem] tracking-widest uppercase text-[var(--rust)] hover:underline"
                  style={{ fontFamily: "var(--type)" }}
                >
                  Read →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onPullAnother}
          className="w-full py-3.5 bg-[var(--ink)] text-[var(--paper)] text-[0.65rem] tracking-[0.18em] uppercase transition-colors hover:bg-[var(--ink-mid)]"
          style={{ fontFamily: "var(--type)" }}
        >
          Pull Another Card
        </button>
        <button
          onClick={handleShare}
          className="w-full py-3 border border-[var(--ink-ghost)] text-[var(--ink-faded)] text-[0.65rem] tracking-[0.18em] uppercase transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          style={{ fontFamily: "var(--type)" }}
        >
          {copied ? "Copied to clipboard" : "Share this"}
        </button>
      </div>
    </div>
  );
}
