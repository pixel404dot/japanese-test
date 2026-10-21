import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { DeckCard, DeckKind } from "@/lib/decks";

export type CardDraft = {
  kind: DeckKind;
  front: string;
  reading: string;
  romaji: string;
  meaning: string;
  bn: string;
  note: string;
};

const empty = (kind: DeckKind): CardDraft => ({
  kind,
  front: "",
  reading: "",
  romaji: "",
  meaning: "",
  bn: "",
  note: "",
});

export function CardEditor({
  kind,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  kind: DeckKind;
  initial?: Partial<DeckCard>;
  submitLabel: string;
  onSubmit: (draft: CardDraft) => void;
  onCancel?: () => void;
}) {
  const [draft, setDraft] = useState<CardDraft>(() => ({
    ...empty(kind),
    ...initial,
    kind: initial?.kind ?? kind,
  }));

  function set<K extends keyof CardDraft>(key: K, value: CardDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.front.trim()) return;
    onSubmit(draft);
    if (!initial) setDraft(empty(kind));
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-1">
        {(["lesson", "kanji"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => set("kind", k)}
            className={cn(
              "h-9 rounded-full px-3 text-sm capitalize",
              draft.kind === k
                ? "bg-accent text-accent-fg"
                : "bg-elevated text-muted shadow-[var(--shadow-border)]",
            )}
          >
            {k === "lesson" ? "Word" : "Kanji"}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="kicker">Japanese</span>
        <input
          value={draft.front}
          onChange={(e) => set("front", e.target.value)}
          className="field mt-2 font-kana text-xl"
          placeholder={draft.kind === "kanji" ? "日" : "おはようございます"}
          required
          autoComplete="off"
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="kicker">Reading</span>
          <input
            value={draft.reading}
            onChange={(e) => set("reading", e.target.value)}
            className="field mt-2 font-kana"
            placeholder="ひ"
            autoComplete="off"
          />
        </label>
        <label className="block">
          <span className="kicker">Romaji</span>
          <input
            value={draft.romaji}
            onChange={(e) => set("romaji", e.target.value)}
            className="field mt-2"
            placeholder="hi"
            autoComplete="off"
          />
        </label>
      </div>
      <label className="block">
        <span className="kicker">English</span>
        <input
          value={draft.meaning}
          onChange={(e) => set("meaning", e.target.value)}
          className="field mt-2"
          placeholder="sun"
          autoComplete="off"
        />
      </label>
      <label className="block">
        <span className="kicker">বাংলা</span>
        <input
          value={draft.bn}
          onChange={(e) => set("bn", e.target.value)}
          className="field mt-2 font-bn"
          placeholder="সূর্য"
          autoComplete="off"
        />
      </label>
      <label className="block">
        <span className="kicker">Note</span>
        <input
          value={draft.note}
          onChange={(e) => set("note", e.target.value)}
          className="field mt-2"
          placeholder="Optional"
          autoComplete="off"
        />
      </label>
      <div className="flex gap-2 pt-1">
        <Button type="submit" className="rounded-full">
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" className="rounded-full" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
