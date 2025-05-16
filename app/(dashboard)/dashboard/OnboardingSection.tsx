import React from "react";
import DashboardSidebar from "@/app/(dashboard)/sidebar";

const sidebarItems = [
  { label: "Profile" },
  { label: "Dashboard", active: true },
  { label: "Income Streams" },
  { label: "Credit Score" },
  { label: "Metrics & Analytics" },
  { label: "Fintech Tools" },
  { label: "Settings" },
  { label: "Logout" },
];

const OnboardingSection: React.FC<{ active: string; setActive: (a: string) => void }> = ({ active, setActive }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
    <DashboardSidebar active={active} setActive={setActive} sidebarItems={sidebarItems} />
    <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xl mx-auto">
      <div className="bg-[#18181b] rounded-xl shadow-lg p-8 w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk']">Welcome to Credenza!</h2>
        <p className="text-lg text-white/80 mb-6 font-['Space_Grotesk']">
          Get started by connecting your first platform (YouTube, Patreon, etc.) to see your dashboard metrics.
        </p>
        <a
          href="/income"
          className="inline-block bg-[#9E00F9] hover:bg-[#7a00c2] text-white px-6 py-3 rounded-xl font-bold text-lg transition-colors duration-200"
        >
          Connect a Platform
        </a>
      </div>
    </main>
  </div>
);

export default OnboardingSection;
