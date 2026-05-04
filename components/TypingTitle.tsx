"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  titles: string[];
  color: string;
}

// How long each phase lasts (ms)
const TYPING_SPEED   = 55;   // ms per character typed
const DELETING_SPEED = 28;   // ms per character deleted
const PAUSE_AFTER    = 2200; // pause after fully typed
const PAUSE_BEFORE   = 350;  // pause before typing next

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export default function TypingTitle({ titles, color }: Props) {
  const [displayed, setDisplayed]   = useState("");
  const [phase,     setPhase]       = useState<Phase>("typing");
  const [titleIdx,  setTitleIdx]    = useState(0);
  const [charIdx,   setCharIdx]     = useState(0);

  // Keep a ref so the timeout callbacks always see fresh state
  const stateRef = useRef({ phase, titleIdx, charIdx, displayed });
  useEffect(() => {
    stateRef.current = { phase, titleIdx, charIdx, displayed };
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const s = stateRef.current;
      const target = titles[s.titleIdx];

      if (s.phase === "typing") {
        if (s.charIdx < target.length) {
          const next = target.slice(0, s.charIdx + 1);
          setDisplayed(next);
          setCharIdx(s.charIdx + 1);
          timeout = setTimeout(tick, TYPING_SPEED);
        } else {
          setPhase("pausing");
          timeout = setTimeout(tick, PAUSE_AFTER);
        }

      } else if (s.phase === "pausing") {
        setPhase("deleting");
        timeout = setTimeout(tick, 0);

      } else if (s.phase === "deleting") {
        if (s.displayed.length > 0) {
          const next = s.displayed.slice(0, -1);
          setDisplayed(next);
          timeout = setTimeout(tick, DELETING_SPEED);
        } else {
          setPhase("waiting");
          timeout = setTimeout(tick, PAUSE_BEFORE);
        }

      } else if (s.phase === "waiting") {
        const next = (s.titleIdx + 1) % titles.length;
        setTitleIdx(next);
        setCharIdx(0);
        setPhase("typing");
        timeout = setTimeout(tick, 0);
      }
    }

    timeout = setTimeout(tick, TYPING_SPEED);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, charIdx, titleIdx]);

  return (
    <span
      className="inline-flex items-center font-mono text-sm tracking-wider uppercase"
      aria-live="polite"
      aria-label={titles[titleIdx]}
    >
      <span style={{ color }}>{displayed}</span>

      {/* Blinking cursor */}
      <span
        className="ml-0.5 inline-block w-[2px] h-[1em] rounded-sm align-middle"
        style={{
          background: color,
          animation: "cursorBlink 1s step-end infinite",
          verticalAlign: "middle",
          position: "relative",
          top: "-1px",
        }}
      />

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
