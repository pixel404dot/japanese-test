import { Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { speakJapanese, unlockSpeech, type Voice } from "@/lib/speech";

export function SpeakButton({
  text,
  voice = "female",
  className,
}: {
  text: string;
  voice?: Voice;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      aria-label="Play pronunciation"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        unlockSpeech();
        setPlaying(true);
        void speakJapanese(text, voice).finally(() => setPlaying(false));
      }}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-elevated hover:text-fg",
        playing && "text-fg",
        className,
      )}
    >
      <Volume2 className="size-5" />
    </button>
  );
}
