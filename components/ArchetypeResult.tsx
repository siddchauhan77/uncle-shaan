"use client";

import Link from "next/link";
import Image from "next/image";
import { getEntriesByIds } from "@/lib/content";
import type { Archetype } from "@/lib/archetypes";
import EmailCapture from "@/components/EmailCapture";

type Props = {
  archetype: Archetype;
  onRetake: () => void;
};

const MFM_BASE = "https://www.mfmvault.com";

export default function ArchetypeResult({ archetype, onRetake }: Props) {
  // Pre-load any quoted content entries
  const contentIds = archetype.prescriptions
    .filter((p) => p.contentId)
    .map((p) => p.contentId as string);
  const entries = getEntriesByIds(contentIds);

  return (
    <div className="flex flex-col gap-0">

      {/* ── Header ── */}
      <div className="rule-double mb-5" />
      <div className="flex items-start justify-between mb-6">
        <div>
          <p
            className="text-[0.58rem] tracking-[0.28em] uppercase mb-1"
            style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
          >
            Your diagnosis
          </p>
          <h1
            className="text-3xl font-black italic leading-tight"
            style={{ fontFamily: "var(--display)" }}
          >
            {archetype.name}
          </h1>
          <p
            className="text-[0.62rem] tracking-wider mt-1"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            {archetype.tagline}
          </p>
        </div>
        <Image
          src="/shaan-avatar.png"
          alt="Shaan Puri"
          width={44}
          height={62}
          className="object-cover shrink-0 mt-1"
          style={{ filter: "sepia(0.15)", boxShadow: "2px 2px 0 var(--ink-ghost)" }}
        />
      </div>

      {/* ── Diagnosis ── */}
      <div
        className="p-5 mb-6"
        style={{ backgroundColor: "var(--paper-warm)", borderLeft: "3px solid var(--rust)" }}
      >
        <p className="text-base leading-relaxed" style={{ fontFamily: "var(--body)" }}>
          {archetype.diagnosis}
        </p>
      </div>

      <div className="rule mb-6" />

      {/* ── Prescriptions ── */}
      <p
        className="text-[0.58rem] tracking-[0.28em] uppercase mb-4"
        style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
      >
        Your prescription
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {archetype.prescriptions.map((rx, i) => {
          const entry = rx.contentId
            ? entries.find((e) => e.id === rx.contentId)
            : null;

          return (
            <div
              key={i}
              className="p-5 border border-[var(--ink-ghost)]"
              style={{ backgroundColor: "var(--paper-light)" }}
            >
              {/* Rx stamp row */}
              <div className="flex items-center justify-between mb-3">
                <span className="stamp" style={{ transform: "rotate(-1deg)" }}>
                  {["Rx. I", "Rx. II", "Rx. III"][i]}
                </span>
                <span
                  className="text-[0.58rem] tracking-wider uppercase"
                  style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
                >
                  {rx.label}
                </span>
              </div>

              <div className="rule mb-3" />

              {rx.type === "quote" ? (
                <>
                  <blockquote
                    className="text-base font-bold italic leading-snug border-l-2 border-[var(--rust)] pl-4 mb-3"
                    style={{ fontFamily: "var(--display)" }}
                  >
                    &ldquo;{rx.body}&rdquo;
                  </blockquote>
                  {entry && (
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className="text-[0.58rem] tracking-wide"
                        style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
                      >
                        {entry.source_title} · {entry.date}
                      </span>
                      <a
                        href={entry.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.58rem] tracking-widest uppercase hover:underline"
                        style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
                      >
                        Read →
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: rx.type === "action" ? "var(--type)" : "var(--body)",
                    color: rx.type === "action" ? "var(--ink)" : "var(--ink-mid)",
                    fontStyle: rx.type === "mindset" ? "italic" : "normal",
                  }}
                >
                  {rx.body}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Go Deeper (MFM Vault) ── */}
      <div className="rule mb-5" />
      <div className="mb-8">
        <p
          className="text-[0.58rem] tracking-[0.25em] uppercase mb-3"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          Go deeper on MFM Vault
        </p>
        <div className="flex flex-col gap-2">
          {archetype.mfmSearches.map((s) => (
            <a
              key={s.query}
              href={`${MFM_BASE}/?search=${encodeURIComponent(s.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 border border-[var(--ink-ghost)] hover:border-[var(--ink)] transition-colors group"
              style={{ backgroundColor: "var(--paper-light)" }}
            >
              <span
                className="text-sm group-hover:text-[var(--ink)]"
                style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
              >
                Search &ldquo;{s.label}&rdquo; on MFM Vault
              </span>
              <span
                className="text-[0.6rem] tracking-wider group-hover:text-[var(--rust)]"
                style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Email capture ── */}
      <div className="mb-6">
        <EmailCapture source="quiz-result" archetype={archetype.name} />
      </div>

      {/* ── CTAs ── */}
      <div className="rule mb-5" />
      <div className="flex flex-col gap-3">
        <Link
          href="/oracle"
          className="w-full py-3.5 text-center text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
          style={{
            fontFamily: "var(--type)",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          Pull an oracle card
        </Link>
        <button
          onClick={onRetake}
          className="w-full py-3 border text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          style={{
            fontFamily: "var(--type)",
            borderColor: "var(--ink-ghost)",
            color: "var(--ink-faded)",
          }}
        >
          Retake the quiz
        </button>
      </div>

      {/* ── Footer disclaimer ── */}
      <div className="rule mt-8 mb-4" />
      <p
        className="text-center text-[0.55rem] tracking-wider leading-relaxed"
        style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
      >
        Fan-made project inspired by Shaan Puri / My First Million.<br />
        Not affiliated with or endorsed by Shaan Puri.
      </p>
    </div>
  );
}
