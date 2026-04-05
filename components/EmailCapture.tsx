"use client";

import { useState } from "react";

type Props = {
  source: "homepage" | "quiz-result";
  archetype?: string;
};

export default function EmailCapture({ source, archetype }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, archetype }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="py-5 px-6 border border-[var(--rust)] text-center"
        style={{ backgroundColor: "var(--paper-light)" }}
      >
        <span
          className="text-[0.62rem] tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
        >
          ✦ You&apos;re on the list
        </span>
      </div>
    );
  }

  return (
    <div
      className="py-5 px-6 border border-[var(--ink-ghost)]"
      style={{ backgroundColor: "var(--paper-light)" }}
    >
      <p
        className="text-[0.6rem] tracking-[0.22em] uppercase mb-3"
        style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
      >
        Get more notes like this
      </p>
      <p
        className="text-sm italic mb-4"
        style={{ fontFamily: "var(--display)", color: "var(--ink-mid)" }}
      >
        1–2 emails a week. No noise.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="w-full bg-transparent border-b border-[var(--ink-ghost)] focus:border-[var(--ink)] outline-none py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-ghost)] transition-colors disabled:opacity-50"
          style={{ fontFamily: "var(--type)" }}
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="w-full py-3 mt-1 text-[0.62rem] tracking-[0.2em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--type)",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          {status === "loading" ? "Saving..." : "Keep me posted →"}
        </button>
      </form>

      {status === "error" && (
        <p
          className="text-[0.58rem] mt-2 tracking-wide"
          style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
        >
          Something went wrong — try again.
        </p>
      )}
    </div>
  );
}
