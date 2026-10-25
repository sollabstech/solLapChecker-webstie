"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";
import Logo from "./Logo";
import { Reveal, SectionHeading } from "./Reveal";

const SCORE = 92;
const R = 52;
const C = 2 * Math.PI * R;

const RESULTS = [
  ["Battery", "94% of design capacity · 212 cycles"],
  ["SSD", "SMART OK · wear 3% · 1,240 h"],
  ["CPU", "Max 78°C · no throttling"],
  ["GPU", "Max 71°C"],
  ["Keyboard & touchpad", "All keys and gestures OK"],
  ["Webcam, speakers & mic", "Working"],
];

// Decorative QR-style pattern (not a scannable code).
function QrMock() {
  const size = 21;
  let s = 11;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!inFinder(x, y) && rnd() > 0.52) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
      }
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`f${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" fill="#0B1F3A" shapeRendering="crispEdges" aria-hidden>
      {cells}
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
    </svg>
  );
}

export default function ReportPreview() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-120px" });

  // score ring
  const score = useMotionValue(reduce ? SCORE : 0);
  const dash = useTransform(score, (v) => C - (v / 100) * C);
  const [shown, setShown] = useState(reduce ? SCORE : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(score, SCORE, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    const unsub = score.on("change", (v) => setShown(Math.round(v)));
    return () => {
      c.stop();
      unsub();
    };
  }, [inView, reduce, score]);

  // tilt on mouse move
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="report" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[130px]"
      />
      <SectionHeading
        eyebrow="The report"
        title={
          <>
            One report. <span className="text-gradient">Zero guesswork.</span>
          </>
        }
        sub="Every result, a health score and a grade, on a single page you can save, print or share with a buyer."
      />

      <Reveal className="relative mx-auto mt-14 max-w-[560px] [perspective:1400px]">
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-2xl bg-slate-50 p-6 text-navy shadow-[0_40px_100px_-20px_rgba(30,144,255,0.5)] sm:p-8"
        >
          <span className="absolute right-4 top-4 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
            Sample
          </span>

          <header className="flex items-center gap-3 border-b border-slate-200 pb-5">
            <Logo size={44} />
            <div>
              <h3 className="text-base font-extrabold leading-tight sm:text-lg">
                SolLapChecker Report
              </h3>
              <p className="flex items-center gap-1 text-xs font-semibold text-fresh sm:text-sm">
                <BadgeCheck size={15} aria-hidden /> Certified by Sollabs Tech
              </p>
            </div>
          </header>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
            <div className="relative mx-auto grid h-36 w-36 place-items-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="60" cy="60" r={R} fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  style={{ strokeDashoffset: dash }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E90FF" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <div className="text-4xl font-extrabold tabular-nums">{shown}%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Health score
                </div>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <motion.div
                initial={reduce ? false : { scale: 0, rotate: -20 }}
                animate={inView || reduce ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.6 }}
                className="inline-flex items-center gap-2 rounded-xl bg-fresh px-4 py-2 text-white shadow-[0_8px_24px_-6px_rgba(34,197,94,0.8)]"
              >
                <span className="text-2xl font-extrabold">Grade A</span>
                <Check size={22} strokeWidth={3} aria-hidden />
              </motion.div>
              <p className="mt-3 text-sm text-slate-600">
                Excellent condition. All hardware tests passed.
              </p>
            </div>
          </div>

          <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {RESULTS.map(([k, v]) => (
              <li key={k} className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fresh/15 text-fresh">
                  <Check size={13} strokeWidth={3.5} aria-hidden />
                </span>
                <span className="font-semibold">{k}</span>
                <span className="ml-auto text-right text-slate-500">{v}</span>
              </li>
            ))}
          </ul>

          <footer className="mt-6 flex items-center justify-between gap-4">
            <div className="text-xs leading-relaxed text-slate-500">
              <div className="font-semibold text-navy">Verify this report</div>
              Scan the QR code to confirm authenticity.
            </div>
            <div className="h-20 w-20 shrink-0 rounded-lg border border-slate-200 bg-white p-1.5">
              <QrMock />
            </div>
          </footer>
        </motion.div>
      </Reveal>
    </section>
  );
}
