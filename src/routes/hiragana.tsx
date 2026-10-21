import { createFileRoute, Link } from "@tanstack/react-router";
import { RowPicker } from "@/components/row-picker";
import { SessionBar } from "@/components/session-bar";
import { groupsFor, defaultGroupId } from "@/lib/kana";
import { useKanaStore } from "@/lib/store";
import { useEffect } from "react";

export const Route = createFileRoute("/hiragana")({ component: HiraganaPage });

function HiraganaPage() {
  const settings = useKanaStore((s) => s.settings);
  const toggleGroup = useKanaStore((s) => s.toggleGroup);
  const setGroups = useKanaStore((s) => s.setGroups);
  const hydrated = useKanaStore((s) => s.hydrated);
  const ids = groupsFor("hiragana").map((g) => g.id);
  const selected = settings.groupIds.filter((id) => ids.includes(id));
  const others = settings.groupIds.filter((id) => !ids.includes(id));

  useEffect(() => {
    if (!hydrated) return;
    const current = useKanaStore.getState().settings.groupIds;
    const hiraIds = groupsFor("hiragana").map((g) => g.id);
    const hasHira = current.some((id) => hiraIds.includes(id));
    if (!hasHira) {
      setGroups([
        ...current.filter((id) => !hiraIds.includes(id)),
        defaultGroupId("hiragana"),
      ]);
    }
  }, [hydrated, setGroups]);

  return (
    <main className="page">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="kicker">Kana</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Hiragana</h1>
          <p className="mt-2 text-sm text-muted">Pick rows, then drill.</p>
        </div>
        <Link
          to="/katakana"
          className="inline-flex h-10 items-center rounded-full bg-elevated px-4 text-sm text-fg no-underline shadow-[var(--shadow-border)]"
        >
          ア Katakana
        </Link>
      </div>
      <RowPicker
        script="hiragana"
        selected={selected}
        onToggle={toggleGroup}
        onSet={(next) => setGroups([...others, ...next])}
      />
      <SessionBar script="hiragana" selected={selected} />
    </main>
  );
}
