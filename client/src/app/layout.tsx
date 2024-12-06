import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../component/Header";
import ReduxProvider from "../component/ReduxProvider";
import Footer from "../component/Footer";

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
  title: "SMART ТЕХНИКА",
  description: "SMART TEXNIKA Сеть магазинов в Санкт-Петербурге",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-inter font-light`}
      >
      <ReduxProvider>
        <Header></Header>
        {children}
        <Footer></Footer>
      </ReduxProvider>
      </body>
    </html>
  );
}
