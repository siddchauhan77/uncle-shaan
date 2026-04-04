"use client";

type Option = { label: string; value: string };

type Props = {
  question: string;
  options?: Option[];
  type?: "choice" | "scale" | "text";
  value: string;
  onChange: (val: string) => void;
  questionNumber: number;
  total: number;
};

export default function QuizCard({
  question,
  options,
  type = "choice",
  value,
  onChange,
  questionNumber,
  total,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F5A623] rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / total) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#6B6B6B] font-medium shrink-0">
          {questionNumber}/{total}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold leading-snug text-[#111111]">{question}</h2>

      {/* Options */}
      {type === "choice" && options && (
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm font-medium transition-all active:scale-95 ${
                value === opt.value
                  ? "border-[#F5A623] bg-[#FFF8EC] text-[#111111]"
                  : "border-gray-200 bg-white text-[#111111] hover:border-[#F5A623]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {type === "scale" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-xs text-[#6B6B6B]">
            <span>Play it safe</span>
            <span>All in</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => onChange(String(n))}
                className={`flex-1 h-12 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${
                  value === String(n)
                    ? "border-[#F5A623] bg-[#F5A623] text-white"
                    : "border-gray-200 bg-white text-[#111111] hover:border-[#F5A623]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {type === "text" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Be honest..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#F5A623] resize-none bg-white"
        />
      )}
    </div>
  );
}
