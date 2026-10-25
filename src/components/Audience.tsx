"use client";

import { motion } from "framer-motion";
import { Check, ShoppingBag, Store, Wrench, type LucideIcon } from "lucide-react";
import { Item, SectionHeading, Stagger } from "./Reveal";

const AUDIENCE: { title: string; Icon: LucideIcon; color: string; points: string[] }[] = [
  {
    title: "Laptop Buyers",
    Icon: ShoppingBag,
    color: "#1E90FF",
    points: ["Check a used laptop before you pay", "Spot a worn battery or tired SSD", "Negotiate with real numbers"],
  },
  {
    title: "Laptop Sellers & Shops",
    Icon: Store,
    color: "#F59E0B",
    points: ["Build buyer trust with a certified report", "Sell refurbished stock faster", "Reduce returns and disputes"],
  },
  {
    title: "Service Centers",
    Icon: Wrench,
    color: "#22C55E",
    points: ["Diagnose faults in minutes", "Hand customers a clear before/after record", "One tool for every brand"],
  },
];

export default function Audience() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Who is it for"
        title={
          <>
            Built for people who <span className="text-gradient">need to know</span>
          </>
        }
      />
      <Stagger className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3" gap={0.12}>
        {AUDIENCE.map((a) => (
          <Item key={a.title} className="h-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass group h-full rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_var(--c)]"
              style={{ "--c": a.color } as React.CSSProperties}
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl"
                style={{
                  color: a.color,
                  background: `color-mix(in srgb, ${a.color} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${a.color} 40%, transparent)`,
                }}
              >
                <a.Icon size={28} aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{a.title}</h3>
              <ul className="mt-4 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                    <Check size={16} className="mt-0.5 shrink-0 text-fresh" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
