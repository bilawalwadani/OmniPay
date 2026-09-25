import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmniPay Dashboard",
  description: "Modern financial dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#09090b] text-zinc-50 min-h-screen flex selection:bg-brand-500/30`}>
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64 transition-all duration-300 relative overflow-hidden min-h-screen">
          {/* Background decoration elements */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-500/15 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
