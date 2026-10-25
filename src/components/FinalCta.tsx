"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Particles from "./Particles";
import { Item, Stagger } from "./Reveal";
import { SITE } from "@/lib/site";

export default function FinalCta() {
  return (
    <section id="download" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(30,144,255,0.55),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(34,197,94,0.4),transparent_55%),radial-gradient(ellipse_at_50%_50%,rgba(245,158,11,0.18),transparent_60%)]"
        />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <Particles count={18} seed={21} />

        <Stagger className="relative" gap={0.12}>
          <Item>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Test Before You <span className="text-gradient-warm">Trust</span>
            </h2>
          </Item>
          <Item>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-200 sm:text-lg">
              Get the full picture of any Windows laptop in about five minutes. Free, offline and
              no sign-up.
            </p>
          </Item>
          <Item>
            <motion.a
              href={SITE.downloadUrl}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-navy shadow-[0_10px_50px_-8px_rgba(255,255,255,0.55)] transition-shadow duration-300 hover:shadow-[0_10px_70px_0_rgba(255,255,255,0.8)] sm:text-lg"
            >
              <Download size={20} aria-hidden /> Download for Windows
            </motion.a>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}
