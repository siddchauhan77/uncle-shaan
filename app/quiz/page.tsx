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

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    situation: "",
    mindset: "",
    risk: "",
    winning: "",
    plan: "",
  });
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

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
        <Image src="/shaan-avatar.svg" alt="" width={64} height={64} className="animate-pulse" />
        <p className="text-[#111111] font-semibold text-lg">Uncle Shaan is thinking...</p>
        <p className="text-[#6B6B6B] text-sm">Finding exactly what you need to read</p>
      </main>
    );
  }

  if (prescription) {
    return (
      <main className="min-h-screen flex flex-col px-4 py-12 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-sm text-[#6B6B6B] hover:text-[#111111]">← Back</Link>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <Image src="/shaan-avatar.svg" alt="Uncle Shaan" width={44} height={44} />
          <div>
            <h1 className="text-xl font-bold text-[#111111]">Your prescription</h1>
            <p className="text-sm text-[#6B6B6B]">From Uncle Shaan, just for you</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {prescription.map((item, i) => (
            <PrescriptionCard key={item.entry.id} entry={item.entry} reason={item.reason} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/oracle" className="w-full py-3 text-center bg-[#F5A623] text-[#111111] font-bold rounded-xl text-sm active:scale-95 transition-transform">
            Pull an oracle card too
          </Link>
          <button
            onClick={() => { setPrescription(null); setStep(0); setAnswers({ situation: "", mindset: "", risk: "", winning: "", plan: "" }); }}
            className="w-full py-3 bg-white border border-gray-200 text-[#6B6B6B] font-medium rounded-xl text-sm active:scale-95 transition-transform"
          >
            Retake the quiz
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-12 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="text-sm text-[#6B6B6B] hover:text-[#111111]">← Back</Link>
        <div className="flex items-center gap-2">
          <Image src="/shaan-avatar.svg" alt="" width={28} height={28} />
          <span className="text-sm font-medium text-[#111111]">Uncle Shaan&apos;s quiz</span>
        </div>
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

      {/* Next button */}
      <div className="mt-8">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="w-full py-4 bg-[#F5A623] text-[#111111] font-bold rounded-xl text-base disabled:opacity-40 active:scale-95 transition-all"
        >
          {step < QUESTIONS.length - 1 ? "Next →" : "Get my prescription"}
        </button>
      </div>
    </main>
  );
}
