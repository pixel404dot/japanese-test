import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { ALL_GROUPS, HIRAGANA, KATAKANA } from "@/lib/kana";
import { mastery, avgTime } from "@/lib/progress";
import { isDue, isKnown } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";
import { VOCAB_INDEX } from "@/lib/vocab-index";
import { WORDS } from "@/lib/words";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

type Tab = "hiragana" | "katakana" | "words" | "vocab";

function colorFor(score: number | null) {
  if (score === null) return "bg-elevated text-subtle";
  if (score >= 80) return "bg-ok/20 text-ok";
  if (score >= 60) return "bg-accent/15 text-fg";
  if (score >= 40) return "bg-warn/20 text-warn";
  return "bg-bad/20 text-bad";
}

function ProgressGrid() {
  const stats = useKanaStore((s) => s.stats);
  const srs = useKanaStore((s) => s.vocabSrs);
  const [tab, setTab] = useState<Tab>("hiragana");
  const [hover, setHover] = useState<string | null>(null);

  const [vocabItems, setVocabItems] = useState<
    { key: string; label: string; sub: string; meaning: string; bn: string }[]
  >([]);
  const [vocabReady, setVocabReady] = useState(false);

  useEffect(() => {
    if (tab !== "vocab" || vocabReady) return;
    let cancelled = false;
    void import("@/lib/vocab").then((mod) => {
      if (cancelled) return;
      setVocabItems(
        mod.VOCAB_LESSONS.flatMap((lesson) =>
          lesson.words.map((word) => ({
            key: word.jp,
            label: word.jp,
            sub: word.romaji[0] ?? "",
            meaning: word.meaning,
            bn: word.bn,
          })),
        ),
      );
      setVocabReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [tab, vocabReady]);

  const items = useMemo(() => {
    if (tab === "vocab") return vocabItems;
    if (tab === "words") {
      return WORDS.map((w) => ({
        key: w.k,
        label: w.k,
        sub: w.r[0] ?? "",
        meaning: w.m,
        bn: "",
      }));
    }
    const groups = tab === "hiragana" ? HIRAGANA : KATAKANA;
    return groups.flatMap((g) =>
      g.chars.map((c) => ({
        key: c.k,
        label: c.k,
        sub: c.r[0] ?? "",
        meaning: "",
        bn: "",
      })),
    );
  }, [tab, vocabItems]);

  const selected = hover ? stats[hover] : undefined;
  const selectedWord = hover
    ? vocabItems.find((v) => v.key === hover)
    : undefined;

  return (
    <div>
      <div className="seg mb-5">
        {(["hiragana", "katakana", "words", "vocab"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              setHover(null);
            }}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm capitalize",
              tab === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
            )}
          >
            {id}
          </button>
        ))}
      </div>
      <div
        className={cn(
          "grid gap-1.5",
          tab === "words" || tab === "vocab"
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-5 sm:grid-cols-10",
        )}
      >
        {tab === "vocab" && !vocabReady ? (
          <p className="col-span-full text-sm text-muted">Loading vocabulary…</p>
        ) : null}
        {items.map((item, i) => {
          const score =
            tab === "vocab"
              ? srs[item.key]
                ? isDue(srs[item.key])
                  ? 30
                  : isKnown(srs[item.key])
                    ? Math.max(55, (srs[item.key]!.level / 6) * 100)
                    : 20
                : null
              : mastery(stats[item.key]);
          return (
            <button
              key={`${tab}-${item.key}-${item.sub}-${i}`}
              type="button"
              onMouseEnter={() => setHover(item.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(item.key)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center rounded-sm px-1 py-2",
                colorFor(score),
              )}
            >
              <span
                className={cn(
                  "font-kana leading-none",
                  tab === "words" || tab === "vocab" || item.label.length > 1
                    ? "text-lg"
                    : "text-xl",
                )}
              >
                {item.label}
              </span>
              <span className="mt-1 text-[10px] opacity-70">{item.sub}</span>
            </button>
          );
        })}
      </div>
      <div className="panel mt-6 min-h-24 p-4 text-sm">
        {hover && tab === "vocab" ? (
          <div className="space-y-1">
            <p className="font-kana text-2xl">{hover}</p>
            {selectedWord ? (
              <>
                <p className="text-muted">{selectedWord.meaning}</p>
                <p className="font-bn text-subtle">{selectedWord.bn}</p>
              </>
            ) : null}
            <p className="text-subtle">
              {srs[hover]
                ? `SRS ${srs[hover]!.level} · ${isDue(srs[hover]) ? "due now" : "scheduled"}`
                : "Not drilled yet"}
              {selected
                ? ` · ${selected.right} correct · ${selected.wrong} wrong`
                : ""}
            </p>
          </div>
        ) : hover && selected ? (
          <div className="space-y-1">
            <p className="font-kana text-2xl">{hover}</p>
            <p className="text-muted">
              Mastery {mastery(selected)}% · {selected.right} correct ·{" "}
              {selected.wrong} wrong
            </p>
            <p className="text-subtle">
              Avg {avgTime(selected)?.toFixed(2) ?? "—"}s · shown {selected.shown}{" "}
              · hints {selected.help}
            </p>
          </div>
        ) : hover ? (
          <p className="text-muted">No practice data for this one yet.</p>
        ) : (
          <p className="text-subtle">Select a character to see its stats.</p>
        )}
      </div>
    </div>
  );
}

function ProgressPage() {
  const stats = useKanaStore((s) => s.stats);
  const srs = useKanaStore((s) => s.vocabSrs);
  const practiced = Object.keys(stats).length;
  const kanaKeys = ALL_GROUPS.flatMap((g) => g.chars.map((c) => c.k));
  const mastered = kanaKeys.filter((k) => {
    const m = mastery(stats[k]);
    return m !== null && m >= 80;
  }).length;
  const vocabKeys = VOCAB_INDEX.flatMap((lesson) => lesson.keys);
  const vocabTotal = vocabKeys.length;
  const vocabKnown = vocabKeys.filter((key) => isKnown(srs[key])).length;

  return (
    <main className="page">
      <div className="mb-8">
        <p className="kicker">Mastery</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Progress
        </h1>
        <p className="mt-3 text-sm text-muted">
          {practiced} practiced · {mastered} of {kanaKeys.length} kana at 80%+
          · {vocabKnown} / {vocabTotal} vocab known
        </p>
      </div>
      <ProgressGrid />
    </main>
  );
}
