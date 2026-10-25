"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Item, SectionHeading, Stagger } from "./Reveal";
import { FAQS } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="text-gradient">answered</span>
          </>
        }
      />
      <Stagger className="mx-auto mt-12 max-w-3xl space-y-3" gap={0.08}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Item key={f.q}>
              <div
                className={`glass overflow-hidden rounded-2xl transition-colors duration-300 ${
                  isOpen ? "border-electric/40" : "hover:border-white/20"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-white sm:text-lg"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isOpen ? "bg-electric text-white" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      <Plus size={18} aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Item>
          );
        })}
      </Stagger>
    </section>
  );
}
