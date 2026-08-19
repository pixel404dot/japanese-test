import type { ReactNode } from "react";
import { useState } from "react";
import { Check, Layers3, Shuffle, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BASIC_ROWS,
  DAKUTEN_ROWS,
  DEFAULT_SETUP,
  FIRST5_ROWS,
  type QuizMode,
  ROWS,
  ROW_GROUPS,
  type RowId,
  type ScriptMode,
  type SetupState,
  TIMER_MAX,
  TIMER_MIN,
  TIMER_PRESETS,
  YOON_ROWS,
  clampTimer,
  isFirst5,
  sameRows,
} from "@/lib/kana";
import { cn } from "@/lib/utils";

interface SetupPanelProps {
  setup: SetupState;
  onChange: (next: SetupState) => void;
  onStart: () => void;
}

const SCRIPTS: { id: ScriptMode; ja: string; en: string; blurb: string }[] = [
  {
    id: "hiragana",
    ja: "ひらがな",
    en: "Hiragana",
    blurb: "The rounded script",
  },
  {
    id: "katakana",
    ja: "カタカナ",
    en: "Katakana",
    blurb: "The angular script",
  },
  {
    id: "mixed",
    ja: "混ぜる",
    en: "Mixed",
    blurb: "Both in one drill",
  },
];

const MODES: {
  id: QuizMode;
  icon: typeof Type;
  title: string;
  blurb: string;
}[] = [
  {
    id: "read",
    icon: Type,
    title: "Type the reading",
    blurb: "See kana, write romaji",
  },
  {
    id: "write",
    icon: Layers3,
    title: "Choose the character",
    blurb: "See romaji, tap the kana",
  },
  {
    id: "mixed",
    icon: Shuffle,
    title: "Mixed test",
    blurb: "Both directions, shuffled",
  },
];

const LENGTHS: SetupState["length"][] = [10, 20, 40, "all"];

