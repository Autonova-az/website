import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Autonova - Premium Avtomobillər Azərbaycanda",
  description: "Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk. Yüksək standartlar və müştəri məmnuniyyəti bizim prioritetimizdir.",
  keywords: "avtomobil, Çin avtomobil, idxal, Azərbaycan, premium cars, autonova",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <head>

      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
