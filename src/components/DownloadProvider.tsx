"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Download, ExternalLink, ShieldCheck, X } from "lucide-react";
import { DOWNLOAD_URL, INSTALLER_FILE, RELEASE_NOTES_URL } from "@/lib/download";
import { formatReleaseDate, useLatestRelease } from "@/lib/useLatestRelease";

type Ctx = {
  /** Put on every Download link: the browser starts the file download, then the help panel opens. */
  onDownloadClick: () => void;
};

const DownloadCtx = createContext<Ctx>({ onDownloadClick: () => {} });

export const useDownload = () => useContext(DownloadCtx);

export default function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  // Opened just after the click so the browser's own download handling runs first.
  const onDownloadClick = useCallback(() => {
    window.setTimeout(() => setOpen(true), 150);
  }, []);

  return (
    <DownloadCtx.Provider value={{ onDownloadClick }}>
      {children}
      <DownloadStarted open={open} onClose={() => setOpen(false)} />
    </DownloadCtx.Provider>
  );
}

const STEPS: React.ReactNode[] = [
  <>
    Open <span className="font-semibold text-white">{INSTALLER_FILE}</span> from your Downloads.
  </>,
  <>
    If Windows shows <span className="font-semibold text-white">&ldquo;Windows protected your PC&rdquo;</span>, click{" "}
    <span className="font-semibold text-white">More info</span> → <span className="font-semibold text-white">Run anyway</span>.
  </>,
  <>
    Allow <span className="font-semibold text-white">Administrator</span> access. The hardware tests need it.
  </>,
];

function DownloadStarted({ open, onClose }: { open: boolean; onClose: () => void }) {
  const release = useLatestRelease();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy-deep/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dl-title"
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="glass relative w-full max-w-md overflow-hidden rounded-3xl bg-navy-soft/80 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-electric/25 blur-3xl"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="relative flex items-center gap-3">
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 260, delay: 0.1 }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-fresh/15 text-fresh"
              >
                <CheckCircle2 size={26} aria-hidden />
              </motion.span>
              <div>
                <h2 id="dl-title" className="text-xl font-bold text-white">
                  Your download has started
                </h2>
                {release && (
                  <p className="text-sm text-[var(--muted)]">
                    Version {release.version}
                    {release.publishedAt ? ` · released ${formatReleaseDate(release.publishedAt)}` : ""}
                  </p>
                )}
              </div>
            </div>

            <ol className="relative mt-6 space-y-3.5">
              {STEPS.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                  className="flex gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric/20 text-xs font-bold text-electric">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </motion.li>
              ))}
            </ol>

            <div className="relative mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-400">
              <ShieldCheck size={16} className="shrink-0 text-fresh" aria-hidden />
              Runs fully offline. Nothing is uploaded.
            </div>

            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <a href={DOWNLOAD_URL} className="inline-flex items-center gap-1.5 font-semibold text-electric hover:underline">
                <Download size={15} aria-hidden /> Download didn&apos;t start? Click here
              </a>
              <a
                href={RELEASE_NOTES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
              >
                Release notes <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
