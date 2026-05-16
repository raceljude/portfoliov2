"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Props {
  isDark: boolean;
}

function formatDateTime(date: Date, timeZone: string): string {
  // day / month / year
  const day   = String(date.toLocaleString("en-US", { timeZone, day:   "2-digit" })).padStart(2, "0");
  const month = String(date.toLocaleString("en-US", { timeZone, month: "2-digit" })).padStart(2, "0");
  const year  = date.toLocaleString("en-US", { timeZone, year: "numeric" });

  // hours / minutes / seconds / ampm
  let hours   = parseInt(date.toLocaleString("en-US", { timeZone, hour:   "numeric", hour12: false }), 10);
  const mins  = String(date.toLocaleString("en-US", { timeZone, minute: "2-digit" })).padStart(2, "0");
  const secs  = String(date.toLocaleString("en-US", { timeZone, second: "2-digit" })).padStart(2, "0");
  const ampm  = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");

  return `${month}/${day}/${year} ${hh}:${mins}:${secs} ${ampm}`;
}

function getTimeZoneLabel(tz: string): string {
  // Return a short friendly label for the timezone
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    }).formatToParts(new Date());
    const tzName = parts.find(p => p.type === "timeZoneName")?.value ?? tz;
    return tzName;
  } catch {
    return tz;
  }
}

export default function LiveClock({ isDark }: Props) {
  const [now,      setNow]      = useState<Date | null>(null);
  const [timeZone, setTimeZone] = useState<string>("UTC");
  const [tzLabel,  setTzLabel]  = useState<string>("UTC");

  // Detect timezone once on mount (client-side only)
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(tz);
    setTzLabel(getTimeZoneLabel(tz));
    setNow(new Date());
  }, []);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const textMut  = isDark ? "#4a6a80"  : "#3a7a9c";
  const textPri  = isDark ? "#c8dce8"  : "#0d2233";
  const cardBg   = isDark ? "#0e1e2c"  : "#c8e4f2";
  const border   = isDark ? "#1e2a3a"  : "#a8cfe0";
  const dotColor = "#ffbf6b";
  const tzColor  = isDark ? "#398eb2"  : "#2277aa";

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs"
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        color: textPri,
        letterSpacing: "0.03em",
        transition: "background 0.3s, border-color 0.3s, color 0.3s",
      }}
      title={`Your local timezone: ${timeZone}`}
    >
      {/* Live pulse dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
        style={{ background: dotColor }}
      />

      {/* Clock icon */}
      <Clock size={11} style={{ color: textMut, flexShrink: 0 }} />

      {/* Time display — shows skeleton until hydrated */}
      <span style={{ color: textPri, minWidth: "175px", display: "inline-block" }}>
        {now
          ? formatDateTime(now, timeZone)
          : <span style={{ color: textMut }}>--/--/---- --:--:-- --</span>
        }
      </span>

      {/* Timezone badge */}
      <span
        className="px-1.5 py-0.5 rounded-md text-[10px]"
        style={{
          background: tzColor + "20",
          border: `1px solid ${tzColor}35`,
          color: tzColor,
          flexShrink: 0,
        }}
      >
        {tzLabel}
      </span>
    </div>
  );
}