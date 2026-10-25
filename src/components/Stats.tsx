"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Item, Stagger } from "./Reveal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setN] = useState(0);
  const n = reduce ? to : count;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: <Counter to={12} suffix="+" />, label: "Tests" },
  { value: <Counter to={5} suffix=" min" />, label: "Full Scan" },
  { value: <Counter to={100} suffix="%" />, label: "Offline" },
  { value: <span className="text-gradient-warm shimmer">Free</span>, label: "Forever" },
];

export default function Stats() {
  return (
    <section aria-label="Key numbers" className="relative px-4 py-6 sm:px-6">
      <Stagger
        className="glass mx-auto grid max-w-5xl grid-cols-2 gap-y-8 rounded-3xl px-4 py-8 sm:px-8 md:grid-cols-4 md:divide-x md:divide-white/10"
        gap={0.1}
      >
        {STATS.map((s) => (
          <Item key={s.label} className="text-center">
            <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
              {s.label}
            </div>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
