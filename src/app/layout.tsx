import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Topnav2 from "@/components/Layout/Topnav2";
import Footer from "@/components/Layout/Footer";
import WhatsappChat from "@/components/WhatsappChat";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tomame Gadgets",
  description:
    "Tomame Gadgets is a store for all your gadgets, we sell the best gadgets in town at affordable prices. Iphones, Samsung, Laptops, Macbooks, Console games, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topnav2 />
        {children}
        <WhatsappChat />
        <Footer />
      </body>
    </html>
  );
}
