import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { cardSrsKey, cardsForDeck } from "@/lib/decks";
import { isDueOrNew, type Rating } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";

type StudySearch = { all?: boolean };

export const Route = createFileRoute("/cards/$deckId_/study")({
  validateSearch: (search: Record<string, unknown>): StudySearch => ({
    all: search.all === true || search.all === "true",
  }),
  component: StudyPage,
});

const RATINGS: { id: Rating; label: string; hint: string }[] = [
  { id: "again", label: "Again", hint: "1" },
  { id: "hard", label: "Hard", hint: "2" },
  { id: "good", label: "Good", hint: "3" },
  { id: "easy", label: "Easy", hint: "4" },
];

function StudyPage() {
  const { deckId } = Route.useParams();
  const { all } = Route.useSearch();
  const hydrated = useKanaStore((s) => s.hydrated);
  const deck = useKanaStore((s) => s.decks.find((d) => d.id === deckId));
  const storeCards = useKanaStore((s) => s.cards);
  const allCards = useMemo(
    () => cardsForDeck(storeCards, deckId),
    [storeCards, deckId],
  );
  const applyRating = useKanaStore((s) => s.applyRating);
  const cardIds = allCards.map((c) => c.id).join(",");

  const [queue, setQueue] = useState<typeof allCards>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const snap = useKanaStore.getState().vocabSrs;
    const list = all
      ? allCards
      : allCards.filter((c) => isDueOrNew(snap[cardSrsKey(c.id)]));
    setQueue([...list].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
    setDone(0);
    setReady(true);
  }, [all, deckId, cardIds, allCards]);

  const card = queue[index];
  const remaining = Math.max(0, queue.length - index);

  const rate = useCallback(
    (rating: Rating) => {
      if (!card) return;
      applyRating(cardSrsKey(card.id), rating);
      setFlipped(false);
      setDone((n) => n + 1);
      if (rating === "again") {
        setQueue((q) => [...q, card]);
      }
      setIndex((i) => i + 1);
    },
    [applyRating, card],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!flipped && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setFlipped(true);
        return;
      }
      if (!flipped) return;
      const map: Record<string, Rating> = {
        "1": "again",
        "2": "hard",
        "3": "good",
        "4": "easy",
      };
      const r = map[e.key];
      if (r) {
        e.preventDefault();
        rate(r);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, rate]);

  if (!deck) {
    return (
      <main className="page">
        <p className="text-sm text-muted">
          {hydrated ? "That deck is gone." : "Loading…"}
        </p>
        {hydrated ? (
          <Link to="/cards" className="mt-4 inline-block text-sm">
            Back to cards
          </Link>
        ) : null}
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="page">
        <p className="kicker">{deck.title}</p>
        <p className="mt-4 text-sm text-muted">Preparing cards…</p>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="page">
        <p className="kicker">{deck.title}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Caught up.</h1>
        <p className="mt-3 text-muted">
          {done > 0
            ? `${done} card${done === 1 ? "" : "s"} reviewed.`
            : "Nothing is due. Add cards, or study all."}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild className="rounded-full">
            <Link to="/cards/$deckId" params={{ deckId: deck.id }}>
              Back to deck
            </Link>
          </Button>
          {allCards.length > 0 ? (
            <Button asChild variant="secondary" className="rounded-full">
              <Link
                to="/cards/$deckId/study"
                params={{ deckId: deck.id }}
                search={{ all: true }}
              >
                Study all
              </Link>
            </Button>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="flex items-baseline justify-between gap-3">
        <p className="kicker">{deck.title}</p>
        <p className="text-sm tabular-nums text-muted">{remaining} left</p>
      </div>

      <div className="panel mt-8 px-5 py-12 text-center">
        <p
          className={cn(
            "font-kana leading-none",
            card.kind === "kanji" ? "text-7xl" : "text-4xl sm:text-5xl",
          )}
        >
          {card.front}
        </p>
        {flipped ? (
          <div className="mt-8 space-y-1">
            {card.reading || card.romaji ? (
              <p className="font-kana text-lg text-fg">
                {card.reading}
                {card.romaji ? (
                  <span className="text-muted"> · {card.romaji}</span>
                ) : null}
              </p>
            ) : null}
            {card.meaning ? (
              <p className="text-lg text-fg">{card.meaning}</p>
            ) : null}
            {card.bn ? (
              <p className="font-bn text-muted">{card.bn}</p>
            ) : null}
            {card.note ? (
              <p className="text-sm text-subtle">{card.note}</p>
            ) : null}
            <div className="flex justify-center pt-3">
              <SpeakButton text={card.reading || card.front} />
            </div>
          </div>
        ) : (
          <p className="mt-10 text-sm text-subtle">Space or Show answer</p>
        )}
      </div>

      {!flipped ? (
        <button
          type="button"
          className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-accent text-accent-fg"
          onClick={() => setFlipped(true)}
        >
          Show answer
        </button>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-2">
          {RATINGS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => rate(r.id)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center rounded-2xl text-sm",
                r.id === "good" || r.id === "easy"
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-fg shadow-[var(--shadow-border)]",
              )}
            >
              {r.label}
              <span
                className={cn(
                  "mt-0.5 text-xs",
                  r.id === "good" || r.id === "easy"
                    ? "text-accent-fg/70"
                    : "text-subtle",
                )}
              >
                {r.hint}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/cards/$deckId"
          params={{ deckId: deck.id }}
          className="text-sm text-muted no-underline hover:text-fg"
        >
          End session
        </Link>
      </div>
    </main>
  );
}
