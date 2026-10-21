import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { cardSrsKey, cardsForDeck, type DeckKind } from "@/lib/decks";
import { isDueOrNew, isKnown } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/cards/")({
  component: CardsIndex,
});

function CardsIndex() {
  const navigate = useNavigate();
  const decks = useKanaStore((s) => s.decks);
  const cards = useKanaStore((s) => s.cards);
  const srs = useKanaStore((s) => s.vocabSrs);
  const addDeck = useKanaStore((s) => s.addDeck);
  const hydrated = useKanaStore((s) => s.hydrated);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [titleJa, setTitleJa] = useState("");
  const [kind, setKind] = useState<DeckKind>("lesson");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !hydrated) return;
    const deck = addDeck({ title, titleJa, kind });
    setTitle("");
    setTitleJa("");
    setOpen(false);
    void navigate({ to: "/cards/$deckId", params: { deckId: deck.id } });
  }

  return (
    <main className="page">
      <PageHeader
        backTo="/"
        backLabel="Studio"
        glyph="札"
        title="Cards"
        description="Your own lessons and kanji. Add cards by hand, then review them like Anki."
      />

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {decks.length === 0
            ? "No decks yet"
            : `${decks.length} deck${decks.length === 1 ? "" : "s"}`}
        </p>
        <Button
          type="button"
          size="sm"
          className="rounded-full"
          onClick={() => setOpen((v) => !v)}
        >
          <Plus className="size-4" />
          New deck
        </Button>
      </div>

      {open ? (
        <form onSubmit={submit} className="panel mb-6 space-y-3 p-4">
          <p className="kicker">New deck</p>
          <div className="flex gap-1">
            {(["lesson", "kanji"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn(
                  "h-9 rounded-full px-3 text-sm",
                  kind === k
                    ? "bg-accent text-accent-fg"
                    : "bg-elevated text-muted shadow-[var(--shadow-border)]",
                )}
              >
                {k === "lesson" ? "Lesson" : "Kanji"}
              </button>
            ))}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field"
            placeholder={kind === "kanji" ? "Lesson 11 kanji" : "Lesson 11 words"}
            required
            autoFocus
          />
          <input
            value={titleJa}
            onChange={(e) => setTitleJa(e.target.value)}
            className="field font-kana"
            placeholder="だい11か"
          />
          <Button type="submit" className="rounded-full" disabled={!hydrated || !title.trim()}>
            Create
          </Button>
        </form>
      ) : null}

      {decks.length === 0 && !open ? (
        <div className="panel px-5 py-10 text-center">
          <p className="font-display text-5xl leading-none">札</p>
          <p className="mt-4 text-sm text-muted">
            {hydrated
              ? "Make a lesson deck or a kanji deck, then add cards from your notebook."
              : "Loading your decks…"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          {decks.map((deck) => {
            const list = cardsForDeck(cards, deck.id);
            const keys = list.map((c) => cardSrsKey(c.id));
            const due = keys.filter((k) => isDueOrNew(srs[k])).length;
            const known = keys.filter((k) => isKnown(srs[k])).length;
            return (
              <Link
                key={deck.id}
                to="/cards/$deckId"
                params={{ deckId: deck.id }}
                className="flex items-center gap-4 px-4 py-5 no-underline transition-colors duration-150 hover:bg-elevated sm:px-5"
              >
                <span className="w-8 shrink-0 font-display text-lg text-subtle">
                  {deck.kind === "kanji" ? "漢" : "語"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-fg">{deck.title}</p>
                  {deck.titleJa ? (
                    <p className="mt-0.5 font-kana text-sm text-muted">
                      {deck.titleJa}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm text-muted">
                    {list.length} card{list.length === 1 ? "" : "s"}
                    {known > 0 ? ` · ${known} known` : ""}
                    {due > 0 ? ` · ${due} due` : ""}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-subtle" />
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
