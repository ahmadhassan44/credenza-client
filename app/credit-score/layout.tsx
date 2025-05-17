\
import { Sidebar } from \"@/app/(dashboard)/sidebar\"; // Adjusted path
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function CreditScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-black text-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