export function SetupPanel({ setup, onChange, onStart }: SetupPanelProps) {
  const selectedCount = ROWS.filter((row) => setup.rows.includes(row.id))
    .length;
  const poolNote =
    setup.script === "mixed"
      ? "hiragana + katakana of the selected lines"
      : setup.script;
  const [customOpen, setCustomOpen] = useState(
    setup.timer > 0 &&
      !(TIMER_PRESETS as readonly number[]).includes(setup.timer),
  );
  const [customDraft, setCustomDraft] = useState(
    String(
      setup.timer > 0 &&
        !(TIMER_PRESETS as readonly number[]).includes(setup.timer)
        ? setup.timer
        : 12,
    ),
  );
  const timerIsCustom =
    customOpen ||
    (setup.timer > 0 &&
      !(TIMER_PRESETS as readonly number[]).includes(setup.timer));

  function toggleRow(id: RowId) {
    const rows = setup.rows.includes(id)
      ? setup.rows.filter((r) => r !== id)
      : [...setup.rows, id];
    onChange({ ...setup, rows });
  }

  function setRows(rows: RowId[]) {
    onChange({ ...setup, rows: [...rows] });
  }

  return (
    <div className="space-y-10">
      <header className="max-w-xl space-y-3">
        <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
          Gojūon drill
        </p>
        <h1 className="text-4xl leading-tight sm:text-5xl">
          Practice by the line.
        </h1>
        <p className="text-base leading-relaxed text-muted">
          Pick hiragana, katakana, or a proper mixed test. Start from the first
          five lines — あかさたな — or choose any row you want.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg">Script</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {SCRIPTS.map((item) => {
            const active = setup.script === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...setup, script: item.id })}
                className={cn(
                  "rounded-xl bg-surface p-4 text-left shadow-border transition-[box-shadow,transform] duration-150",
                  "hover:shadow-border-hover",
                  active && "ring-2 ring-primary/70 ring-offset-2 ring-offset-bg",
                )}
              >
                <p className="font-serif text-2xl">{item.ja}</p>
                <p className="mt-2 font-medium">{item.en}</p>
                <p className="text-sm text-muted">{item.blurb}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg">Lines</h2>
            <p className="text-sm text-muted">
              {selectedCount} selected · {poolNote}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PresetChip
              active={isFirst5(setup.rows)}
              onClick={() => setRows(FIRST5_ROWS)}
            >
              First 5 · あかさたな
            </PresetChip>
            <PresetChip
              active={sameRows(setup.rows, BASIC_ROWS)}
              onClick={() => setRows(BASIC_ROWS)}
            >
              All basic
            </PresetChip>
            <PresetChip
              active={setup.rows.length === 0}
              onClick={() => setRows([])}
            >
              Clear
            </PresetChip>
          </div>
        </div>

        {ROW_GROUPS.map((group) => {
          const groupRows = ROWS.filter((row) => row.group === group.id);
          const groupIds = groupRows.map((row) => row.id);
          const allOn = groupIds.every((id) => setup.rows.includes(id));
          return (
            <div key={group.id} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{group.label}</p>
                  <p className="text-xs text-muted">{group.note}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setRows(
                      allOn
                        ? setup.rows.filter((id) => !groupIds.includes(id))
                        : Array.from(new Set([...setup.rows, ...groupIds])),
                    )
                  }
                  className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {allOn ? "Deselect" : "Select all"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {groupRows.map((row) => {
                  const active = setup.rows.includes(row.id);
                  const preview =
                    setup.script === "katakana"
                      ? row.preview.katakana
                      : setup.script === "hiragana"
                        ? row.preview.hiragana
                        : `${row.preview.hiragana} ${row.preview.katakana}`;
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => toggleRow(row.id)}
                      className={cn(
                        "relative min-h-20 rounded-lg bg-surface px-3 py-2.5 text-left shadow-border transition-[box-shadow,transform] duration-150",
                        "hover:shadow-border-hover",
                        active && "ring-2 ring-ink/70 ring-offset-2 ring-offset-bg",
                      )}
                    >
                      {active && (
                        <Check className="absolute top-2 right-2 size-3.5 text-primary" />
                      )}
                      <p className="text-xs font-medium tracking-wide text-muted uppercase">
                        {row.label}
                      </p>
                      <p className="font-serif text-lg leading-tight tracking-wide">
                        {setup.script === "mixed"
                          ? row.preview.hiragana
                          : preview}
                      </p>
                      {setup.script === "mixed" && (
                        <p className="font-serif text-sm tracking-wide text-muted">
                          {row.preview.katakana}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {group.id === "basic" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setRows(
                        Array.from(new Set([...setup.rows, ...DAKUTEN_ROWS])),
                      )
                    }
                    className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    Add voiced marks
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setRows(Array.from(new Set([...setup.rows, ...YOON_ROWS])))
                    }
                    className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    Add combinations
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg">Test style</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODES.map((item) => {
            const active = setup.mode === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ ...setup, mode: item.id })}
                className={cn(
                  "flex gap-3 rounded-xl bg-surface p-4 text-left shadow-border transition-[box-shadow] duration-150",
                  "hover:shadow-border-hover",
                  active && "ring-2 ring-primary/70 ring-offset-2 ring-offset-bg",
                )}
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="text-sm text-muted">{item.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-lg">Length</h2>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((len) => (
              <button
                key={String(len)}
                type="button"
                onClick={() => onChange({ ...setup, length: len })}
                className={cn(
                  "h-10 min-w-14 rounded-full px-3 text-sm shadow-border transition-colors",
                  setup.length === len
                    ? "bg-ink text-bg"
                    : "bg-surface text-ink hover:bg-ink/5",
                )}
              >
                {len === "all" ? "All unique" : len}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <h2 className="text-lg">Timer</h2>
            <p className="text-sm text-muted">Seconds for each question</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIMER_PRESETS.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => {
                  setCustomOpen(false);
                  onChange({ ...setup, timer: sec });
                }}
                className={cn(
                  "h-10 min-w-14 rounded-full px-3 text-sm shadow-border transition-colors",
                  !timerIsCustom && setup.timer === sec
                    ? "bg-ink text-bg"
                    : "bg-surface text-ink hover:bg-ink/5",
                )}
              >
                {sec === 0 ? "Off" : `${sec}s`}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                const next = clampTimer(customDraft) || 12;
                setCustomOpen(true);
                setCustomDraft(String(next));
                onChange({ ...setup, timer: next });
              }}
              className={cn(
                "h-10 min-w-14 rounded-full px-3 text-sm shadow-border transition-colors",
                timerIsCustom
                  ? "bg-ink text-bg"
                  : "bg-surface text-ink hover:bg-ink/5",
              )}
            >
              Custom
            </button>
          </div>
          {timerIsCustom && (
            <div className="flex items-center gap-2 pt-1">
              <Input
                type="number"
                min={TIMER_MIN}
                max={TIMER_MAX}
                inputMode="numeric"
                aria-label="Custom seconds per question"
                value={customDraft}
                onChange={(event) => {
                  const raw = event.target.value;
                  setCustomDraft(raw);
                  if (raw === "") return;
                  const next = clampTimer(raw);
                  if (next > 0) onChange({ ...setup, timer: next });
                }}
                className="h-11 w-24 tabular-nums"
              />
              <span className="text-sm text-muted">seconds (1–120)</span>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setCustomOpen(false);
            setCustomDraft("12");
            onChange(DEFAULT_SETUP);
          }}
        >
          Reset first 5 mixed
        </Button>
        <Button
          type="button"
          size="xl"
          disabled={setup.rows.length === 0}
          onClick={onStart}
        >
          Start drill
        </Button>
      </section>
    </div>
  );
}

function PresetChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full px-3 text-sm shadow-border transition-colors",
        active ? "bg-primary text-primary-fg" : "bg-surface hover:bg-ink/5",
      )}
    >
      {children}
    </button>
  );
}
