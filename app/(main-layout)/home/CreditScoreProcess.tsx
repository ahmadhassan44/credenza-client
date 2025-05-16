// CreditScoreProcess.tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export default function CreditScoreProcess() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 max-w-7xl mx-auto px-6 py-24"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
      >
        How Your Score is Built
      </motion.h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        {[
          {
            icon: <span className="text-3xl">🔌</span>,
            title: "Connect Platforms",
            desc: "Securely link your creator accounts.",
          },
          {
            icon: <span className="text-3xl">📅</span>,
            title: "Analyze Consistency",
            desc: "Review your content and income patterns.",
          },
          {
            icon: <span className="text-3xl">🤖</span>,
            title: "Score Generation",
            desc: "AI-powered scoring tailored for creators.",
          },
          {
            icon: <span className="text-3xl">🚀</span>,
            title: "Unlock Features",
            desc: "Access financial tools and offers.",
          },
        ].map((step, i) => (
          <motion.div
            variants={fadeInUp}
            key={i}
            className="flex flex-col items-center text-center flex-1 min-w-[150px] max-w-[200px]"
          >
            <div className="mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-[#9E00F9]/20 border border-[#9E00F9]/40 text-3xl shadow-lg">
              {step.icon}
            </div>
            <h4 className="text-lg font-semibold text-white mb-1">
              {step.title}
            </h4>
            <p className="text-gray-400 text-sm mb-2">{step.desc}</p>
            {i < 3 && (
              <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-[#9E00F9] to-[#CA6EFF] rounded-full my-2" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
