import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SpeakButton } from "@/components/speak-button";
import { Spoiler } from "@/components/spoiler";
import { cn } from "@/lib/cn";
import { speakJapanese, stopSpeech } from "@/lib/speech";
import type { Dialogue, DialogueLine } from "@/lib/vocab";

function norm(s: string) {
  return s.trim().toLowerCase().replace(/[\s.。、？?！!'’]/g, "");
}

function answers(line: DialogueLine) {
  return [line.romaji, line.jp, line.romaji.replace(/\s/g, "")];
}

export function DialogueCard({
  dialogue,
  showMeanings,
}: {
  dialogue: Dialogue;
  showMeanings: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blankMode, setBlankMode] = useState(false);
  const [hole, setHole] = useState(0);
  const [typed, setTyped] = useState("");
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(false);
  const cancel = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    cancel.current = true;
    stopSpeech();
  }, []);

  const pickHole = () => {
    setHole(Math.floor(Math.random() * dialogue.lines.length));
    setTyped("");
    setSolved(false);
    queueMicrotask(() => inputRef.current?.focus());
  };

  const playAll = async () => {
    if (playing) {
      cancel.current = true;
      stopSpeech();
      setPlaying(false);
      setActive(null);
      return;
    }
    cancel.current = false;
    setPlaying(true);
    for (let i = 0; i < dialogue.lines.length; i++) {
      if (cancel.current) break;
      setActive(i);
      const line = dialogue.lines[i]!;
      await speakJapanese(line.jp, dialogue.voices[line.speaker]);
      if (cancel.current) break;
      await new Promise((r) => setTimeout(r, 380));
    }
    setPlaying(false);
    setActive(null);
  };

  const check = (value: string) => {
    setTyped(value);
    if (solved) return;
    const line = dialogue.lines[hole];
    if (!line) return;
    if (answers(line).some((a) => norm(a) === norm(value))) {
      setSolved(true);
      void speakJapanese(line.jp, dialogue.voices[line.speaker]);
    }
  };

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl tracking-tight">会話</h2>
          <p className="mt-0.5 text-sm text-muted">
            {dialogue.title} · {dialogue.setting}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              setPlaying(false);
              if (blankMode) {
                setBlankMode(false);
                setSolved(false);
                setTyped("");
              } else {
                setBlankMode(true);
                pickHole();
              }
            }}
            className={cn(
              "inline-flex min-h-11 items-center rounded-md border px-3 text-sm",
              blankMode
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-elevated hover:border-fg/30",
            )}
          >
            Fill blanks
          </button>
          {blankMode ? (
            <button
              type="button"
              onClick={pickHole}
              className="inline-flex min-h-11 items-center rounded-md border border-border bg-elevated px-3 text-sm hover:border-fg/30"
            >
              Next blank
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void playAll()}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-elevated px-3 text-sm hover:border-fg/30"
            >
              {playing ? (
                <>
                  <Pause className="size-4" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="size-4" />
                  Play conversation
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {dialogue.lines.map((line, i) => {
          const self = line.speaker === "B";
          const hidden = blankMode && i === hole && !solved;
          return (
            <li
              key={`${line.jp}-${i}`}
              className={cn("flex", self ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[92%] rounded-xl border px-3 py-2 sm:max-w-[80%]",
                  active === i || (blankMode && i === hole)
                    ? "border-accent bg-accent/10"
                    : "border-border bg-surface",
                  hidden && shake && "kana-shake",
                )}
              >
                <p className="text-[11px] uppercase tracking-wider text-subtle">
                  {dialogue.speakers[line.speaker]}
                </p>
                {hidden ? (
                  <div className="mt-2">
                    <p className="font-kana text-lg text-subtle">＿＿＿</p>
                    <input
                      ref={inputRef}
                      value={typed}
                      onChange={(e) => check(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      aria-label="Missing line"
                      placeholder="romaji"
                      className="mt-2 w-full border-0 border-b border-border bg-transparent font-display text-xl outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShake(true);
                        window.setTimeout(() => setShake(false), 280);
                        setSolved(true);
                        void speakJapanese(line.jp, dialogue.voices[line.speaker]);
                      }}
                      className="mt-2 text-xs text-subtle hover:text-muted"
                    >
                      Reveal
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-start gap-1">
                    <SpeakButton
                      text={line.jp}
                      voice={dialogue.voices[line.speaker]}
                      className="size-9"
                    />
                    <div className="min-w-0 pt-1.5">
                      <p className="font-kana text-lg leading-snug">{line.jp}</p>
                      <div className="mt-1">
                        <Spoiler>{line.romaji}</Spoiler>
                      </div>
                      {showMeanings ? (
                        <>
                          <p className="mt-1 text-sm text-muted">{line.meaning}</p>
                          <p className="mt-0.5 font-bn text-sm text-subtle">
                            {line.bn}
                          </p>
                        </>
                      ) : (
                        <>
                          <Spoiler variant="line" label="English meaning">
                            {line.meaning}
                          </Spoiler>
                          <Spoiler
                            variant="line"
                            label="Bangla meaning"
                            className="font-bn"
                          >
                            {line.bn}
                          </Spoiler>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
