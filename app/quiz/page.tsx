"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import ArchetypeResult from "@/components/ArchetypeResult";
import { getArchetype } from "@/lib/archetypes";

type Answers = {
  situation: string;
  mindset: string[];
  risk: string;
  winning: string;
  plan: string;
};

const QUESTIONS = [
  {
    key: "situation" as keyof Answers,
    question: "Where are you right now?",
    type: "choice" as const,
    multi: false,
    options: [
      { label: "In school", value: "in-school" },
      { label: "Just graduated", value: "just-graduated" },
      { label: "Working a job", value: "working-job" },
      { label: "Building something", value: "building" },
    ],
  },
  {
    key: "mindset" as keyof Answers,
    question: "What's on your mind?",
    type: "choice" as const,
    multi: true,
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
    multi: false,
    options: [],
  },
  {
    key: "winning" as keyof Answers,
    question: "What would 'winning' look like in 2 years?",
    type: "text" as const,
    multi: false,
    options: [],
  },
  {
    key: "plan" as keyof Answers,
    question: "Be honest — do you have a plan?",
    type: "choice" as const,
    multi: false,
    options: [
      { label: "Yes, I have a clear plan", value: "yes" },
      { label: "Kind of, sort of", value: "kind-of" },
      { label: "Not really", value: "not-really" },
      { label: "lol no", value: "lol-no" },
    ],
  },
];

const EMPTY: Answers = { situation: "", mindset: [], risk: "", winning: "", plan: "" };

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [result, setResult] = useState<ReturnType<typeof getArchetype> | null>(null);

  const current = QUESTIONS[step];
  const currentValue = answers[current.key];
  const canAdvance = Array.isArray(currentValue)
    ? currentValue.length > 0
    : currentValue.trim().length > 0;

  function handleChange(val: string | string[]) {
    setAnswers((a) => ({ ...a, [current.key]: val }));
  }

  function handleNext() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      // Instant — no API call
      setResult(getArchetype(answers));
    }
  }

  function handleRetake() {
    setResult(null);
    setStep(0);
    setAnswers(EMPTY);
  }

  /* ── Result view ── */
  if (result) {
    return (
      <main
        className="min-h-screen flex flex-col px-6 py-12 max-w-lg mx-auto"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        {/* Back nav */}
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

        <ArchetypeResult archetype={result} onRetake={handleRetake} />
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

      {/* Progress — thin rust bar */}
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
          multi={current.multi}
          value={currentValue}
          onChange={handleChange}
          questionNumber={step + 1}
          total={QUESTIONS.length}
        />
      </div>

      {/* Continue */}
      <div className="mt-10">
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
