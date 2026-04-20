import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Corsprite - Scan. Understand. Automate.",
  description: "AI-powered spatial intelligence for real estate, interior design, construction, and insurance.",
};

import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";
import { ReleaseProvider } from "@/context/ReleaseContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReleaseProvider>
          <Header />
          {children}
          <ChatWidget />
        </ReleaseProvider>
      </body>
    </html>
  );
}
