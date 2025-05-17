"use client";

import { Space_Grotesk } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { sidebarItems as defaultSidebarItems } from "../income/sidebarItems";
import SidebarComponent from "../sidebar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const getActiveLabelFromPath = (pathname: string): string => {
  if (pathname.includes("/credit-score")) return "Credit Score";
  if (pathname.includes("/dashboard")) return "Dashboard";
  if (pathname.includes("/income")) return "Income Streams";
  if (pathname.includes("/profile")) return "Profile";
  if (pathname.includes("/metrics")) return "Metrics & Analytics";
  if (pathname.includes("/fintech-tools")) return "Fintech Tools";
  return defaultSidebarItems[0]?.label || "";
};

export default function CreditScoreSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeLabel, setActiveLabel] = useState<string>("");

  useEffect(() => {
    setActiveLabel(getActiveLabelFromPath(pathname));
  }, [pathname]);

  const handleSetActive = (label: string) => {
    setActiveLabel(label);
  };

  return (
    <div className={`flex min-h-screen ${spaceGrotesk.className}`}>
      <SidebarComponent
        active={activeLabel}
        setActive={handleSetActive}
        sidebarItems={defaultSidebarItems}
      />
      <main className="flex-1 bg-black text-white ml-[15vw] p-8">
        {children}
      </main>
    </div>
  );
}
