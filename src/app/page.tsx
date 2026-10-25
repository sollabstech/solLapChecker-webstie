import Audience from "@/components/Audience";
import Demo from "@/components/Demo";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ReportPreview from "@/components/ReportPreview";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <Stats />
        <Features />
        <Demo />
        <HowItWorks />
        <ReportPreview />
        <Audience />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
