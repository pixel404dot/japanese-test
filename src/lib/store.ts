import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Deck, DeckBundle, DeckCard, DeckKind } from "./decks";
import { mergeBundles, uid } from "./decks";
import type { StatsMap } from "./progress";
import { srsCorrect, srsRate, srsWrong, type Rating, type SrsMap } from "./srs";

export type SessionMode = "unlimited" | "count" | "time";
export type VocabPrompt = "kana" | "meaning" | "listen";

export type Settings = {
  groupIds: string[];
  sessionMode: SessionMode;
  countValue: number;
  minutesValue: number;
  touch: boolean;
  words: boolean;
  handwritten: boolean;
  autoNext: boolean;
  noRepeat: boolean;
  vocabLessonId: string | null;
  vocabPrompt: VocabPrompt;
  showVocabMeanings: boolean;
  reviewOnly: boolean;
  readSpeed: number;
  focusKeys: string[] | null;
};

export type LastSession = {
  right: number;
  wrong: number;
  help: number;
  timeSum: number;
  startedAt: number;
  perKey: Record<string, { right: number; wrong: number; timeSum: number }>;
  kind: "kana" | "word";
};

const defaultSettings: Settings = {
  groupIds: ["h-a"],
  sessionMode: "unlimited",
  countValue: 20,
  minutesValue: 5,
  touch: false,
  words: false,
  handwritten: false,
  autoNext: true,
  noRepeat: false,
  vocabLessonId: null,
  vocabPrompt: "kana",
  showVocabMeanings: true,
  reviewOnly: false,
  readSpeed: 1,
  focusKeys: null,
};

