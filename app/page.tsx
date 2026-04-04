import Image from "next/image";
import Link from "next/link";
import ScrollSection from "@/components/ScrollSection";
import { getScrollytellingCards } from "@/lib/content";

export default function Home() {
  const cards = getScrollytellingCards();

  const heroQuote = cards.find((c) => c.id === "someday-3");
  const quote1 = cards.find((c) => c.id === "finding-thing-2");
  const quote2 = cards.find((c) => c.id === "3step-1");
  const quote3 = cards.find((c) => c.id === "stop-working-1");
  const quote4 = cards.find((c) => c.id === "good-not-great-1");

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "#F5A623", filter: "blur(120px)" }}
        />
        <ScrollSection delay={0}>
          <Image src="/shaan-avatar.png" alt="Uncle Shaan" width={88} height={88} className="mx-auto mb-6" />
        </ScrollSection>
        <ScrollSection delay={100}>
          <p className="text-sm font-medium tracking-widest text-[#6B6B6B] uppercase mb-4">Uncle Shaan</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#111111] mb-6">
            Your cool uncle<br />
            <span style={{ color: "#F5A623" }}>is waiting.</span>
          </h1>
        </ScrollSection>
        <ScrollSection delay={200}>
          <p className="text-lg text-[#6B6B6B] max-w-md mx-auto mb-10 leading-relaxed">
            School taught you a lot. Uncle Shaan teaches you the rest.
            Real talk on life, money, and figuring out what the hell you actually want.
          </p>
        </ScrollSection>
        <ScrollSection delay={300}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz" className="px-8 py-4 bg-[#F5A623] text-[#111111] font-bold rounded-xl text-base active:scale-95 transition-transform hover:bg-amber-400">
              Take the quiz
            </Link>
            <Link href="/oracle" className="px-8 py-4 bg-white border-2 border-[#111111] text-[#111111] font-bold rounded-xl text-base active:scale-95 transition-transform hover:bg-gray-50">
              Pull a card
            </Link>
          </div>
        </ScrollSection>
        <ScrollSection delay={500} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-[#6B6B6B]">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#6B6B6B] to-transparent" />
          </div>
        </ScrollSection>
      </section>

      {/* RAMEN ERA */}
      {heroQuote && (
        <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#111111]">
          <ScrollSection className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium tracking-widest text-[#F5A623] uppercase mb-8">If you&apos;re 20–27</p>
            <blockquote className="text-3xl md:text-4xl font-bold leading-snug text-white mb-8">
              &ldquo;{heroQuote.quote}&rdquo;
            </blockquote>
            <p className="text-[#6B6B6B] text-base leading-relaxed">{heroQuote.full_excerpt}</p>
          </ScrollSection>
        </section>
      )}

      {/* FIND YOUR THING */}
      {quote1 && (
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="w-12 h-1 bg-[#F5A623] mb-8" />
            <blockquote className="text-3xl md:text-4xl font-bold leading-snug text-[#111111] mb-8">
              &ldquo;{quote1.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <Image src="/shaan-avatar.png" alt="" width={32} height={32} />
              <span className="text-sm text-[#6B6B6B]">{quote1.source_title} · {quote1.date}</span>
            </div>
          </ScrollSection>
        </section>
      )}

      {/* DECADE OF SUCK */}
      {quote2 && (
        <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#111111]">
          <ScrollSection className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium tracking-widest text-[#F5A623] uppercase mb-8">On playing the long game</p>
            <blockquote className="text-3xl md:text-4xl font-bold leading-snug text-white mb-8">
              &ldquo;{quote2.quote}&rdquo;
            </blockquote>
            <p className="text-[#6B6B6B] text-sm">— {quote2.source_title}</p>
          </ScrollSection>
        </section>
      )}

      {/* PRODUCT THAT IS YOU */}
      {quote3 && (
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="w-12 h-1 bg-[#F5A623] mb-8" />
            <p className="text-sm font-medium tracking-widest text-[#6B6B6B] uppercase mb-6">On work</p>
            <blockquote className="text-3xl md:text-4xl font-bold leading-snug text-[#111111] mb-8">
              &ldquo;{quote3.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <Image src="/shaan-avatar.png" alt="" width={32} height={32} />
              <span className="text-sm text-[#6B6B6B]">{quote3.source_title} · {quote3.date}</span>
            </div>
          </ScrollSection>
        </section>
      )}

      {/* GOOD ISN'T GREAT */}
      {quote4 && (
        <section className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-[#FFF8EC]">
          <ScrollSection className="max-w-xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-bold leading-snug text-[#111111] mb-6">
              &ldquo;{quote4.quote}&rdquo;
            </blockquote>
            <p className="text-[#6B6B6B] text-sm">Sound familiar?</p>
          </ScrollSection>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        <ScrollSection className="max-w-lg mx-auto">
          <Image src="/shaan-avatar.png" alt="Uncle Shaan" width={72} height={72} className="mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            Where are you<br />right now?
          </h2>
          <p className="text-[#6B6B6B] mb-10 leading-relaxed">
            Tell Uncle Shaan what&apos;s going on. He&apos;ll point you to exactly what you need to read.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/quiz" className="px-8 py-4 bg-[#F5A623] text-[#111111] font-bold rounded-xl text-base active:scale-95 transition-transform hover:bg-amber-400">
              Take the quiz — get your prescription
            </Link>
            <Link href="/oracle" className="px-8 py-4 bg-white border-2 border-[#111111] text-[#111111] font-bold rounded-xl text-base active:scale-95 transition-transform">
              Just pull a card
            </Link>
          </div>
        </ScrollSection>
      </section>
    </main>
  );
}
