import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="flex items-center gap-3">
            <Logo size={44} />
            <span className="text-xl font-bold text-white">
              Sol<span className="text-gold">Lap</span>
              <span className="text-fresh">Checker</span>
            </span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            A product by{" "}
            <a
              href={SITE.companyUrl}
              target="_blank"
              rel="noopener"
              className="font-semibold text-electric underline-offset-4 hover:underline"
            >
              {SITE.company}
            </a>
          </p>
        </div>

        <div className="text-center md:text-right">
          <a
            href={SITE.companyUrl}
            target="_blank"
            rel="noopener"
            className="text-sm font-semibold text-slate-200 transition hover:text-white"
          >
            www.sollabstech.com
          </a>
          <p className="mt-2 text-lg font-bold italic text-gradient-warm">{SITE.tagline}</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.company}. All rights reserved.
      </p>
    </footer>
  );
}
