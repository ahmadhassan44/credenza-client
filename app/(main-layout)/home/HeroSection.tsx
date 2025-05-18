// HeroSection.tsx
"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export default function HeroSection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex flex-col items-center justify-center min-h-[90vh] pt-24 pb-20 z-10 overflow-hidden"
    >
      {/* Animated Dynamic Radial Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-dynamic-bg" />
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_30px_#9E00F9aa]"
          variants={fadeInUp}
        >
          Powering Creator Finance With Intelligent Credit Scoring
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          variants={fadeInUp}
        >
          Credenza empowers creators with AI-driven insights into income, creditworthiness, and financial tools.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeInUp}
        >
          <Button
            as={Link}
            className="bg-[#9E00F9] font-semibold landing-btn hover:scale-105 hover:shadow-xl px-8 py-3 rounded-xl shadow-lg shadow-[#9E00F9]/40 text-white transition-all duration-200"
            href="/signup"
            size="lg"
          >
            Sign Up Free
          </Button>
          <Button
            as={Link}
            className="bg-transparent border border-[#9E00F9] font-semibold landing-btn hover:bg-[#9E00F9]/10 hover:scale-105 hover:text-white px-8 py-3 rounded-xl text-[#9E00F9] transition-all duration-200"
            href="/login"
            size="lg"
            variant="bordered"
          >
            Log In
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
