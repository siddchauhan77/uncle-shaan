import Image from "next/image";
import Link from "next/link";
import ScrollSection from "@/components/ScrollSection";
import EmailCapture from "@/components/EmailCapture";
import FloatingCTA from "@/components/FloatingCTA";
import { getScrollytellingCards } from "@/lib/content";

export default function Home() {
  const cards = getScrollytellingCards();

  const heroQuote = cards.find((c) => c.id === "someday-3");
  const quote1    = cards.find((c) => c.id === "finding-thing-2");
  const quote2    = cards.find((c) => c.id === "3step-1");
  const quote3    = cards.find((c) => c.id === "stop-working-1");
  const quote4    = cards.find((c) => c.id === "good-not-great-1");

  return (
    <main className="flex flex-col">

      {/* ── MASTHEAD / HERO ── */}
      <section
        className="min-h-screen flex flex-col px-6 py-14"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        <ScrollSection delay={0}>
          <div className="rule-double mb-4" />
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[0.58rem] tracking-[0.22em] text-[var(--ink-faded)] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Est. for the lost ones
            </span>
            <span
              className="text-[0.58rem] tracking-[0.22em] text-[var(--ink-faded)] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Vol. I · Issue 1
            </span>
          </div>
          <div className="rule" />
        </ScrollSection>

        {/* Masthead title — compact */}
        <ScrollSection delay={120}>
          <div className="text-center pt-6 pb-4">
            <p
              className="text-[0.6rem] tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              Your cool uncle
            </p>
            <h1
              className="font-black leading-[0.88] tracking-tight"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(3.4rem, 13vw, 6.5rem)",
              }}
            >
              Uncle<br />Shaan
            </h1>
            <p
              className="text-[0.62rem] tracking-[0.22em] uppercase mt-4 max-w-[22rem] mx-auto leading-relaxed"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              School taught you a lot.<br />He teaches you the rest.
            </p>
          </div>
        </ScrollSection>

        <div className="rule-double mb-6" />

        {/* PRIMARY CTA — big, centered, impossible to miss */}
        <ScrollSection delay={220}>
          <div className="max-w-md mx-auto w-full flex flex-col items-center gap-3">
            <p
              className="text-[0.58rem] tracking-[0.32em] uppercase mb-1"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              ✦ Start here ✦
            </p>
            <Link
              href="/quiz"
              className="group w-full flex flex-col items-center justify-center py-5 px-6 transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--type)",
                backgroundColor: "var(--ink)",
                color: "var(--paper)",
                boxShadow: "5px 5px 0 var(--rust)",
              }}
            >
              <span className="text-[0.85rem] tracking-[0.18em] uppercase font-bold flex items-center gap-2">
                Take the 60-second quiz
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span
                className="text-[0.58rem] tracking-[0.2em] uppercase mt-2 opacity-60"
              >
                Get a personalized prescription from Shaan&apos;s essays
              </span>
            </Link>

            <Link
              href="/oracle"
              className="mt-1 text-[0.62rem] tracking-[0.2em] uppercase underline underline-offset-[5px] decoration-[1px] transition-colors hover:text-[var(--rust)]"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              Or pull a random oracle card →
            </Link>
          </div>
        </ScrollSection>

        {/* Photo + quote — supporting evidence, below the CTA */}
        <ScrollSection delay={340}>
          <div className="flex items-center gap-5 max-w-md mx-auto w-full mt-10">
            <div className="shrink-0">
              <Image
                src="/shaan-avatar.png"
                alt="Shaan Puri"
                width={72}
                height={100}
                className="object-cover"
                style={{
                  filter: "sepia(0.12) contrast(1.08)",
                  boxShadow: "3px 3px 0 var(--ink-ghost)",
                }}
              />
            </div>
            <p
              className="text-sm italic leading-relaxed flex-1"
              style={{ fontFamily: "var(--display)", color: "var(--ink-mid)" }}
            >
              &ldquo;Real talk on life, money, and figuring out what you actually want.&rdquo;
            </p>
          </div>
        </ScrollSection>

        {/* Scroll hint */}
        <ScrollSection delay={420} className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-2" style={{ color: "var(--ink-faded)" }}>
            <span
              className="text-[0.55rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-current to-transparent opacity-60" />
          </div>
        </ScrollSection>
      </section>

      {/* ── RAMEN ERA — dark ── */}
      {heroQuote && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="rule-double mb-8" style={{ opacity: 0.3 }} />
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase mb-8"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              On your 20s
            </p>
            <blockquote
              className="font-bold italic leading-relaxed mb-8"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.45rem, 3.5vw, 2.2rem)",
              }}
            >
              &ldquo;{heroQuote.quote}&rdquo;
            </blockquote>
            <p className="text-base leading-loose mb-8" style={{ fontFamily: "var(--body)", color: "rgba(240,232,213,0.72)" }}>
              {heroQuote.full_excerpt}
            </p>
            <div className="rule-double" style={{ opacity: 0.3 }} />
          </ScrollSection>
        </section>
      )}

      {/* ── FIND YOUR THING ── */}
      {quote1 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="w-8 h-0.5 mb-8" style={{ backgroundColor: "var(--rust)" }} />
            <p
              className="text-[0.6rem] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              On finding your thing
            </p>
            <blockquote
              className="font-bold italic leading-relaxed mb-8"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote1.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" />
            <div className="flex items-center gap-3">
              <Image
                src="/shaan-avatar.png"
                alt=""
                width={26}
                height={26}
                className="rounded-full"
                style={{ filter: "sepia(0.2)", objectFit: "cover" }}
              />
              <span
                className="text-[0.62rem] tracking-wide"
                style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
              >
                {quote1.source_title} · {quote1.date}
              </span>
            </div>
          </ScrollSection>
        </section>
      )}

      {/* ── DECADE OF SUCK — dark ── */}
      {quote2 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto text-center">
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase mb-8"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              On playing the long game
            </p>
            <blockquote
              className="font-bold italic leading-relaxed mb-8"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote2.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" style={{ opacity: 0.3 }} />
            <p
              className="text-[0.62rem] tracking-wide"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              — {quote2.source_title}
            </p>
          </ScrollSection>
        </section>
      )}

      {/* ── ON WORK ── */}
      {quote3 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper-warm)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <p
              className="text-[0.6rem] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              On work
            </p>
            <blockquote
              className="font-bold italic leading-relaxed mb-8"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote3.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" />
            <div className="flex items-center gap-3">
              <Image
                src="/shaan-avatar.png"
                alt=""
                width={26}
                height={26}
                className="rounded-full"
                style={{ filter: "sepia(0.2)", objectFit: "cover" }}
              />
              <span
                className="text-[0.62rem] tracking-wide"
                style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
              >
                {quote3.source_title} · {quote3.date}
              </span>
            </div>
          </ScrollSection>
        </section>
      )}

      {/* ── GOOD ISN'T GREAT ── */}
      {quote4 && (
        <section
          className="min-h-[65vh] flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-xl mx-auto text-center">
            <div className="rule-double mb-8" />
            <blockquote
              className="font-bold italic leading-relaxed mb-6"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              }}
            >
              &ldquo;{quote4.quote}&rdquo;
            </blockquote>
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              Sound familiar?
            </p>
            <div className="rule-double mt-8" />
          </ScrollSection>
        </section>
      )}

      {/* ── FINAL CTA — dark ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
        style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
      >
        <ScrollSection className="max-w-md mx-auto w-full">
          <div className="rule-double mb-10" style={{ opacity: 0.3 }} />
          <Image
            src="/shaan-avatar.png"
            alt="Shaan Puri"
            width={78}
            height={109}
            className="mx-auto mb-8 object-cover"
            style={{
              filter: "sepia(0.15) contrast(1.08)",
              boxShadow: "3px 3px 0 var(--dark-card)",
            }}
          />
          <h2
            className="font-black italic leading-snug mb-6"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
            }}
          >
            Where are you<br />right now?
          </h2>
          <p
            className="text-base mb-10 leading-loose"
            style={{ fontFamily: "var(--body)", color: "rgba(240,232,213,0.72)" }}
          >
            Tell Uncle Shaan what&apos;s going on.<br />
            He&apos;ll point you to exactly what you need.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/quiz"
              className="w-full py-4 text-center text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--type)",
                backgroundColor: "var(--rust)",
                color: "var(--paper)",
              }}
            >
              Take the quiz — get your prescription
            </Link>
            <Link
              href="/oracle"
              className="w-full py-3.5 text-center text-[0.65rem] tracking-[0.2em] uppercase border transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"
              style={{
                fontFamily: "var(--type)",
                borderColor: "var(--ink-faded)",
                color: "var(--ink-faded)",
              }}
            >
              Just pull a card
            </Link>
            <div className="mt-2">
              <EmailCapture source="homepage" />
            </div>
          </div>
          <div className="rule-double mt-10" style={{ opacity: 0.3 }} />
        </ScrollSection>
      </section>

      <FloatingCTA />
    </main>
  );
}
