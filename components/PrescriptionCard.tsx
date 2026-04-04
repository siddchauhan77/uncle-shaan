import type { ContentEntry } from "@/lib/content";
import Image from "next/image";

type Props = {
  entry: ContentEntry;
  reason: string;
  index: number;
};

export default function PrescriptionCard({ entry, reason, index }: Props) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-7 h-7 rounded-full bg-[#F5A623] text-white text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div>
          <div className="text-xs font-medium tracking-widest text-[#6B6B6B] uppercase mb-1">
            {entry.source_title}
          </div>
          <p className="text-sm font-medium text-[#6B6B6B] italic">{reason}</p>
        </div>
      </div>

      <blockquote className="text-base font-semibold text-[#111111] leading-snug border-l-2 border-[#F5A623] pl-4">
        &ldquo;{entry.quote}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/shaan-avatar.svg"
            alt="Uncle Shaan"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-xs text-[#6B6B6B]">{entry.date}</span>
        </div>
        <a
          href={entry.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#F5A623] hover:underline"
        >
          Read it →
        </a>
      </div>
    </div>
  );
}
