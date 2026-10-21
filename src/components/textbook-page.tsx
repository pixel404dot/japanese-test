import { SpeakButton } from "@/components/speak-button";
import { Spoiler } from "@/components/spoiler";
import { cn } from "@/lib/cn";
import type { Dialogue, VocabLesson, VocabWord } from "@/lib/vocab";
import { getDialogues } from "@/lib/vocab";

function Meaning({
  text,
  label,
  open,
  className,
}: {
  text: string;
  label: string;
  open: boolean;
  className?: string;
}) {
  return (
    <Spoiler
      key={`${label}-${open}`}
      variant="line"
      label={label}
      defaultOpen={open}
      className={cn("sheet-meaning mt-0 min-h-9 w-full px-2 py-1.5 text-left", className)}
    >
      {text}
    </Spoiler>
  );
}

function SheetRow({
  word,
  showMeanings,
  active,
  rowId,
}: {
  word: VocabWord;
  showMeanings: boolean;
  active?: boolean;
  rowId?: string;
}) {
  return (
    <div
      id={rowId}
      className={cn(
        "sheet-row sheet-grid panel grid grid-cols-1 gap-1 p-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.35fr)_minmax(0,1.25fr)] sm:items-center sm:gap-3 sm:rounded-none sm:bg-transparent sm:p-3 sm:shadow-none sm:ring-0",
        active && "bg-elevated shadow-[var(--shadow-border-hover)]",
      )}
    >
      <div className="flex items-center gap-1">
        <SpeakButton text={word.jp} className="no-print size-9" />
        <p className="sheet-kana font-kana text-lg leading-tight">{word.jp}</p>
      </div>
      {word.kanji ? (
        <p className="sheet-kanji font-kana text-sm text-muted">{word.kanji}</p>
      ) : (
        <p className="sheet-kanji hidden text-sm text-subtle sm:block">—</p>
      )}
      <p className="sheet-romaji text-sm text-muted">{word.romaji[0]}</p>
      <Meaning text={word.meaning} label="English meaning" open={showMeanings} />
      <Meaning
        text={word.bn}
        label="Bangla meaning"
        open={showMeanings}
        className="font-bn"
      />
    </div>
  );
}

function SheetBlock({
  title,
  words,
  showMeanings,
  activeIndex,
  indexOffset,
}: {
  title: string;
  words: VocabWord[];
  showMeanings: boolean;
  activeIndex: number;
  indexOffset: number;
}) {
  if (words.length === 0) return null;
  return (
    <section className="sheet-block mt-8">
      <h2 className="mb-3 font-display text-lg tracking-tight">{title}</h2>
      <div className="sheet-table space-y-2 sm:space-y-0 sm:overflow-hidden sm:rounded-xl sm:bg-surface sm:shadow-[var(--shadow-border)]">
      <div className="sheet-head sheet-grid hidden border-b border-border px-3 pb-2 pt-3 text-xs uppercase tracking-wider text-subtle sm:grid sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.35fr)_minmax(0,1.25fr)] sm:gap-3">
        <span>Kana</span>
        <span className="sheet-kanji">Kanji</span>
        <span>Romaji</span>
        <span>English</span>
        <span>বাংলা</span>
      </div>
      {words.map((word, i) => (
        <SheetRow
          key={`${word.jp}-${i}`}
          word={word}
          showMeanings={showMeanings}
          active={activeIndex === indexOffset + i}
          rowId={`read-row-${indexOffset + i}`}
        />
      ))}
      </div>
    </section>
  );
}

function DialogueSheet({
  dialogue,
  showMeanings,
}: {
  dialogue: Dialogue;
  showMeanings: boolean;
}) {
  return (
    <section className="sheet-dialogue mt-10 break-inside-avoid">
      <h2 className="font-display text-lg tracking-tight">会話 {dialogue.title}</h2>
      <p className="mt-1 text-sm text-muted">{dialogue.setting}</p>
      <ol className="mt-4 space-y-4">
        {dialogue.lines.map((line, i) => (
          <li key={`${line.jp}-${i}`} className="sheet-row">
            <p className="text-xs uppercase tracking-wider text-subtle">
              {dialogue.speakers[line.speaker]}
            </p>
            <div className="mt-1 flex items-start gap-1">
              <SpeakButton
                text={line.jp}
                voice={dialogue.voices[line.speaker]}
                className="no-print size-9"
              />
              <p className="sheet-kana font-kana text-lg leading-snug">{line.jp}</p>
            </div>
            <p className="sheet-romaji text-sm text-muted">{line.romaji}</p>
            <Meaning
              text={line.meaning}
              label="English meaning"
              open={showMeanings}
            />
            <Meaning
              text={line.bn}
              label="Bangla meaning"
              open={showMeanings}
              className="font-bn"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function TextbookPage({
  lesson,
  showMeanings,
  vocab: vocabProp,
  phrases: phrasesProp,
  activeIndex = -1,
}: {
  lesson: VocabLesson;
  showMeanings: boolean;
  vocab?: VocabWord[];
  phrases?: VocabWord[];
  activeIndex?: number;
}) {
  const vocab = vocabProp ?? lesson.words.filter((w) => w.kind !== "phrase");
  const phrases = phrasesProp ?? lesson.words.filter((w) => w.kind === "phrase");
  const dialogues = getDialogues(lesson.id);

  return (
    <article className="textbook-sheet">
      {lesson.number > 0 ? (
        <p className="sheet-kicker text-xs font-medium uppercase tracking-wider text-subtle">
          Lesson {lesson.number}
        </p>
      ) : null}
      <p className="sheet-title-ja mt-2 font-kana text-3xl text-muted">{lesson.titleJa}</p>
      <h1 className="sheet-title mt-1 font-display text-4xl tracking-tight">{lesson.title}</h1>
      <p className="sheet-desc mt-3 max-w-xl text-muted">{lesson.description}</p>
      <SheetBlock
        title="Vocabulary"
        words={vocab}
        showMeanings={showMeanings}
        activeIndex={activeIndex}
        indexOffset={0}
      />
      <SheetBlock
        title="Phrases"
        words={phrases}
        showMeanings={showMeanings}
        activeIndex={activeIndex}
        indexOffset={vocab.length}
      />
      {dialogues.map((d) => (
        <DialogueSheet key={d.title} dialogue={d} showMeanings={showMeanings} />
      ))}
    </article>
  );
}
