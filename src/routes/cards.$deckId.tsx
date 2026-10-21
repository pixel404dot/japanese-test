import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CardEditor } from "@/components/card-editor";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { cardSrsKey, cardsForDeck } from "@/lib/decks";
import { isDueOrNew } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/cards/$deckId")({
  component: DeckPage,
});

function DeckPage() {
  const { deckId } = Route.useParams();
  const navigate = useNavigate();
  const hydrated = useKanaStore((s) => s.hydrated);
  const deck = useKanaStore((s) => s.decks.find((d) => d.id === deckId));
  const allCards = useKanaStore((s) => s.cards);
  const cards = useMemo(() => cardsForDeck(allCards, deckId), [allCards, deckId]);
  const srs = useKanaStore((s) => s.vocabSrs);
  const addCard = useKanaStore((s) => s.addCard);
  const updateCard = useKanaStore((s) => s.updateCard);
  const deleteCard = useKanaStore((s) => s.deleteCard);
  const updateDeck = useKanaStore((s) => s.updateDeck);
  const deleteDeck = useKanaStore((s) => s.deleteDeck);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const openedEmpty = useRef(false);

  useEffect(() => {
    if (!hydrated || openedEmpty.current) return;
    openedEmpty.current = true;
    if (cards.length === 0) setAdding(true);
  }, [hydrated, cards.length]);

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

  const due = cards.filter((c) => isDueOrNew(srs[cardSrsKey(c.id)])).length;
  const showComposer = adding && editing === null;

  return (
    <main className="page">
      <Link to="/cards" className="back-link">
        <ArrowLeft className="size-3.5" />
        Cards
      </Link>
      <p className="kicker mt-5">{deck.kind === "kanji" ? "Kanji deck" : "Lesson deck"}</p>

      {renaming ? (
        <form
          className="mt-3 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateDeck(deck.id, { title });
            setRenaming(false);
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field"
            autoFocus
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="rounded-full">
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => setRenaming(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
              {deck.title}
            </h1>
            {deck.titleJa ? (
              <p className="mt-1 font-kana text-lg text-muted">{deck.titleJa}</p>
            ) : null}
            <p className="mt-2 text-sm text-muted">
              {cards.length} card{cards.length === 1 ? "" : "s"}
              {due > 0 ? ` · ${due} due` : ""}
            </p>
          </div>
          <button
            type="button"
            aria-label="Rename deck"
            className="grid size-11 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
            onClick={() => {
              setTitle(deck.title);
              setRenaming(true);
            }}
          >
            <Pencil className="size-4" />
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {due > 0 ? (
          <Button asChild className="rounded-full">
            <Link
              to="/cards/$deckId/study"
              params={{ deckId: deck.id }}
              search={{ all: false }}
            >
              Review {due}
            </Link>
          </Button>
        ) : (
          <Button disabled className="rounded-full">
            Review
          </Button>
        )}
        {cards.length > 0 ? (
          <Button asChild variant="secondary" className="rounded-full">
            <Link
              to="/cards/$deckId/study"
              params={{ deckId: deck.id }}
              search={{ all: true }}
            >
              Study all
            </Link>
          </Button>
        ) : (
          <Button disabled variant="secondary" className="rounded-full">
            Study all
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          className="rounded-full"
          onClick={() => {
            setAdding((v) => !v);
            setEditing(null);
          }}
        >
          <Plus className="size-4" />
          Add card
        </Button>
      </div>

      {showComposer ? (
        <div className="panel mt-6 p-4">
          <p className="kicker mb-3">New card</p>
          <CardEditor
            kind={deck.kind}
            submitLabel="Add card"
            onCancel={() => setAdding(false)}
            onSubmit={(draft) => {
              if (!draft.front.trim()) return;
              addCard({ ...draft, deckId: deck.id });
            }}
          />
        </div>
      ) : null}

      <ul className="mt-8 space-y-2">
        {cards.length === 0 && !showComposer ? (
          <li className="panel px-5 py-8 text-center text-sm text-muted">
            Add a word or kanji from your textbook.
          </li>
        ) : null}
        {cards.map((card) =>
          editing === card.id ? (
            <li key={card.id} className="panel p-4">
              <CardEditor
                kind={card.kind}
                initial={card}
                submitLabel="Save"
                onCancel={() => setEditing(null)}
                onSubmit={(draft) => {
                  updateCard(card.id, draft);
                  setEditing(null);
                }}
              />
            </li>
          ) : (
            <li key={card.id} className="panel flex items-start gap-1 p-3">
              <SpeakButton text={card.reading || card.front} />
              <div className="min-w-0 flex-1 pt-1.5">
                <p
                  className={cn(
                    "font-kana leading-none",
                    card.kind === "kanji" ? "text-3xl" : "text-xl",
                  )}
                >
                  {card.front}
                </p>
                {card.reading ? (
                  <p className="mt-2 font-kana text-sm text-muted">
                    {card.reading}
                    {card.romaji ? ` · ${card.romaji}` : ""}
                  </p>
                ) : null}
                {card.meaning ? (
                  <p className="mt-1 text-sm text-fg">{card.meaning}</p>
                ) : null}
                {card.bn ? (
                  <p className="mt-0.5 font-bn text-sm text-muted">{card.bn}</p>
                ) : null}
                {card.note ? (
                  <p className="mt-0.5 text-xs text-subtle">{card.note}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col">
                <button
                  type="button"
                  aria-label="Edit card"
                  className="grid size-11 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
                  onClick={() => {
                    setEditing(card.id);
                    setAdding(false);
                  }}
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete card"
                  className="grid size-11 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
                  onClick={() => deleteCard(card.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ),
        )}
      </ul>

      <div className="mt-10 border-t border-border pt-6">
        {confirmDelete ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-muted">Delete this deck and its cards?</p>
            <Button
              type="button"
              size="sm"
              className="rounded-full"
              onClick={() => {
                deleteDeck(deck.id);
                void navigate({ to: "/cards" });
              }}
            >
              Delete
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <button
            type="button"
            className="text-sm text-muted hover:text-fg"
            onClick={() => setConfirmDelete(true)}
          >
            Delete deck
          </button>
        )}
      </div>
    </main>
  );
}
