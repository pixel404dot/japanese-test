import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  GRAMMAR_POINTS,
  getGrammarPoint,
  grammarCues,
  grammarId,
  type GrammarCue,
} from "@/lib/grammar";
import { setPlaybackRate, speakCue, stopSpeech } from "@/lib/speech";

export const Route = createFileRoute("/grammar/$pointId")({
  component: GrammarPointPage,
});

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function GrammarPointPage() {
  const { pointId } = Route.useParams();
  const point = getGrammarPoint(pointId);
  if (!point) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">Grammar point not found</p>
        <Button asChild variant="secondary">
          <Link to="/grammar">Back to grammar</Link>
        </Button>
      </main>
    );
  }
  return <Player key={point.n} n={point.n} />;
}

function Player({ n }: { n: number }) {
  const point = GRAMMAR_POINTS.find((item) => item.n === n)!;
  const cues = useMemo(() => grammarCues(point), [point]);
  const id = grammarId(point.n);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [voiced, setVoiced] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startsRef = useRef<number[]>([]);
  const run = useRef(0);
  const meaningOn = useRef(true);
  meaningOn.current = showMeaning;

  useEffect(() => {
    const audio = new Audio(`/audio/grammar/${id}.mp3`);
    audio.preload = "auto";
    audioRef.current = audio;
    let alive = true;
    const onTime = () => {
      setTime(audio.currentTime);
      const starts = startsRef.current;
      if (starts.length === 0) return;
      let next = 0;
      for (let i = 0; i < starts.length; i++) {
        if (starts[i]! <= audio.currentTime + 0.08) next = i;
      }
      setIndex(next);
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => setPlaying(false);
    const onReady = () => {
      if (alive && audio.readyState >= 1) setVoiced(true);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("canplay", onReady);
    void fetch(`/audio/grammar/${id}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { starts?: number[]; duration?: number } | null) => {
        if (!alive || !data?.starts?.length) return;
        startsRef.current = data.starts;
        setVoiced(true);
        if (data.duration) setDuration(data.duration);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      run.current += 1;
      audio.pause();
      audio.src = "";
      stopSpeech();
    };
  }, [id]);

  useEffect(() => {
    document.getElementById(`cue-${index}`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  function speakFrom(from: number) {
    run.current += 1;
    const token = run.current;
    stopSpeech();
    const start = Math.max(0, Math.min(from, cues.length - 1));
    setIndex(start);
    setPlaying(true);
    void (async () => {
      for (let i = start; i < cues.length; i++) {
        if (run.current !== token) return;
        setIndex(i);
        const cue = cues[i]!;
        if (cue.jp) await speakCue(cue.jp, "ja-JP");
        if (run.current !== token) return;
        if (meaningOn.current && cue.bn) await speakCue(cue.bn, "bn-BD");
        if (run.current !== token) return;
        if (meaningOn.current && cue.en) await speakCue(cue.en, "en");
      }
      if (run.current === token) setPlaying(false);
    })();
  }

  function playFrom(from: number) {
    const audio = audioRef.current;
    const starts = startsRef.current;
    if (!audio || !voiced || starts.length === 0) {
      speakFrom(from);
      return;
    }
    run.current += 1;
    stopSpeech();
    const start = Math.max(0, Math.min(from, starts.length - 1));
    audio.playbackRate = speed;
    audio.currentTime = starts[start] ?? 0;
    void audio.play();
    setIndex(start);
    setPlaying(true);
  }

  function pause() {
    run.current += 1;
    stopSpeech();
    audioRef.current?.pause();
    setPlaying(false);
  }

  function seekSeconds(next: number) {
    const audio = audioRef.current;
    if (!audio || !voiced) return;
    audio.currentTime = Math.max(0, Math.min(next, duration || audio.duration || next));
    setTime(audio.currentTime);
    if (playing) void audio.play();
  }

  const prev = GRAMMAR_POINTS.find((item) => item.n === point.n - 1);
  const nextPoint = GRAMMAR_POINTS.find((item) => item.n === point.n + 1);
  const active = cues[index] ?? cues[0];
  const clock = voiced ? `${fmt(time)} / ${fmt(duration)}` : `${index + 1}/${cues.length}`;

  return (
    <main className="page">
      <Link
        to="/grammar/phase/$phaseId"
        params={{ phaseId: String(point.phase) }}
        className="back-link"
      >
        <ChevronLeft className="size-3.5" />
        Phase {point.phase}
      </Link>
      <p className="kicker mt-4">
        Phase {String(point.phase).padStart(2, "0")} · {String(point.n).padStart(3, "0")}
      </p>
      <h1 className="mt-2 font-kana text-4xl tracking-tight sm:text-5xl">{point.pattern}</h1>

      <section className="panel mt-6 px-5 py-8 text-center">
        <p className="kicker">Lesson</p>
        <p className="mt-4 font-kana text-3xl leading-snug sm:text-4xl">
          {active?.jp ?? point.pattern}
        </p>
        {showMeaning && active?.bn ? (
          <p className="mx-auto mt-4 max-w-md font-bn text-sm text-muted">{active.bn}</p>
        ) : null}
        {showMeaning && active?.en ? (
          <p className="mx-auto mt-2 max-w-md text-sm text-subtle">{active.en}</p>
        ) : null}
      </section>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => (playing ? pause() : playFrom(index))}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-fg"
        >
          {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
        </button>
        <span className="w-16 shrink-0 text-xs tabular-nums text-muted">{clock}</span>
        <input
          type="range"
          min={0}
          max={voiced ? Math.max(duration, 0.1) : Math.max(0, cues.length - 1)}
          step={voiced ? 0.1 : 1}
          value={voiced ? time : index}
          aria-label="Lesson position"
          className="min-w-0 flex-1 accent-[var(--seal)]"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (voiced) seekSeconds(value);
            else if (playing) playFrom(value);
            else setIndex(value);
          }}
        />
        <select
          aria-label="Playback speed"
          value={speed}
          className="h-11 rounded-full bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]"
          onChange={(e) => {
            const rate = Number(e.target.value) as (typeof SPEEDS)[number];
            setSpeed(rate);
            setPlaybackRate(rate);
            if (audioRef.current) audioRef.current.playbackRate = rate;
          }}
        >
          {SPEEDS.map((rate) => (
            <option key={rate} value={rate}>
              {rate.toFixed(2).replace(/0$/, "")}×
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Control label="Repeat" onClick={() => playFrom(0)} />
        <Control
          label="Back"
          onClick={() => (voiced ? seekSeconds(time - 5) : playing ? playFrom(index - 1) : setIndex((i) => Math.max(0, i - 1)))}
        />
        <Control
          label="Forward"
          onClick={() =>
            voiced
              ? seekSeconds(time + 5)
              : playing
                ? playFrom(index + 1)
                : setIndex((i) => Math.min(cues.length - 1, i + 1))
          }
        />
        <Control
          label={showMeaning ? "Hide meaning" : "Show meaning"}
          pressed={showMeaning}
          onClick={() => setShowMeaning((open) => !open)}
        />
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-xl">Script</h2>
          <p className="text-sm text-subtle">{voiced ? "Grok" : "Follows the audio"}</p>
        </div>
        <div className="catalog">
          {cues.map((cue, i) => (
            <CueRow
              key={`${point.n}-${i}`}
              id={`cue-${i}`}
              cue={cue}
              on={i === index}
              showMeaning={showMeaning}
              onPick={() => (playing ? playFrom(i) : setIndex(i))}
            />
          ))}
        </div>
      </section>

      <div className="mt-8 grid grid-cols-3 gap-2 text-sm">
        {prev ? (
          <Link
            to="/grammar/$pointId"
            params={{ pointId: grammarId(prev.n) }}
            className="panel flex min-h-16 items-center gap-1 p-3 no-underline"
          >
            <ChevronLeft className="size-4 shrink-0 text-subtle" />
            <span className="min-w-0 truncate font-kana">{prev.pattern}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          to="/grammar/phase/$phaseId"
          params={{ phaseId: String(point.phase) }}
          className="panel grid min-h-16 place-items-center p-3 text-center text-muted no-underline"
        >
          List
        </Link>
        {nextPoint ? (
          <Link
            to="/grammar/$pointId"
            params={{ pointId: grammarId(nextPoint.n) }}
            className="panel flex min-h-16 items-center justify-end gap-1 p-3 text-right no-underline"
          >
            <span className="min-w-0 truncate font-kana">{nextPoint.pattern}</span>
            <ChevronRight className="size-4 shrink-0 text-subtle" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}

function Control({
  label,
  onClick,
  pressed,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-3 text-sm shadow-[var(--shadow-border)]",
        pressed ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
      )}
    >
      {label}
    </button>
  );
}

function CueRow({
  id,
  cue,
  on,
  showMeaning,
  onPick,
}: {
  id: string;
  cue: GrammarCue;
  on: boolean;
  showMeaning: boolean;
  onPick: () => void;
}) {
  if (!showMeaning && !cue.jp) return null;
  return (
    <button
      id={id}
      type="button"
      onClick={onPick}
      className={cn("catalog-row w-full text-left", on && "bg-accent/10")}
    >
      <span className="min-w-0 flex-1">
        {cue.jp ? <span className="block font-kana text-lg leading-snug text-fg">{cue.jp}</span> : null}
        {showMeaning && cue.bn ? (
          <span className="mt-1 block font-bn text-sm text-muted">{cue.bn}</span>
        ) : null}
        {showMeaning && cue.en ? (
          <span className="mt-1 block text-sm text-subtle">{cue.en}</span>
        ) : null}
      </span>
    </button>
  );
}
