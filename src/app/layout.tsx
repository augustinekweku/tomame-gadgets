import localFont from "next/font/local";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import Topnav2 from "@/components/Layout/Topnav2";
import Footer from "@/components/Layout/Footer";
import WhatsappChat from "@/components/WhatsappChat";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "@/components/ui/sonner";

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
        <div className=" flex flex-col h-dvh">
          <div className="top_nav fixed w-full">
            <Topnav2 />
          </div>
          <div
            className="flex  flex-col h-full mt-[64px]"
            style={{
              minHeight: "calc(100vh - 70px)",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <div className="main_content">{children}</div>
            <div className="footer mt-auto">
              <WhatsappChat />
              <Footer />
              <Toaster />
            </div>
          </div>
        </div>

        <Script id="microsoft-clarity">
          {`
              (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "p7l229tfht");     
        `}
        </Script>
      </body>
    </html>
  );
}
