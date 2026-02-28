import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CardioML | Predictive Cardiovascular Intelligence",
  description: "State-of-the-art diagnostic models for heart health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans selection:bg-zinc-100 selection:text-zinc-900 bg-white text-zinc-950`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-container w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
