"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Flame, RotateCcw } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

type Key = { l: string; w?: number };

const ROWS: Key[][] = [
  ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((l) => ({ l, w: 1 })),
  [
    ..."`1234567890-=".split("").map((l) => ({ l })),
    { l: "⌫", w: 1.8 },
  ],
  [{ l: "Tab", w: 1.5 }, ..."QWERTYUIOP[]".split("").map((l) => ({ l })), { l: "\\", w: 1.3 }],
  [{ l: "Caps", w: 1.8 }, ..."ASDFGHJKL;'".split("").map((l) => ({ l })), { l: "Enter", w: 2 }],
  [{ l: "Shift", w: 2.3 }, ..."ZXCVBNM,./".split("").map((l) => ({ l })), { l: "Shift", w: 2.7 }],
  [
    { l: "Ctrl", w: 1.3 },
    { l: "Fn", w: 1.1 },
    { l: "Win", w: 1.1 },
    { l: "Alt", w: 1.2 },
    { l: "", w: 6.2 },
    { l: "Alt", w: 1.2 },
    { l: "Ctrl", w: 1.3 },
  ],
];

function KeyboardIllustration() {
  return (
    <div
      role="img"
      aria-label="Keyboard layout with keys lighting up green in a wave"
      className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:p-4"
    >
      <div className="space-y-1 sm:space-y-1.5">
        {ROWS.map((row, r) => {
          let col = 0;
          return (
            <div key={r} className="flex gap-1 sm:gap-1.5">
              {row.map((k, i) => {
                const delay = (col * 0.09 + r * 0.14).toFixed(2);
                col += k.w ?? 1;
                return (
                  <div
                    key={i}
                    className="key flex h-6 items-center justify-center rounded-[5px] border text-[8px] font-semibold sm:h-9 sm:rounded-md sm:text-[11px]"
                    style={{ flex: k.w ?? 1, "--kd": `${delay}s` } as React.CSSProperties}
                    aria-hidden
                  >
                    {k.l}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const W = 600;
const H = 220;
const POINTS = 90;
const MAX_T = 95;
const MIN_T = 30;

function nextTemp(step: number): number {
  // warm-up curve that eases toward ~86°C and then hovers there
  const base = 38 + 48 * (1 - Math.exp(-step / 22));
  return base + (Math.random() - 0.5) * 2.2;
}

function TempGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [temps, setTemps] = useState<number[]>(() =>
    reduce ? Array.from({ length: POINTS }, (_, i) => nextTemp(i)) : [38]
  );
  const [run, setRun] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      stepRef.current += 1;
      setTemps((t) => {
        // restart the test after it has been at its peak for a while
        if (stepRef.current > POINTS + 40) {
          stepRef.current = 0;
          return [38];
        }
        const next = [...t, nextTemp(stepRef.current)];
        return next.length > POINTS ? next.slice(next.length - POINTS) : next;
      });
    }, 110);
    return () => clearInterval(id);
  }, [inView, reduce, run]);

  const current = temps[temps.length - 1];
  const peak = Math.max(...temps);
  const x = (i: number) => (i / (POINTS - 1)) * W;
  const y = (v: number) => H - ((v - MIN_T) / (MAX_T - MIN_T)) * H;
  const line = temps.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(temps.length - 1).toFixed(1)},${H} L0,${H} Z`;
  const hot = current > 80;

  return (
    <div ref={ref} className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Flame size={18} className={hot ? "text-gold" : "text-electric"} aria-hidden />
          CPU Stress Test
          <span className="rounded-full bg-fresh/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fresh">
            Live
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            stepRef.current = 0;
            setTemps([38]);
            setRun((r) => r + 1);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-electric/60 hover:bg-electric/10 active:scale-95"
        >
          <RotateCcw size={13} aria-hidden /> Restart test
        </button>
      </div>

      <div className="mt-4 flex items-end gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Current</div>
          <div className={`text-4xl font-extrabold tabular-nums ${hot ? "text-gold" : "text-white"}`}>
            {current.toFixed(0)}°C
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Max</div>
          <div className="text-2xl font-bold tabular-nums text-slate-200">{peak.toFixed(0)}°C</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Throttling</div>
          <div className="text-lg font-bold text-fresh">None</div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-5 h-auto w-full"
        role="img"
        aria-label="Live CPU temperature graph rising during a stress test"
      >
        <defs>
          <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tempStroke" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {[40, 55, 70, 85].map((t) => (
          <g key={t}>
            <line x1="0" x2={W} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.07)" strokeDasharray="4 6" />
            <text x="4" y={y(t) - 4} fontSize="10" fill="rgba(142,163,192,0.8)">
              {t}°
            </text>
          </g>
        ))}
        <path d={area} fill="url(#tempFill)" />
        <path d={line} fill="none" stroke="url(#tempStroke)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(temps.length - 1)} cy={y(current)} r="5" fill="#F59E0B" />
        <circle cx={x(temps.length - 1)} cy={y(current)} r="11" fill="#F59E0B" opacity="0.25" />
      </svg>
    </div>
  );
}

export default function Demo() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fresh/10 blur-[130px]"
      />
      <SectionHeading
        eyebrow="See it in action"
        title={
          <>
            Watch the tests <span className="text-gradient">come alive</span>
          </>
        }
        sub="Each key lights up as it's pressed. Temperatures are tracked live while the CPU and GPU are pushed hard."
      />
      <div className="relative mx-auto mt-14 grid max-w-6xl items-start gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="mb-3 text-sm font-semibold text-slate-300">Keyboard test</div>
          <KeyboardIllustration />
        </Reveal>
        <Reveal delay={0.12}>
          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
            <TempGraph />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
