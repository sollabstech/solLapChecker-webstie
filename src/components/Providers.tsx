"use client";

import { MotionConfig } from "framer-motion";
import DownloadProvider from "./DownloadProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <DownloadProvider>{children}</DownloadProvider>
    </MotionConfig>
  );
}
