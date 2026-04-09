"use client";

type Option = { label: string; value: string };

type Props = {
  question: string;
  options?: Option[];
  type?: "choice" | "scale" | "text";
  multi?: boolean;
  value: string | string[];
  onChange: (val: string | string[]) => void;
  questionNumber: number;
  total: number;
};

export default function QuizCard({
  question,
  options,
  type = "choice",
  multi = false,
  value,
  onChange,
  questionNumber,
  total,
}: Props) {
  const selectedSet = new Set(Array.isArray(value) ? value : value ? [value] : []);

  function handleChoiceClick(optValue: string) {
    if (multi) {
      const next = new Set(selectedSet);
      if (next.has(optValue)) next.delete(optValue);
      else next.add(optValue);
      onChange(Array.from(next));
    } else {
      onChange(optValue);
    }
  }
  return (
    <div className="flex flex-col gap-7">

      {/* Question number marker */}
      <div className="flex items-center gap-3">
        <div className="rule flex-1" />
        <span
          className="text-[0.6rem] tracking-[0.25em] text-[var(--ink-faded)] uppercase"
          style={{ fontFamily: "var(--type)" }}
        >
          Q.{questionNumber}&thinsp;/&thinsp;{total}
        </span>
        <div className="rule flex-1" />
      </div>

      {/* Question */}
      <h2
        className="text-[1.85rem] font-bold italic leading-tight text-[var(--ink)]"
        style={{ fontFamily: "var(--display)" }}
      >
        {question}
      </h2>

      {/* Choice options — styled as printed form checkboxes */}
      {type === "choice" && options && (
        <div className="flex flex-col gap-2.5">
          {multi && (
            <p
              className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ink-faded)] mb-1"
              style={{ fontFamily: "var(--type)" }}
            >
              Select all that apply
            </p>
          )}
          {options.map((opt) => {
            const selected = selectedSet.has(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => handleChoiceClick(opt.value)}
                className={`text-left px-5 py-4 border transition-all duration-150 flex items-center gap-3 ${
                  selected
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--ink-ghost)] bg-transparent text-[var(--ink)] hover:border-[var(--ink-faded)]"
                }`}
              >
                {multi && (
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 border flex-shrink-0 ${
                      selected
                        ? "border-[var(--paper)] bg-[var(--paper)] text-[var(--ink)]"
                        : "border-[var(--ink-ghost)]"
                    }`}
                    style={{ fontFamily: "var(--type)", fontSize: "0.7rem", lineHeight: 1 }}
                  >
                    {selected ? "×" : ""}
                  </span>
                )}
                <span
                  className="text-sm tracking-wide"
                  style={{ fontFamily: "var(--type)" }}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Scale — looks like a printed Likert */}
      {type === "scale" && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => onChange(String(n))}
                className={`flex-1 aspect-square border flex items-center justify-center transition-all duration-150 ${
                  (typeof value === "string" ? value : "") === String(n)
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--ink-ghost)] text-[var(--ink)] hover:border-[var(--ink-faded)]"
                }`}
              >
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--display)" }}
                >
                  {n}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-between px-0.5">
            <span
              className="text-[0.6rem] text-[var(--ink-faded)] tracking-wide"
              style={{ fontFamily: "var(--type)" }}
            >
              Play it safe
            </span>
            <span
              className="text-[0.6rem] text-[var(--ink-faded)] tracking-wide"
              style={{ fontFamily: "var(--type)" }}
            >
              All in
            </span>
          </div>
        </div>
      )}

      {/* Text — looks like writing on a form */}
      {type === "text" && (
        <div>
          <textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write here..."
            rows={3}
            className="w-full bg-transparent border-b-2 border-[var(--ink-ghost)] focus:border-[var(--ink)] outline-none resize-none text-base text-[var(--ink)] py-3 transition-colors placeholder:text-[var(--ink-ghost)]"
            style={{ fontFamily: "var(--type)" }}
          />
        </div>
      )}
    </div>
  );
}
