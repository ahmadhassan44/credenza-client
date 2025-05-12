import { Button } from "@heroui/react";

interface SidebarProps {
  active: string;
  setActive: (label: string) => void;
  sidebarItems: { label: string; active?: boolean }[];
}

export default function DashboardSidebar({ active, setActive, sidebarItems }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-1/4 max-w-xs min-w-[25%] bg-[#080808] p-8 flex flex-col justify-between z-30">
      <div>
        <p className="text-white text-[28px] font-['Space_Grotesk'] font-medium tracking-tighter text-center mb-12">
          Credenza
        </p>
        <div className="flex flex-col gap-2">
          {sidebarItems.slice(0, 6).map((item) => (
            <Button
              key={item.label}
              aria-pressed={active === item.label}
              className={`flex items-center gap-2 px-6 rounded-xl h-12 font-['Space_Grotesk'] text-base ${active === item.label ? "bg-gradient-to-b from-[#9E00F9] to-[#9E00F9] text-white" : "text-white/80 bg-transparent hover:bg-transparent"}`}
              style={{ height: 48 }}
              tabIndex={0}
              variant="flat"
              onClick={() => setActive(item.label)}
            >
              {item.label === "Dashboard" && (
                <span className="mr-2">
                  {/* Dashboard icon SVG */}
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 16 17"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M5.418 7.00051H2.582C2.16587 6.99709 1.76541 7.15911 1.46873 7.45091C1.17204 7.74271 1.00343 8.14041 1 8.55651V14.4455C1.0077 15.3117 1.71584 16.0078 2.582 16.0005H5.418C5.8341 16.004 6.2346 15.842 6.5313 15.5502C6.828 15.2584 6.9966 14.8607 7 14.4445V8.55651C6.9966 8.14041 6.828 7.74271 6.5313 7.45091C6.2346 7.15911 5.8341 6.99709 5.418 7.00051Z"
                      fillRule="evenodd"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      clipRule="evenodd"
                      d="M5.418 1.0006H2.582C1.73326 0.977064 1.02559 1.64492 1 2.4936V3.5076C1.02559 4.35629 1.73326 5.02415 2.582 5.0006H5.418C6.2667 5.02415 6.9744 4.35629 7 3.5076V2.4936C6.9744 1.64492 6.2667 0.977064 5.418 1.0006Z"
                      fillRule="evenodd"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      clipRule="evenodd"
                      d="M10.582 10.0007H13.417C13.8333 10.0044 14.234 9.8425 14.5309 9.5507C14.8278 9.2588 14.9966 8.86101 15 8.44471V2.55666C14.9966 2.14054 14.828 1.74282 14.5313 1.45101C14.2346 1.1592 13.8341 0.997205 13.418 1.00066H10.582C10.1659 0.997205 9.7654 1.1592 9.4687 1.45101C9.172 1.74282 9.0034 2.14054 9 2.55666V8.44471C9.0034 8.86081 9.172 9.2585 9.4687 9.5503C9.7654 9.8421 10.1659 10.0041 10.582 10.0007Z"
                      fillRule="evenodd"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      clipRule="evenodd"
                      d="M10.582 16.0006H13.417C14.2661 16.0247 14.9744 15.3567 15 14.5076V13.4936C14.9744 12.6449 14.2667 11.9771 13.418 12.0006H10.582C9.7333 11.9771 9.0256 12.6449 9 13.4936V14.5066C9.025 15.3557 9.7329 16.0241 10.582 16.0006Z"
                      fillRule="evenodd"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              )}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        {sidebarItems.slice(6).map((item) => (
          <Button
            key={item.label}
            aria-pressed={active === item.label}
            className="flex items-center gap-2 px-6 rounded-xl h-12 font-['Space_Grotesk'] text-white/80 hover:bg-[#18181b] text-base"
            style={{ height: 48 }}
            tabIndex={0}
            variant="flat"
            onClick={() => setActive(item.label)}
          >
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
