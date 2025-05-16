// ServicesGrid.tsx
"use client";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";

export default function ServicesGrid() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 max-w-7xl mx-auto px-6 py-24"
    >
      <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        What Credenza Offers
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={fadeInUp}>
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Income Tracking
            </h3>
            <p className="text-gray-300">
              Real-time performance analytics from YouTube and more.
            </p>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Credit Score Engine
            </h3>
            <p className="text-gray-300">
              Custom-built algorithm scores creators based on consistency, income, and engagement.
            </p>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Fintech Tools
            </h3>
            <p className="text-gray-300">
              Unlock insights, optimize your growth, and prepare for financial services.
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
