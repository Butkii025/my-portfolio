import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaGithub } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import {Inter, Great_Vibes} from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});   

const calligraphy = Great_Vibes({
  weight: "400",
  variable: "--font-calligraphy",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "P_Vijay Portfolio",
  description: "P_Vijay Portfolio",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      style={{ scrollPaddingTop: "80px" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
