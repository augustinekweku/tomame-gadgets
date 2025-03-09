import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import Topnav2 from "@/components/Layout/Topnav2";
import Footer from "@/components/Layout/Footer";
import WhatsappChat from "@/components/WhatsappChat";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "@/components/ui/sonner";

import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className}  antialiased`}>
          <div className=" flex flex-col h-dvh">
            <div className="top_nav fixed w-full shadow-lg z-50">
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
    </ClerkProvider>
  );
}
