"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export function Reveal({
  delay = 0,
  className,
  children,
  ...rest
}: { delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  gap = 0.08,
  delay = 0,
  className,
  children,
  ...rest
}: { gap?: number; delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(gap, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Item({ className, children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <Stagger className="mx-auto max-w-2xl text-center" gap={0.1}>
      <Item>
        <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-electric">
          {eyebrow}
        </span>
      </Item>
      <Item>
        <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Item>
      {sub && (
        <Item>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{sub}</p>
        </Item>
      )}
    </Stagger>
  );
}
