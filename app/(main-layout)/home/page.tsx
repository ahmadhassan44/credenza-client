"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Card } from "@heroui/react";

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
      {/* Custom Navbar */}
      <CustomNavbar />

      {/* Hero Section */}
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
            Credenza empowers creators with AI-driven insights into income, creditworthiness, and financial tools.
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

      {/* Solution Statement Section */}
      <section className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-24">
        {/* Left: Text Block */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for modern creators, powered by intelligent finance.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you&apos;re a YouTuber, streamer, or freelancer — Credenza
            transforms your platform data into credit scores and actionable
            income insights to unlock financial opportunities.
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

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
          What Credenza Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Income Tracking
            </h3>
            <p className="text-gray-300">
              Real-time performance analytics from YouTube and more.
            </p>
          </Card>
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Credit Score Engine
            </h3>
            <p className="text-gray-300">
              Custom-built algorithm scores creators based on consistency,
              income, and engagement.
            </p>
          </Card>
          <Card className="bg-[#18122B]/80 border border-[#9E00F9]/20 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-[#CA6EFF] transition-all duration-300">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Fintech Tools
            </h3>
            <p className="text-gray-300">
              Unlock insights, optimize your growth, and prepare for financial
              services.
            </p>
          </Card>
        </div>
      </section>

      {/* Credit Score Generation Process */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
          How Your Score is Built
        </h2>
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
            <div
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
              {i < 4 && (
                <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-[#9E00F9] to-[#CA6EFF] rounded-full my-2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[#18122B] border-t border-[#9E00F9]/20 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">
              Ready to understand your creator credit score?
            </h3>
            <Button
              as={Link}
              className="bg-gradient-to-r from-[#9E00F9] to-[#CA6EFF] font-semibold hover:scale-105 px-8 py-3 rounded-xl shadow-lg text-white transition-all duration-200"
              href="/signup"
              size="lg"
            >
              Get Started for Free
            </Button>
          </div>
          <div className="flex-[2] grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
            <div>
              <h4 className="text-white font-semibold mb-2">Company</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <Link
                    className="hover:text-[#9E00F9] transition"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-[#9E00F9] transition"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="/careers"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Resources</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <a className="hover:text-[#9E00F9] transition" href="/help">
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="/api-docs"
                  >
                    API Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Contact</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="mailto:support@credenza.ai"
                  >
                    support@credenza.ai
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="https://linkedin.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="https://twitter.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>
                  <a className="hover:text-[#9E00F9] transition" href="/terms">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#9E00F9] transition"
                    href="/privacy"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500 text-xs">
          © 2025 Credenza Technologies Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
