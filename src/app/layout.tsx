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
