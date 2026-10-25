export const SITE = {
  name: "SolLapChecker",
  url: "https://lapchecker.sollabstech.com",
  company: "Sollabs Tech",
  companyUrl: "https://www.sollabstech.com",
  tagline: "Innovate. Build. Deliver.",
  // TODO: point this at the real installer once it is hosted.
  downloadUrl: "#download",
  sampleReportUrl: "#report",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Report", href: "#report" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FAQS = [
  {
    q: "Is SolLapChecker free?",
    a: "Yes. SolLapChecker is free to download and use, with no sign-up, no trial timer and no locked tests.",
  },
  {
    q: "Does it need internet?",
    a: "No. Every test runs locally on the laptop, so you can check a machine anywhere, even with no connection. Your results never leave the device unless you share the report yourself.",
  },
  {
    q: "Is it safe?",
    a: "Yes. The app reads your hardware sensors and drive health data and runs time-limited stress tests that stop on their own. It never changes your files or settings.",
  },
  {
    q: "Which Windows versions are supported?",
    a: "SolLapChecker runs on 64-bit Windows 10 and Windows 11.",
  },
  {
    q: "Does it work on all laptops?",
    a: "It works on Windows laptops from any brand. If a component is missing or does not expose its data, for example a laptop with no webcam, that test is marked as not available instead of failing the whole scan.",
  },
] as const;
