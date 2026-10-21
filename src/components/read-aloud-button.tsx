import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { READ_SPEEDS, readWordsAloud, setPlaybackRate, stopSpeech, unlockSpeech } from "@/lib/speech";
import { useKanaStore } from "@/lib/store";
import { cn } from "@/lib/cn";

function label(rate: number) {
  return `${rate}×`;
}

export function ReadAloudButton({
  words,
  onCurrent,
  className,
}: {
  words: { jp: string; bn: string }[];
  onCurrent?: (index: number) => void;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const gen = useRef(0);
  const stored = useKanaStore((s) => s.settings.readSpeed ?? 1);
  const readSpeed = (READ_SPEEDS as readonly number[]).includes(stored)
    ? stored
    : 1;
  const setSettings = useKanaStore((s) => s.setSettings);

  useEffect(() => {
    setPlaybackRate(readSpeed);
  }, [readSpeed]);

  useEffect(() => {
    return () => {
      gen.current += 1;
      stopSpeech();
    };
  }, []);

  if (words.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => {
          if (playing) {
            gen.current += 1;
            stopSpeech();
            setPlaying(false);
            onCurrent?.(-1);
            return;
          }
          const my = ++gen.current;
          unlockSpeech();
          setPlaybackRate(readSpeed);
          setPlaying(true);
          void readWordsAloud(words, (i) => {
            if (gen.current !== my) return;
            onCurrent?.(i);
          }).finally(() => {
            if (gen.current === my) {
              setPlaying(false);
              onCurrent?.(-1);
            }
          });
        }}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium",
          playing ? "bg-fg text-bg" : "bg-accent text-accent-fg",
        )}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        {playing ? "Stop" : "Read all"}
      </button>
      <div
        className="inline-flex min-h-11 overflow-hidden rounded-md border border-border"
        role="group"
        aria-label="Reading speed"
      >
        {READ_SPEEDS.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => {
              setSettings({ readSpeed: rate });
              setPlaybackRate(rate);
            }}
            className={cn(
              "min-h-11 min-w-11 px-2.5 text-sm",
              readSpeed === rate
                ? "bg-elevated text-fg"
                : "text-muted hover:text-fg",
            )}
          >
            {label(rate)}
          </button>
        ))}
      </div>
    </div>
  );
}
