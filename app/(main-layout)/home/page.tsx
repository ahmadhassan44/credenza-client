"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import SolutionSection from "./SolutionSection";
import ServicesGrid from "./ServicesGrid";
import CreditScoreProcess from "./CreditScoreProcess";
import Footer from "./Footer";
import { CustomNavbar } from "@/components/ui/customNavbar";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen font-space-grotesk relative overflow-x-hidden flex flex-col"
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        background: "#000",
      }}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          >
            <div className="flex flex-col items-center gap-4">
              <Spinner size="xl" color="white" />
              <span className="text-white text-lg font-semibold tracking-wide">Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <>
          <CustomNavbar />
          <HeroSection />
          <SolutionSection />
          <ServicesGrid />
          <CreditScoreProcess />
          <Footer />
        </>
      )}
    </div>
  );
}
