"use client";

import { useEffect, useState } from "react";
import { LATEST_RELEASE_API } from "./download";

export type LatestRelease = {
  /** "1.0.2" (the tag without a leading "v"). */
  version: string;
  /** ISO date the release was published. */
  publishedAt: string;
};

const CACHE_KEY = "slc:latest-release";
const CACHE_MS = 6 * 60 * 60 * 1000; // a release lookup is good for 6 hours
const FAIL_CACHE_MS = 10 * 60 * 1000; // after a failure, wait 10 minutes before asking again

type Cached = { at: number; release: LatestRelease | null };

function readCache(): LatestRelease | null | undefined {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return undefined;
    const c = JSON.parse(raw) as Cached;
    const ttl = c.release ? CACHE_MS : FAIL_CACHE_MS;
    return Date.now() - c.at < ttl ? c.release : undefined;
  } catch {
    return undefined;
  }
}

function writeCache(release: LatestRelease | null) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), release } satisfies Cached));
  } catch {
    // Private mode or storage blocked: the lookup simply runs again next visit.
  }
}

// One request per page load, shared by every component that asks.
let inflight: Promise<LatestRelease | null> | null = null;

function fetchLatest(): Promise<LatestRelease | null> {
  inflight ??= fetch(LATEST_RELEASE_API, { headers: { Accept: "application/vnd.github+json" } })
    .then(async (res) => {
      if (!res.ok) return null;
      const j = (await res.json()) as { tag_name?: string; published_at?: string };
      if (!j.tag_name) return null;
      return { version: j.tag_name.replace(/^v/i, ""), publishedAt: j.published_at ?? "" };
    })
    .catch(() => null)
    .then((release) => {
      writeCache(release);
      return release;
    });
  return inflight;
}

/** The newest published release, or null while loading or when GitHub cannot be reached. */
export function useLatestRelease(): LatestRelease | null {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    const cached = readCache();
    let alive = true;
    (cached !== undefined ? Promise.resolve(cached) : fetchLatest()).then((r) => alive && setRelease(r));
    return () => {
      alive = false;
    };
  }, []);

  return release;
}

/** "28 Oct 2026" */
export function formatReleaseDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
