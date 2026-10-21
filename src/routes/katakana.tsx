import { createFileRoute, Link } from "@tanstack/react-router";
import { RowPicker } from "@/components/row-picker";
import { SessionBar } from "@/components/session-bar";
import { groupsFor, defaultGroupId } from "@/lib/kana";
import { useKanaStore } from "@/lib/store";
import { useEffect } from "react";

export const Route = createFileRoute("/katakana")({ component: KatakanaPage });

function KatakanaPage() {
  const settings = useKanaStore((s) => s.settings);
  const toggleGroup = useKanaStore((s) => s.toggleGroup);
  const setGroups = useKanaStore((s) => s.setGroups);
  const hydrated = useKanaStore((s) => s.hydrated);
  const ids = groupsFor("katakana").map((g) => g.id);
  const selected = settings.groupIds.filter((id) => ids.includes(id));
  const others = settings.groupIds.filter((id) => !ids.includes(id));

  useEffect(() => {
    if (!hydrated) return;
    const current = useKanaStore.getState().settings.groupIds;
    const kataIds = groupsFor("katakana").map((g) => g.id);
    const hasKata = current.some((id) => kataIds.includes(id));
    if (!hasKata) {
      setGroups([
        ...current.filter((id) => !kataIds.includes(id)),
        defaultGroupId("katakana"),
      ]);
    }
  }, [hydrated, setGroups]);

  return (
    <main className="page">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="kicker">Kana</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Katakana</h1>
          <p className="mt-2 text-sm text-muted">Pick rows, then drill.</p>
        </div>
        <Link
          to="/hiragana"
          className="inline-flex h-10 items-center rounded-full bg-elevated px-4 text-sm text-fg no-underline shadow-[var(--shadow-border)]"
        >
          あ Hiragana
        </Link>
      </div>
      <RowPicker
        script="katakana"
        selected={selected}
        onToggle={toggleGroup}
        onSet={(next) => setGroups([...others, ...next])}
      />
      <SessionBar script="katakana" selected={selected} />
    </main>
  );
}
