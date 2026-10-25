import Image from "next/image";

export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      // Served as-is: Vercel's image optimizer needs a paid quota (it answers 402),
      // and a 128px file is already small enough for the 36-44px logo.
      src="/logo-128.png"
      unoptimized
      alt="SolLapChecker logo"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      priority
    />
  );
}
