import { useNavigate } from "@tanstack/react-router";
import { SessionSetup } from "@/components/session-setup";
import { charsForGroups, groupsFor, type Script } from "@/lib/kana";
import { WORDS } from "@/lib/words";
import { yoonTitlesIn } from "@/lib/kana";
import { useKanaStore } from "@/lib/store";

function wordsForGroups(ids: string[]): number {
  const titles = new Set(
    groupsFor("hiragana")
      .concat(groupsFor("katakana"))
      .filter((g) => ids.includes(g.id))
      .map((g) => g.title),
  );
  return WORDS.filter((w) => {
    const yoon = yoonTitlesIn(w.k);
    const rows = [...w.hg, ...w.kg];
    const needed = yoon.length
      ? [...rows.filter((x) => x !== "や" && x !== "ヤ"), ...yoon]
      : rows;
    return needed.length !== 0 && needed.every((x) => titles.has(x));
  }).length;
}

export function SessionBar({
  script: _script,
  selected,
}: {
  script: Script;
  selected: string[];
}) {
  const settings = useKanaStore((s) => s.settings);
  const setSettings = useKanaStore((s) => s.setSettings);
  const setGroups = useKanaStore((s) => s.setGroups);
  const navigate = useNavigate();

  const pool = settings.words
    ? wordsForGroups(selected)
    : charsForGroups(selected).length;

  return (
    <SessionSetup
      pool={pool}
      itemLabel="Kanas"
      optionKeys={["touch", "words", "handwritten", "autoNext", "noRepeat"]}
      startDisabled={selected.length === 0}
      onStart={() => {
        setGroups(selected);
        setSettings({ vocabLessonId: null, focusKeys: null });
        void navigate({ to: "/practice" });
      }}
    />
  );
}
