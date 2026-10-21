import { cn } from "@/lib/cn";
import {
  groupsFor,
  romajiPreview,
  type GroupTag,
  type KanaGroup,
  type Script,
} from "@/lib/kana";

const SECTIONS: { tag: GroupTag; label: string }[] = [
  { tag: "main", label: "Main" },
  { tag: "dakuten", label: "Dakuten" },
  { tag: "yoon", label: "Combinations" },
];

function previewHint(groups: KanaGroup[]): string {
  return groups
    .slice(0, 3)
    .map((g) => romajiPreview(g).split(" ")[0])
    .join(" · ");
}

export function RowPicker({
  script,
  selected,
  onToggle,
  onSet,
}: {
  script: Script;
  selected: string[];
  onToggle: (id: string) => void;
  onSet: (ids: string[]) => void;
}) {
  const groups = groupsFor(script);
  const selectedSet = new Set(selected);

  return (
    <div>
      {SECTIONS.map(({ tag, label }) => {
        const rows = groups.filter((g) => g.tag === tag);
        const ids = rows.map((g) => g.id);
        const allOn = ids.every((id) => selectedSet.has(id));
        return (
          <div key={tag} className={tag === "main" ? "" : "mt-5"}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="kicker">
                  {label}
                </p>
                {tag === "yoon" ? (
                  <p className="mt-0.5 text-[11px] text-subtle">
                    {previewHint(rows)}
                    {" · …"}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                className="text-xs text-muted hover:text-fg"
                onClick={() => {
                  if (allOn) {
                    onSet(selected.filter((id) => !ids.includes(id)));
                  } else {
                    onSet([...new Set([...selected, ...ids])]);
                  }
                }}
              >
                {allOn ? "Clear" : "Select"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {rows.map((row) => {
                const on = selectedSet.has(row.id);
                return (
                  <button
                    key={row.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(row.id)}
                    className={cn(
                      "flex min-h-11 flex-col items-start rounded-lg px-3 py-2 text-left transition-[box-shadow,background-color,color] duration-150",
                      on
                        ? "bg-accent text-accent-fg"
                        : "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
                    )}
                  >
                    <span className="font-kana text-lg leading-none">
                      {row.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1 text-[11px] leading-tight",
                        on ? "opacity-80" : "text-muted",
                      )}
                    >
                      {romajiPreview(row)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
