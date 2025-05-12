import { ReactNode } from "react";

interface DashboardMainProps {
  children: ReactNode;
}

export default function DashboardMain({ children }: DashboardMainProps) {
  return (
    <main className="ml-[25%] flex flex-col pt-[63px] pb-[60px] px-[5%] min-w-0">
      {children}
    </main>
  );
}
