"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import PrescriptionCard from "@/components/PrescriptionCard";
import type { ContentEntry } from "@/lib/content";

type Answers = {
  situation: string;
  mindset: string;
  risk: string;
  winning: string;
  plan: string;
};

type PrescriptionItem = {
  entry: ContentEntry;
  reason: string;
};

const QUESTIONS = [
  {
    key: "situation" as keyof Answers,
    question: "Where are you right now?",
    type: "choice" as const,
    options: [
      { label: "In school", value: "in-school" },
      { label: "Just graduated", value: "just-graduated" },
      { label: "Working a job", value: "working-job" },
      { label: "Building something", value: "building" },
    ],
  },
  {
    key: "mindset" as keyof Answers,
    question: "What's the main thing on your mind?",
    type: "choice" as const,
    options: [
      { label: "Money — I need to make more", value: "money" },
      { label: "Direction — I don't know what I want", value: "direction" },
      { label: "Relationships — people, community, love", value: "relationships" },
      { label: "Just figuring it out", value: "figuring-out" },
    ],
  },
  {
    key: "risk" as keyof Answers,
    question: "How do you feel about risk?",
    type: "scale" as const,
    options: [],
  },
  {
    key: "winning" as keyof Answers,
    question: "What would 'winning' look like in 2 years?",
    type: "text" as const,
    options: [],
  },
  {
    key: "plan" as keyof Answers,
    question: "Be honest — do you have a plan?",
    type: "choice" as const,
    options: [
      { label: "Yes, I have a clear plan", value: "yes" },
      { label: "Kind of, sort of", value: "kind-of" },
      { label: "Not really", value: "not-really" },
      { label: "lol no", value: "lol-no" },
    ],
  },
];

const EMPTY_ANSWERS: Answers = { situation: "", mindset: "", risk: "", winning: "", plan: "" };

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [loading, setLoading] = useState(false);
  const [prescription, setPrescription] = useState<PrescriptionItem[] | null>(null);
  const [error, setError] = useState("");

  const current = QUESTIONS[step];
  const currentValue = answers[current?.key];
  const canAdvance = currentValue.trim().length > 0;

  function handleChange(val: string) {
    setAnswers((a) => ({ ...a, [current.key]: val }));
  }

  async function handleNext() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      await submit();
    }
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setPrescription(data.prescription);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="text-center max-w-xs">
          <div className="rule-double mb-8 max-w-[100px] mx-auto" />
          <Image
            src="/shaan-avatar.png"
            alt=""
            width={56}
            height={78}
            className="mx-auto mb-6 animate-pulse object-cover"
            style={{ filter: "sepia(0.2) contrast(1.05)" }}
          />
          <p
            className="text-xl font-bold italic mb-2"
            style={{ fontFamily: "var(--display)" }}
          >
            Uncle Shaan is thinking...
          </p>
          <p
            className="text-xs tracking-wider"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            Finding exactly what you need to read
          </p>
          <div className="rule-double mt-8 max-w-[100px] mx-auto" />
        </div>
      </main>
    );
  }

  /* ── Prescription view ── */
  if (prescription) {
    return (
      <main
        className="min-h-screen flex flex-col px-6 py-12 max-w-lg mx-auto"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="rule-double mb-5" />

        <div className="flex items-center justify-between mb-5">
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

        <div className="rule mb-7" />

        <div className="mb-8">
          <p
            className="text-[0.6rem] tracking-[0.28em] uppercase mb-2"
            style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
          >
            Your prescription
          </p>
          <h1
            className="text-3xl font-black italic"
            style={{ fontFamily: "var(--display)" }}
          >
            From Uncle Shaan
          </h1>
        </div>

        <div className="flex flex-col gap-5 mb-10">
          {prescription.map((item, i) => (
            <PrescriptionCard key={item.entry.id} entry={item.entry} reason={item.reason} index={i} />
          ))}
        </div>

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
            Pull an oracle card too
          </Link>
          <button
            onClick={() => { setPrescription(null); setStep(0); setAnswers(EMPTY_ANSWERS); }}
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
      </main>
    );
  }

  /* ── Quiz flow ── */
  return (
    <main
      className="min-h-screen flex flex-col px-6 py-12 max-w-lg mx-auto"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Header */}
      <div className="rule-double mb-4" />
      <div className="flex items-center justify-between mb-4">
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
            alt=""
            width={20}
            height={20}
            className="rounded-full"
            style={{ filter: "sepia(0.2)", objectFit: "cover" }}
          />
          <span
            className="text-[0.62rem] tracking-wider uppercase"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            Uncle Shaan&apos;s quiz
          </span>
        </div>
      </div>

      {/* Progress bar — thin rust line */}
      <div
        className="w-full h-px mb-10 relative"
        style={{ backgroundColor: "var(--ink-ghost)" }}
      >
        <div
          className="absolute left-0 top-0 h-full transition-all duration-500"
          style={{
            backgroundColor: "var(--rust)",
            width: `${((step + 1) / QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="flex-1">
        <QuizCard
          question={current.question}
          options={current.options}
          type={current.type}
          value={currentValue}
          onChange={handleChange}
          questionNumber={step + 1}
          total={QUESTIONS.length}
        />
      </div>

      {/* Continue button */}
      <div className="mt-10">
        {error && (
          <p
            className="text-xs mb-4 tracking-wide"
            style={{ fontFamily: "var(--type)", color: "var(--rust-dark)" }}
          >
            {error}
          </p>
        )}
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="w-full py-4 text-[0.65rem] tracking-[0.2em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--type)",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          {step < QUESTIONS.length - 1 ? "Continue →" : "Get my prescription"}
        </button>
      </div>
    </main>
  );
}
