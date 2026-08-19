import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-G0otvq4O.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function shuffle(items) {
	const next = [...items];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}
function speakJa(text) {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	window.speechSynthesis.cancel();
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "ja-JP";
	utterance.rate = .85;
	const ja = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("ja"));
	if (ja) utterance.voice = ja;
	window.speechSynthesis.speak(utterance);
}
//#endregion
export { shuffle as n, speakJa as r, cn as t };
