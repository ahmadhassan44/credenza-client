// HeroSection.tsx
"use client";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] pt-24 pb-20 z-10">
      {/* Animated Glow/Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-[#9E00F9]/40 via-[#CA6EFF]/20 to-transparent blur-3xl opacity-80 animate-pulse" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_30px_#9E00F9aa]">
          Powering Creator Finance With Intelligent Credit Scoring
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Credenza empowers creators with AI-driven insights into income,
          creditworthiness, and financial tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as={Link}
            className="bg-[#9E00F9] font-semibold hover:scale-105 hover:shadow-xl px-8 py-3 rounded-xl shadow-lg shadow-[#9E00F9]/40 text-white transition-all duration-200"
            href="/signup"
            size="lg"
          >
            Sign Up Free
          </Button>
          <Button
            as={Link}
            className="bg-transparent border border-[#9E00F9] font-semibold hover:bg-[#9E00F9]/10 hover:scale-105 hover:text-white px-8 py-3 rounded-xl text-[#9E00F9] transition-all duration-200"
            href="/login"
            size="lg"
            variant="bordered"
          >
            Log In
          </Button>
        </div>
      </div>
    </section>
  );
}
