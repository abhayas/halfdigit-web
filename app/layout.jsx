import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'

// 1. Import the new SessionProvider
import SessionProvider from "./components/SessionProvider";

export const metadata = {
  title: 'HalfDigit | AI Engineering | Abhay Sahu',
  description: 'AI Engineer Portfolio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  // icons: {
  //   icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pb-24 sm:pb-0">
        {/* 2. Wrap your layout structure inside SessionProvider */}
        <SessionProvider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights/>
          <Footer />
          <ChatBot />
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-S5FMWSX9DG" />
    </html>
  );
}