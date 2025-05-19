"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export default function SolutionSection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 px-6 py-24"
    >
      {/* Left: Text Block */}
      <motion.div variants={fadeInUp} className="flex-1 max-w-xl">
        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Built for modern creators, powered by intelligent finance.
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-8">
          Whether you&apos;re a YouTuber, streamer, or freelancer — Credenza
          transforms your platform data into credit scores and actionable income insights to unlock financial opportunities.
        </motion.p>
      </motion.div>
      {/* Right: Animated Graph/Illustration */}
      <motion.div variants={fadeInUp} className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[#9E00F9]/30 via-[#CA6EFF]/20 to-[#F1C7FF]/10 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
          {/* Placeholder for animated graph/illustration */}
          <Image
            alt="Animated Graph"
            className="w-3/4 mx-auto animate-pulse"
            height={240}
            src="/creditScoreTab.svg"
            width={320}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
