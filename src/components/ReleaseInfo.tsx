"use client";

import { ExternalLink } from "lucide-react";
import { RELEASE_NOTES_URL } from "@/lib/download";
import { formatReleaseDate, useLatestRelease } from "@/lib/useLatestRelease";

/** "Version 1.0.2 • Windows 10/11 • Free · Release notes". The version part hides itself if GitHub can't be reached. */
export default function ReleaseInfo({ className = "" }: { className?: string }) {
  const release = useLatestRelease();
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 sm:text-sm ${className}`}>
      {release && (
        <span title={release.publishedAt ? `Released ${formatReleaseDate(release.publishedAt)}` : undefined}>
          Version {release.version} • Windows 10/11 • Free
        </span>
      )}
      {release && <span aria-hidden>·</span>}
      <a
        href={RELEASE_NOTES_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline-offset-4 hover:text-white hover:underline"
      >
        Release notes <ExternalLink size={13} aria-hidden />
      </a>
    </p>
  );
}
