// Deterministic pseudo-random so server and client render identical markup.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const COLORS = ["#1E90FF", "#22C55E", "#F59E0B", "#8FC7FF"];

export default function Particles({ count = 28, seed = 7 }: { count?: number; seed?: number }) {
  const r = rng(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const size = 2 + r() * 4;
    const color = COLORS[Math.floor(r() * COLORS.length)];
    return {
      key: i,
      style: {
        left: `${(r() * 100).toFixed(2)}%`,
        top: `${(30 + r() * 70).toFixed(2)}%`,
        width: `${size.toFixed(2)}px`,
        height: `${size.toFixed(2)}px`,
        background: color,
        boxShadow: `0 0 ${(size * 3).toFixed(1)}px ${color}`,
        "--pd": `${(7 + r() * 8).toFixed(2)}s`,
        "--pdelay": `-${(r() * 14).toFixed(2)}s`,
        "--px": `${(r() * 60 - 30).toFixed(1)}px`,
        "--po": (0.35 + r() * 0.5).toFixed(2),
      } as React.CSSProperties,
    };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span key={p.key} className="particle" style={p.style} />
      ))}
    </div>
  );
}
