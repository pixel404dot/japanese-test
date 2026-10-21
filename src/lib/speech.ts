import { AUDIO_BN } from "./audio-bn";
import { AUDIO_FILES } from "./audio-files";
import { AUDIO_MALE } from "./audio-male";

export type Voice = "female" | "male";

const SPEAK_AS: Record<string, string> = {
  CD: "シーディー",
  ATM: "エーティーエム",
  JR: "ジェイアール",
  ABCストア: "エービーシーストア",
};

const SILENCE =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

let player: HTMLAudioElement | null = null;
let current: HTMLAudioElement | null = null;
let playId = 0;
let playbackRate = 1;
let unlocked = false;
let audioCtx: AudioContext | null = null;
let webSource: AudioBufferSourceNode | null = null;
const decoded = new Map<string, AudioBuffer>();

export const READ_SPEEDS = [0.5, 0.75, 1, 1.5, 2] as const;

export function setPlaybackRate(rate: number) {
  playbackRate = rate;
  if (current) applyRate(current);
}

export function getPlaybackRate() {
  return playbackRate;
}

function applyRate(a: HTMLAudioElement) {
  try {
    a.preservesPitch = true;
  } catch {
    /* ignore */
  }
  a.playbackRate = playbackRate;
}

function getPlayer(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!player) {
    player = new Audio();
    player.preload = "auto";
    player.setAttribute("playsinline", "true");
    player.setAttribute("webkit-playsinline", "true");
  }
  return player;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    audioCtx ??= new AC();
    return audioCtx;
  } catch {
    return null;
  }
}

function killSynth() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

function stopWeb() {
  if (!webSource) return;
  try {
    webSource.stop();
  } catch {
    /* ignore */
  }
  webSource.disconnect();
  webSource = null;
}

function lookup(map: Record<string, string>, text: string): string | undefined {
  const spoken = SPEAK_AS[text] ?? text;
  const stripped = spoken.replace(/[。？、！?…]/g, "");
  const packed = stripped.replace(/\s/g, "");
  return (
    map[spoken] ??
    map[text] ??
    map[stripped] ??
    map[packed] ??
    map[spoken.replace(/\s/g, "")]
  );
}

function audioUrl(text: string, voice: Voice = "female"): string | undefined {
  if (voice === "male") return lookup(AUDIO_MALE, text) ?? lookup(AUDIO_FILES, text);
  return lookup(AUDIO_FILES, text);
}

/** Call from a tap so later auto-play (listen quiz, auto-next) is allowed on iOS. */
export function unlockSpeech() {
  if (typeof window === "undefined") return;
  const ctx = getCtx();
  if (ctx && ctx.state === "suspended") void ctx.resume();
  const a = getPlayer();
  if (!a || unlocked) return;
  try {
    if (!a.src) a.src = SILENCE;
    a.muted = true;
    const req = a.play();
    if (req) {
      void req
        .then(() => {
          a.pause();
          a.muted = false;
          a.currentTime = 0;
          unlocked = true;
        })
        .catch(() => {
          a.muted = false;
        });
    } else {
      a.muted = false;
    }
  } catch {
    a.muted = false;
  }
}

export function warmupSpeech() {
  unlockSpeech();
  killSynth();
}

export function stopSpeech() {
  playId += 1;
  const a = current;
  current = null;
  if (a) {
    a.onended = null;
    a.onerror = null;
    a.onpause = null;
    a.oncanplay = null;
    a.oncanplaythrough = null;
    a.pause();
  }
  stopWeb();
  killSynth();
}

async function playViaWeb(url: string, token: number): Promise<boolean> {
  const ctx = getCtx();
  if (!ctx || playId !== token) return false;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }
  if (playId !== token) return false;
  try {
    let buf = decoded.get(url);
    if (!buf) {
      const res = await fetch(url);
      const raw = await res.arrayBuffer();
      if (playId !== token) return false;
      buf = await ctx.decodeAudioData(raw.slice(0));
      decoded.set(url, buf);
    }
    if (playId !== token) return false;
    stopWeb();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = playbackRate;
    src.connect(ctx.destination);
    webSource = src;
    await new Promise<void>((resolve) => {
      src.onended = () => {
        if (webSource === src) webSource = null;
        resolve();
      };
      try {
        src.start();
      } catch {
        resolve();
      }
    });
    return playId === token;
  } catch {
    return false;
  }
}

