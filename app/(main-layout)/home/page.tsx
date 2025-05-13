"use client";

import HeroSection from "./HeroSection";
import SolutionSection from "./SolutionSection";
import ServicesGrid from "./ServicesGrid";
import CreditScoreProcess from "./CreditScoreProcess";
import Footer from "./Footer";

import { CustomNavbar } from "@/components/ui/customNavbar";

export default function HomePage() {
  return (
    <div
      className="min-h-screen font-space-grotesk relative overflow-x-hidden flex flex-col"
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        background: "#000",
      }}
    >
      <CustomNavbar />
      <HeroSection />
      <SolutionSection />
      <ServicesGrid />
      <CreditScoreProcess />
      <Footer />
    </div>
  );
}
