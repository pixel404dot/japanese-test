export type DeckKind = "lesson" | "kanji";

export type Deck = {
  id: string;
  title: string;
  titleJa: string;
  kind: DeckKind;
  createdAt: number;
  updatedAt: number;
};

export type DeckCard = {
  id: string;
  deckId: string;
  kind: DeckKind;
  front: string;
  reading: string;
  romaji: string;
  meaning: string;
  bn: string;
  note: string;
  createdAt: number;
  updatedAt: number;
};

export type DeckBundle = {
  decks: Deck[];
  cards: DeckCard[];
};

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cardSrsKey(id: string) {
  return `card:${id}`;
}

export function emptyBundle(): DeckBundle {
  return { decks: [], cards: [] };
}

export function mergeBundles(a: DeckBundle, b: DeckBundle): DeckBundle {
  return {
    decks: mergeById(a.decks, b.decks),
    cards: mergeById(a.cards, b.cards),
  };
}

function mergeById<T extends { id: string; updatedAt: number }>(
  a: T[],
  b: T[],
): T[] {
  const map = new Map<string, T>();
  for (const item of a) map.set(item.id, item);
  for (const item of b) {
    const prev = map.get(item.id);
    if (!prev || item.updatedAt >= prev.updatedAt) map.set(item.id, item);
  }
  return [...map.values()].sort((x, y) => y.updatedAt - x.updatedAt);
}

export function cardsForDeck(cards: DeckCard[], deckId: string) {
  return cards
    .filter((c) => c.deckId === deckId)
    .sort((a, b) => a.createdAt - b.createdAt);
}