function playViaElement(url: string, token: number): Promise<boolean> {
  const a = getPlayer();
  if (!a || playId !== token) return Promise.resolve(false);
  current = a;

  return new Promise((resolve) => {
    let settled = false;
    let started = false;

    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (playId === token) {
        a.onended = null;
        a.onerror = null;
        a.oncanplay = null;
        a.oncanplaythrough = null;
      }
      resolve(ok);
    };

    const tryPlay = (attempt: number) => {
      if (playId !== token || settled) {
        done(false);
        return;
      }
      applyRate(a);
      const req = a.play();
      if (!req) {
        done(false);
        return;
      }
      void req
        .then(() => {
          if (playId !== token) {
            done(false);
            return;
          }
          started = true;
          unlocked = true;
          applyRate(a);
          killSynth();
        })
        .catch(() => {
          if (playId !== token || settled) {
            done(false);
            return;
          }
          if (attempt < 2) {
            window.setTimeout(() => tryPlay(attempt + 1), 100 * (attempt + 1));
            return;
          }
          done(false);
        });
    };

    a.onended = () => {
      if (playId === token) done(true);
    };
    a.onerror = () => {
      if (!started) done(false);
    };
    a.oncanplay = () => tryPlay(0);

    a.pause();
    a.muted = false;
    a.src = url;
    try {
      a.load();
    } catch {
      /* ignore */
    }
    if (a.readyState >= 2) tryPlay(0);
    else {
      window.setTimeout(() => {
        if (!started && !settled) {
          if (a.readyState >= 2) tryPlay(0);
          else done(false);
        }
      }, 800);
    }
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function speakSynth(text: string, token: number): Promise<void> {
  return speakSynthLang(text, token, "ja-JP", Math.min(1.1, Math.max(0.7, playbackRate)));
}

function speakSynthLang(
  text: string,
  token: number,
  lang: string,
  rate: number,
): Promise<void> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve();
  }
  const spoken = SPEAK_AS[text] ?? text;
  return new Promise((resolve) => {
    if (playId !== token) {
      resolve();
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const u = new SpeechSynthesisUtterance(spoken);
    u.lang = lang;
    u.rate = rate;
    u.onend = finish;
    u.onerror = finish;
    window.setTimeout(finish, 12000);
    try {
      window.speechSynthesis.speak(u);
    } catch {
      finish();
    }
  });
}

/** One cue in a grammar lesson. Japanese uses a saved clip when we have one. */
export async function speakCue(
  text: string,
  lang: "ja-JP" | "bn-BD" | "en",
): Promise<void> {
  playId += 1;
  const token = playId;
  stopWeb();
  killSynth();
  const ctx = getCtx();
  if (ctx?.state === "suspended") void ctx.resume();
  if (lang === "ja-JP") {
    const url = audioUrl(text) ?? audioUrl(text.replace(/\s/g, ""));
    if (url && (await playUrl(url, token))) return;
  }
  if (playId !== token) return;
  const synthLang = lang === "bn-BD" ? "bn-BD" : lang === "en" ? "en-US" : "ja-JP";
  await speakSynthLang(text, token, synthLang, playbackRate);
}

async function playUrl(url: string, token: number): Promise<boolean> {
  if (playId !== token) return false;
  if (await playViaElement(url, token)) return true;
  if (playId !== token) return false;
  const a = getPlayer();
  if (a) {
    a.pause();
  }
  return playViaWeb(url, token);
}

export async function speakJapanese(text: string, voice: Voice = "female"): Promise<void> {
  playId += 1;
  const token = playId;
  stopWeb();
  killSynth();
  const ctx = getCtx();
  if (ctx?.state === "suspended") void ctx.resume();
  const url = audioUrl(text, voice) ?? audioUrl(text.replace(/\s/g, ""), voice);
  if (url) {
    const ok = await playUrl(url, token);
    if (!ok && playId === token) await speakSynth(text, token);
    return;
  }
  await speakSynth(text, token);
}

export async function speakBangla(text: string): Promise<void> {
  playId += 1;
  const token = playId;
  stopWeb();
  killSynth();
  const url = lookup(AUDIO_BN, text);
  if (!url) return;
  await playUrl(url, token);
}

export async function readWordsAloud(
  words: { jp: string; bn: string }[],
  onCurrent?: (index: number) => void,
): Promise<void> {
  playId += 1;
  const token = playId;
  stopWeb();
  killSynth();
  for (let i = 0; i < words.length; i++) {
    if (playId !== token) return;
    const word = words[i]!;
    onCurrent?.(i);
    const ja = audioUrl(word.jp);
    if (ja) await playUrl(ja, token);
    else await speakSynth(word.jp, token);
    if (playId !== token) return;
    await sleep(Math.round(280 / playbackRate));
    if (playId !== token) return;
    const bn = lookup(AUDIO_BN, word.bn);
    if (bn) await playUrl(bn, token);
    if (playId !== token) return;
    await sleep(Math.round(520 / playbackRate));
  }
}
