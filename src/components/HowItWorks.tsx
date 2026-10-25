"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download, FileCheck2, ScanLine, type LucideIcon } from "lucide-react";
import { Item, SectionHeading, Stagger } from "./Reveal";

const STEPS: { n: string; title: string; desc: string; Icon: LucideIcon; color: string }[] = [
  {
    n: "01",
    title: "Download",
    desc: "Get SolLapChecker for Windows. It's free, and it runs offline with no account.",
    Icon: Download,
    color: "#1E90FF",
  },
  {
    n: "02",
    title: "Run Full Scan",
    desc: "One click starts the tests. Follow the prompts for keyboard, touchpad, camera and audio.",
    Icon: ScanLine,
    color: "#F59E0B",
  },
  {
    n: "03",
    title: "Get Certified Report",
    desc: "Receive a clear health score and grade in one report you can save, print and share.",
    Icon: FileCheck2,
    color: "#22C55E",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="how-it-works" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From download to report in <span className="text-gradient">3 steps</span>
          </>
        }
      />

      <div ref={ref} className="relative mx-auto mt-16 max-w-6xl">
        {/* connecting line: horizontal on md+, vertical on mobile */}
        <div aria-hidden className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-0.5 bg-white/10 max-md:block" />
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-0.5 origin-top bg-gradient-to-b from-electric via-gold to-fresh shadow-[0_0_12px_rgba(30,144,255,0.8)] max-md:block"
        />
        <div aria-hidden className="absolute left-[16.7%] right-[16.7%] top-[27px] hidden h-0.5 bg-white/10 md:block" />
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute left-[16.7%] right-[16.7%] top-[27px] hidden h-0.5 origin-left bg-gradient-to-r from-electric via-gold to-fresh shadow-[0_0_12px_rgba(30,144,255,0.8)] md:block"
        />

        <Stagger className="relative grid gap-10 md:grid-cols-3 md:gap-6" gap={0.18}>
          {STEPS.map((s) => (
            <Item key={s.n} className="flex gap-5 md:flex-col md:items-center md:text-center">
              <motion.div
                whileHover={{ scale: 1.12, rotate: -4 }}
                className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-navy shadow-lg"
                style={{
                  color: s.color,
                  borderColor: `color-mix(in srgb, ${s.color} 55%, transparent)`,
                  boxShadow: `0 0 30px color-mix(in srgb, ${s.color} 35%, transparent)`,
                }}
              >
                <s.Icon size={26} aria-hidden />
              </motion.div>
              <div className="md:mt-6">
                <div className="text-xs font-bold tracking-[0.25em]" style={{ color: s.color }}>
                  STEP {s.n}
                </div>
                <h3 className="mt-1.5 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
