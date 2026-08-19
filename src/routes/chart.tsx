import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Volume2 } from "lucide-react";
import {
  ROWS,
  ROW_GROUPS,
  type Script,
  scriptJa,
  scriptLabel,
} from "@/lib/kana";
import { cn, speakJa } from "@/lib/utils";

export const Route = createFileRoute("/chart")({ component: ChartPage });

function ChartPage() {
  const [script, setScript] = useState<Script>("hiragana");
  const [active, setActive] = useState<string | null>(null);

  const groups = useMemo(
    () =>
      ROW_GROUPS.map((group) => ({
        ...group,
        rows: ROWS.filter((row) => row.group === group.id),
      })),
    [],
  );

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Reference
          </p>
          <h1 className="text-4xl">Gojūon chart</h1>
          <p className="max-w-xl text-muted">
            Tap any character to hear it. Use the drill to practice a line — or
            mix hiragana and katakana from the first five.
          </p>
        </div>
        <div className="flex rounded-full bg-surface p-1 shadow-border">
          {(["hiragana", "katakana"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setScript(id)}
              className={cn(
                "h-10 rounded-full px-4 text-sm transition-colors",
                script === id ? "bg-ink text-bg" : "text-muted hover:text-ink",
              )}
            >
              {scriptJa(id)}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.id} className="space-y-3">
            <div>
              <h2 className="text-lg">{group.label}</h2>
              <p className="text-sm text-muted">{group.note}</p>
            </div>
            <div className="space-y-2">
              {group.rows.map((row) => {
                const kana =
                  script === "hiragana"
                    ? splitKana(row.preview.hiragana, row.group === "yoon")
                    : splitKana(row.preview.katakana, row.group === "yoon");
                const readings = splitReadings(row.id);
                return (
                  <div
                    key={row.id}
                    className="grid grid-cols-[4.5rem_1fr] items-stretch gap-2 sm:grid-cols-[6rem_1fr]"
                  >
                    <div className="flex items-center rounded-lg bg-ink/5 px-2">
                      <p className="text-xs font-medium tracking-wide text-muted uppercase">
                        {row.label}
                      </p>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {kana.map((char, i) => (
                        <button
                          key={`${row.id}-${char}-${i}`}
                          type="button"
                          onClick={() => {
                            setActive(char);
                            speakJa(char);
                          }}
                          className={cn(
                            "flex min-h-16 flex-col items-center justify-center rounded-lg bg-surface shadow-border transition-[box-shadow,transform] duration-150",
                            "hover:shadow-border-hover",
                            active === char && "ring-2 ring-primary/60",
                          )}
                        >
                          <span className="font-serif text-2xl sm:text-3xl">
                            {char}
                          </span>
                          <span className="text-[11px] text-muted">
                            {readings[i]}
                          </span>
                        </button>
                      ))}
                      {kana.length < 5 &&
                        Array.from({ length: 5 - kana.length }).map((_, i) => (
                          <div key={`pad-${row.id}-${i}`} />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 flex items-center gap-2 text-sm text-muted">
        <Volume2 className="size-4" />
        Hearing uses your device voice for {scriptLabel(script)}.
      </p>
    </main>
  );
}

function splitKana(preview: string, yoon: boolean): string[] {
  if (!yoon) return Array.from(preview);
  const chars = Array.from(preview);
  const out: string[] = [];
  for (let i = 0; i < chars.length; i += 2) {
    out.push(`${chars[i] ?? ""}${chars[i + 1] ?? ""}`);
  }
  return out.filter(Boolean);
}

const READINGS: Record<string, string[]> = {
  a: ["a", "i", "u", "e", "o"],
  ka: ["ka", "ki", "ku", "ke", "ko"],
  sa: ["sa", "shi", "su", "se", "so"],
  ta: ["ta", "chi", "tsu", "te", "to"],
  na: ["na", "ni", "nu", "ne", "no"],
  ha: ["ha", "hi", "fu", "he", "ho"],
  ma: ["ma", "mi", "mu", "me", "mo"],
  ya: ["ya", "yu", "yo"],
  ra: ["ra", "ri", "ru", "re", "ro"],
  wa: ["wa", "wo", "n"],
  ga: ["ga", "gi", "gu", "ge", "go"],
  za: ["za", "ji", "zu", "ze", "zo"],
  da: ["da", "ji", "zu", "de", "do"],
  ba: ["ba", "bi", "bu", "be", "bo"],
  pa: ["pa", "pi", "pu", "pe", "po"],
  kya: ["kya", "kyu", "kyo"],
  sha: ["sha", "shu", "sho"],
  cha: ["cha", "chu", "cho"],
  nya: ["nya", "nyu", "nyo"],
  hya: ["hya", "hyu", "hyo"],
  mya: ["mya", "myu", "myo"],
  rya: ["rya", "ryu", "ryo"],
  gya: ["gya", "gyu", "gyo"],
  ja: ["ja", "ju", "jo"],
  bya: ["bya", "byu", "byo"],
  pya: ["pya", "pyu", "pyo"],
};

function splitReadings(id: string): string[] {
  return READINGS[id] ?? [];
}
