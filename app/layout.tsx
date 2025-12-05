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
  title: "Travel Trucks",
  description: "Find camper",
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
