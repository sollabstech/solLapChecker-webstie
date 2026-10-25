"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BatteryCharging, Check, Cpu, Gpu, HardDrive, Keyboard } from "lucide-react";

const CHECKS = [
  { label: "Battery", value: "94% health", Icon: BatteryCharging },
  { label: "SSD", value: "Wear 3%", Icon: HardDrive },
  { label: "CPU", value: "Max 78°C", Icon: Cpu },
  { label: "GPU", value: "Max 71°C", Icon: Gpu },
  { label: "Keyboard", value: "All keys OK", Icon: Keyboard },
] as const;

export default function LaptopMockup() {
  const reduce = useReducedMotion();
  const [step, setShown] = useState(0);
  const shown = reduce ? CHECKS.length : step;

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    const id = setInterval(() => {
      n = n >= CHECKS.length + 3 ? 0 : n + 1;
      setShown(Math.min(n, CHECKS.length));
    }, 750);
    return () => clearInterval(id);
  }, [reduce]);

  const pct = Math.round((shown / CHECKS.length) * 100);

  return (
    <div className="relative mx-auto w-full max-w-[560px] [perspective:1800px]">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full bg-electric/25 blur-[90px]"
      />
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="[transform-style:preserve-3d]"
          style={{ transform: "rotateY(-14deg) rotateX(7deg) rotateZ(1deg)" }}
        >
          {/* lid */}
          <div className="rounded-t-[22px] border border-white/15 bg-gradient-to-b from-slate-700 to-slate-900 p-[10px] pb-[8px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] sm:aspect-[16/10] bg-[#06142a] ring-1 ring-black/60">
              {/* screen content */}
              <div className="absolute inset-0 p-4 sm:p-5">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-fresh shadow-[0_0_8px_#22C55E]" />
                    SolLapChecker
                  </span>
                  <span>{shown === CHECKS.length ? "Scan complete" : "Scanning…"}</span>
                </div>

                <ul className="mt-3 space-y-1 sm:mt-3 sm:space-y-1.5 xl:mt-4 xl:space-y-2">
                  {CHECKS.map(({ label, value, Icon }, i) => {
                    const done = i < shown;
                    return (
                      <li
                        key={label}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-1 transition-colors duration-500 sm:py-1.5 xl:py-2 ${
                          done
                            ? "border-fresh/30 bg-fresh/10"
                            : "border-white/5 bg-white/[0.03]"
                        }`}
                      >
                        <Icon
                          size={16}
                          aria-hidden
                          className={done ? "text-fresh" : "text-slate-500"}
                        />
                        <span
                          className={`text-xs font-semibold sm:text-sm ${
                            done ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {label}
                        </span>
                        <span
                          className={`ml-auto text-[10px] text-slate-300 transition-opacity duration-500 sm:text-xs ${
                            done ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {value}
                        </span>
                        <span className="grid h-5 w-5 place-items-center">
                          {done ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 18 }}
                              className="grid h-5 w-5 place-items-center rounded-full bg-fresh text-navy-deep shadow-[0_0_12px_rgba(34,197,94,0.8)]"
                            >
                              <Check size={13} strokeWidth={3.5} aria-label="passed" />
                            </motion.span>
                          ) : (
                            <span className="h-3 w-3 animate-pulse rounded-full border border-slate-600" />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10 sm:mt-4">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-fresh"
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* scanning beam */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24"
                  initial={{ y: "-100%" }}
                  animate={{ y: ["-100%", "420%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
                >
                  <div className="h-full bg-gradient-to-b from-transparent via-electric/25 to-electric/50" />
                  <div className="h-[2px] bg-electric shadow-[0_0_18px_4px_rgba(30,144,255,0.9)]" />
                </motion.div>
              )}

              {/* glass glare */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* base */}
          <div className="relative mx-auto h-3.5 w-[108%] -translate-x-[3.7%] rounded-b-[18px] border-x border-b border-white/15 bg-gradient-to-b from-slate-600 to-slate-800 shadow-[0_30px_50px_-10px_rgba(0,0,0,0.8)]">
            <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-slate-900/80" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
