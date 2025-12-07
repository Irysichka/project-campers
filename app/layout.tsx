import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const interSans = Inter({
  variable: '--font-family',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});


export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Find the best campers for your next trip.",
   icons: {
    icon: "/favicon.ico",
  },
openGraph: {
  title: "TravelTrucks",
  description: "Find the best campers for your next trip.",
  url: "https://project-campers.vercel.app/",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    data-scroll-behavior="smooth">
      <body className={`${interSans.variable}`}>
        <TanStackProvider>
        <Header />
          {children}
</TanStackProvider>
      </body>
    </html>
  );
}
