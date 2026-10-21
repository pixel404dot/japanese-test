import { useEffect, useRef } from "react";
import { loadProgress, saveProgress } from "@/lib/cloud-progress";
import { mergeBundles } from "@/lib/decks";
import type { StatsMap } from "@/lib/progress";
import type { SrsMap } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

function mergeSrs(a: SrsMap, b: SrsMap): SrsMap {
  const out: SrsMap = { ...a };
  for (const [key, card] of Object.entries(b)) {
    const prev = out[key];
    if (!prev || card.level > prev.level || (card.level === prev.level && card.due > prev.due)) {
      out[key] = card;
    }
  }
  return out;
}

function mergeStats(a: StatsMap, b: StatsMap): StatsMap {
  const out: StatsMap = { ...a };
  for (const [key, stat] of Object.entries(b)) {
    const prev = out[key];
    if (!prev) {
      out[key] = stat;
      continue;
    }
    out[key] = {
      shown: Math.max(prev.shown, stat.shown),
      right: Math.max(prev.right, stat.right),
      wrong: Math.max(prev.wrong, stat.wrong),
      help: Math.max(prev.help, stat.help),
      edits: Math.max(prev.edits, stat.edits),
      wrongSubmissions: Math.max(prev.wrongSubmissions, stat.wrongSubmissions),
      timeSum: Math.max(prev.timeSum, stat.timeSum),
      daily: stat.daily.length >= prev.daily.length ? stat.daily : prev.daily,
    };
  }
  return out;
}

function isUnauthorized(err: unknown) {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    (err as { status?: number }).status === 401
  );
}

export function ProgressSync() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useKanaStore((s) => s.hydrated);
  const stats = useKanaStore((s) => s.stats);
  const vocabSrs = useKanaStore((s) => s.vocabSrs);
  const decks = useKanaStore((s) => s.decks);
  const cards = useKanaStore((s) => s.cards);
  const ready = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    ready.current = false;
    if (isPending || !user || !hydrated) return;
    let cancelled = false;
    void loadProgress()
      .then((remote) => {
        if (cancelled) return;
        const local = useKanaStore.getState();
        const nextStats = mergeStats(local.stats, remote.stats);
        const nextSrs = mergeSrs(local.vocabSrs, remote.vocabSrs);
        const nextBundle = mergeBundles(
          { decks: local.decks, cards: local.cards },
          remote.decks,
        );
        local.setStats(nextStats);
        local.setVocabSrs(nextSrs);
        local.setBundle(nextBundle);
        ready.current = true;
        return saveProgress({
          data: { stats: nextStats, vocabSrs: nextSrs, decks: nextBundle },
        });
      })
      .catch((err) => {
        if (!isUnauthorized(err)) console.warn("progress load failed", err);
        ready.current = true;
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending, hydrated]);

  useEffect(() => {
    if (!user || !hydrated || !ready.current) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      void saveProgress({
        data: {
          stats,
          vocabSrs,
          decks: { decks, cards },
        },
      }).catch((err) => {
        if (!isUnauthorized(err)) console.warn("progress save failed", err);
      });
    }, 800);
    return () => window.clearTimeout(timer.current);
  }, [stats, vocabSrs, decks, cards, user?.id, hydrated]);

  return null;
}