type Store = {
  settings: Settings;
  stats: StatsMap;
  vocabSrs: SrsMap;
  lastSession: LastSession | null;
  decks: Deck[];
  cards: DeckCard[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setSettings: (patch: Partial<Settings>) => void;
  toggleGroup: (id: string) => void;
  setGroups: (ids: string[]) => void;
  setStats: (stats: StatsMap) => void;
  setLastSession: (session: LastSession | null) => void;
  applySrs: (key: string, ok: boolean) => void;
  applyRating: (key: string, rating: Rating) => void;
  setVocabSrs: (vocabSrs: SrsMap) => void;
  setBundle: (bundle: DeckBundle) => void;
  addDeck: (input: { title: string; titleJa?: string; kind: DeckKind }) => Deck;
  updateDeck: (id: string, patch: Partial<Pick<Deck, "title" | "titleJa" | "kind">>) => void;
  deleteDeck: (id: string) => void;
  addCard: (input: Omit<DeckCard, "id" | "createdAt" | "updatedAt">) => DeckCard;
  updateCard: (id: string, patch: Partial<Omit<DeckCard, "id" | "deckId" | "createdAt">>) => void;
  deleteCard: (id: string) => void;
};

function finishHydration(state: Store) {
  const prev = state.settings as Settings & { fromMeaning?: boolean };
  state.settings = { ...defaultSettings, ...prev };
  if (!prev.vocabPrompt && prev.fromMeaning) {
    state.settings.vocabPrompt = "meaning";
  }
  state.vocabSrs = state.vocabSrs ?? {};
  state.decks = Array.isArray(state.decks) ? state.decks : [];
  state.cards = Array.isArray(state.cards) ? state.cards : [];
  state.setHydrated(true);
}

export const useKanaStore = create<Store>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      stats: {},
      vocabSrs: {},
      lastSession: null,
      decks: [],
      cards: [],
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      setSettings: (patch) =>
        set({ settings: { ...get().settings, ...patch } }),
      toggleGroup: (id) => {
        const ids = get().settings.groupIds;
        const groupIds = ids.includes(id)
          ? ids.filter((x) => x !== id)
          : [...ids, id];
        set({ settings: { ...get().settings, groupIds } });
      },
      setGroups: (groupIds) =>
        set({ settings: { ...get().settings, groupIds } }),
      setStats: (stats) => set({ stats }),
      setLastSession: (lastSession) => set({ lastSession }),
      applySrs: (key, ok) => {
        const prev = get().vocabSrs[key];
        const next = ok ? srsCorrect(prev) : srsWrong();
        set({ vocabSrs: { ...get().vocabSrs, [key]: next } });
      },
      applyRating: (key, rating) => {
        const prev = get().vocabSrs[key];
        set({ vocabSrs: { ...get().vocabSrs, [key]: srsRate(prev, rating) } });
      },
      setVocabSrs: (vocabSrs) => set({ vocabSrs }),
      setBundle: (bundle) => set({ decks: bundle.decks, cards: bundle.cards }),
      addDeck: (input) => {
        const now = Date.now();
        const deck: Deck = {
          id: uid(),
          title: input.title.trim() || "Untitled",
          titleJa: input.titleJa?.trim() ?? "",
          kind: input.kind,
          createdAt: now,
          updatedAt: now,
        };
        set({ decks: [deck, ...get().decks] });
        return deck;
      },
      updateDeck: (id, patch) => {
        const now = Date.now();
        set({
          decks: get().decks.map((d) =>
            d.id === id
              ? {
                  ...d,
                  ...patch,
                  title: patch.title?.trim() || d.title,
                  titleJa: patch.titleJa !== undefined ? patch.titleJa.trim() : d.titleJa,
                  updatedAt: now,
                }
              : d,
          ),
        });
      },
      deleteDeck: (id) => {
        set({
          decks: get().decks.filter((d) => d.id !== id),
          cards: get().cards.filter((c) => c.deckId !== id),
        });
      },
      addCard: (input) => {
        const now = Date.now();
        const card: DeckCard = {
          ...input,
          front: input.front.trim(),
          reading: input.reading.trim(),
          romaji: input.romaji.trim(),
          meaning: input.meaning.trim(),
          bn: input.bn.trim(),
          note: input.note.trim(),
          id: uid(),
          createdAt: now,
          updatedAt: now,
        };
        set({
          cards: [...get().cards, card],
          decks: get().decks.map((d) =>
            d.id === card.deckId ? { ...d, updatedAt: now } : d,
          ),
        });
        return card;
      },
      updateCard: (id, patch) => {
        const now = Date.now();
        set({
          cards: get().cards.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...patch,
                  front: patch.front !== undefined ? patch.front.trim() : c.front,
                  reading: patch.reading !== undefined ? patch.reading.trim() : c.reading,
                  romaji: patch.romaji !== undefined ? patch.romaji.trim() : c.romaji,
                  meaning: patch.meaning !== undefined ? patch.meaning.trim() : c.meaning,
                  bn: patch.bn !== undefined ? patch.bn.trim() : c.bn,
                  note: patch.note !== undefined ? patch.note.trim() : c.note,
                  updatedAt: now,
                }
              : c,
          ),
        });
      },
      deleteCard: (id) => {
        set({ cards: get().cards.filter((c) => c.id !== id) });
      },
    }),
    {
      name: "learn-kana-v2",
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Store>;
        const bundle = mergeBundles(
          { decks: current.decks ?? [], cards: current.cards ?? [] },
          {
            decks: Array.isArray(p.decks) ? p.decks : [],
            cards: Array.isArray(p.cards) ? p.cards : [],
          },
        );
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...p.settings },
          vocabSrs: { ...(p.vocabSrs ?? {}), ...(current.vocabSrs ?? {}) },
          stats: { ...(p.stats ?? {}), ...(current.stats ?? {}) },
          decks: bundle.decks,
          cards: bundle.cards,
        };
      },
      partialize: (s) => ({
        settings: s.settings,
        stats: s.stats,
        vocabSrs: s.vocabSrs,
        lastSession: s.lastSession,
        decks: s.decks,
        cards: s.cards,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          finishHydration(state);
          return;
        }
        queueMicrotask(() => useKanaStore.setState({ hydrated: true }));
      },
    },
  ),
);
