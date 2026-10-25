"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  AudioLines,
  BatteryCharging,
  Cpu,
  Gpu,
  HardDrive,
  Keyboard,
  Touchpad,
  Webcam,
  type LucideIcon,
} from "lucide-react";
import { Item, SectionHeading, Stagger } from "./Reveal";

const FEATURES: { title: string; desc: string; Icon: LucideIcon; color: string }[] = [
  {
    title: "Battery Health",
    desc: "Design vs current capacity and charge cycle count, so you know exactly how much life is left.",
    Icon: BatteryCharging,
    color: "#22C55E",
  },
  {
    title: "SSD Health",
    desc: "Reads SMART data: wear percentage, power-on hours and drive status.",
    Icon: HardDrive,
    color: "#1E90FF",
  },
  {
    title: "CPU Stress Test",
    desc: "Pushes the processor to the limit and records max temperature and any throttling.",
    Icon: Cpu,
    color: "#F59E0B",
  },
  {
    title: "GPU Stress Test",
    desc: "Loads the graphics chip and tracks its maximum temperature under pressure.",
    Icon: Gpu,
    color: "#1E90FF",
  },
  {
    title: "Built-in Keyboard Test",
    desc: "Press every key and watch it light up on a visual layout. Dead keys can't hide.",
    Icon: Keyboard,
    color: "#22C55E",
  },
  {
    title: "Touchpad Test",
    desc: "Verify left and right click, tap and scroll in one quick check.",
    Icon: Touchpad,
    color: "#F59E0B",
  },
  {
    title: "Webcam Test",
    desc: "A live preview shows instantly whether the camera works and looks right.",
    Icon: Webcam,
    color: "#1E90FF",
  },
  {
    title: "Speaker & Mic Test",
    desc: "Check left and right channels, then record and play back to test the mic.",
    Icon: AudioLines,
    color: "#22C55E",
  },
];

function FeatureCard({ f }: { f: (typeof FEATURES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Item className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative h-full overflow-hidden rounded-2xl p-px"
        style={{ "--c": f.color } as React.CSSProperties}
      >
        {/* glow border that follows the cursor */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), var(--c), transparent 70%)",
          }}
        />
        <div className="glass relative h-full rounded-2xl bg-navy-soft/80 p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--c) 14%, transparent), transparent 70%)",
            }}
          />
          <div
            className="relative grid h-12 w-12 place-items-center rounded-xl border transition-shadow duration-300 group-hover:shadow-[0_0_28px_var(--c)]"
            style={{
              color: f.color,
              borderColor: `color-mix(in srgb, ${f.color} 40%, transparent)`,
              background: `color-mix(in srgb, ${f.color} 12%, transparent)`,
            }}
          >
            <f.Icon size={24} aria-hidden />
          </div>
          <h3 className="relative mt-5 text-lg font-bold text-white">{f.title}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.desc}</p>
        </div>
      </motion.div>
    </Item>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Features"
        title={
          <>
            Every part of your laptop, <span className="text-gradient">tested</span>
          </>
        }
        sub="Eight deep checks that cover the hardware buyers and repair shops worry about most."
      />
      <Stagger
        className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
        gap={0.07}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} f={f} />
        ))}
      </Stagger>
    </section>
  );
}
