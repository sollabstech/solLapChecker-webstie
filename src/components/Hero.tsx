"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import LaptopMockup from "./LaptopMockup";
import Particles from "./Particles";
import { Item, Stagger } from "./Reveal";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-electric/20 blur-[140px]"
      />
      <Particles />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <Stagger className="text-center lg:text-left" gap={0.12} viewport={{ once: true }}>
          <Item>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-200 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-fresh shadow-[0_0_10px_#22C55E]" />
              Free · 100% offline · Windows
            </span>
          </Item>
          <Item>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Know Your Laptop&apos;s <span className="text-gradient">True Health</span> in Minutes
            </h1>
          </Item>
          <Item>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:mx-0">
              Battery, SSD, CPU, GPU, keyboard, touchpad, webcam, speakers and mic — fully tested.
              One certified report.
            </p>
          </Item>
          <Item className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href={SITE.downloadUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-[#3aa6ff] px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_40px_-8px_rgba(30,144,255,0.8)] transition-shadow duration-300 hover:shadow-[0_10px_60px_-4px_rgba(30,144,255,1)] sm:w-auto"
            >
              <Download size={18} aria-hidden /> Download for Windows
            </motion.a>
            <motion.a
              href={SITE.sampleReportUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-electric/70 hover:bg-electric/10 sm:w-auto"
            >
              See Sample Report
              <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Item>
          <Item className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 lg:justify-start">
            <ShieldCheck size={16} className="text-fresh" aria-hidden />
            No sign-up. No internet needed. Runs entirely on your PC.
          </Item>
        </Stagger>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <LaptopMockup />
        </motion.div>
      </div>
    </section>
  );
}
