"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../sidebar";
import { sidebarItems } from "../income/sidebarItems";
import SkeletonLoader from "../skeleton-loader";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  const [active, setActive] = useState("Profile");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetActive = (label: string) => {
    setActive(label);
    setLoading(true);
    switch (label) {
      case "Profile":
        router.push("/profile");
        break;
      case "Dashboard":
        router.push("/dashboard");
        break;
      case "Income Streams":
        router.push("/income");
        break;
      case "Credit Score":
        router.push("/credit-score");
        break;
      case "Metrics & Analytics":
        router.push("/metrics");
        break;
      case "Logout":
        break;
      default:
        break;
    }
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="flex w-full bg-black min-h-screen">
      <Sidebar active={active} setActive={handleSetActive} sidebarItems={sidebarItems} />
      <div className="flex-1 flex items-center justify-center p-4">
        {loading ? <SkeletonLoader /> : <ProfileForm />}
      </div>
    </div>
  );
}
