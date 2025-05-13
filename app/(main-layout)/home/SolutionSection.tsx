"use client";
import Image from "next/image";

export default function SolutionSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-24">
      {/* Left: Text Block */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Built for modern creators, powered by intelligent finance.
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Whether you&apos;re a YouTuber, streamer, or freelancer — Credenza
          transforms your platform data into credit scores and actionable income insights to unlock financial opportunities.
        </p>
        <div className="flex gap-4 mt-4">
          <div className="flex flex-col items-center group cursor-pointer">
            <Image
              alt="YouTube"
              className="w-10 h-10 rounded-full bg-[#222] group-hover:ring-2 group-hover:ring-[#9E00F9] transition"
              height={40}
              src="/youtube.svg"
              width={40}
            />
            <span className="text-xs text-gray-400 mt-2 group-hover:text-[#9E00F9] transition">
              YouTube
            </span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <Image
              alt="Instagram"
              className="w-10 h-10 rounded-full bg-[#222] group-hover:ring-2 group-hover:ring-[#9E00F9] transition"
              height={40}
              src="/instagram.svg"
              width={40}
            />
            <span className="text-xs text-gray-400 mt-2 group-hover:text-[#9E00F9] transition">
              Instagram
            </span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <Image
              alt="Patreon"
              className="w-10 h-10 rounded-full bg-[#222] group-hover:ring-2 group-hover:ring-[#9E00F9] transition"
              height={40}
              src="/patreon.svg"
              width={40}
            />
            <span className="text-xs text-gray-400 mt-2 group-hover:text-[#9E00F9] transition">
              Patreon
            </span>
          </div>
        </div>
      </div>
      {/* Right: Animated Graph/Illustration */}
      <div className="flex-1 flex items-center justify-center">
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
      </div>
    </section>
  );
}
