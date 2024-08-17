
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import Head from "next/head";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
 

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head key={"v"}>
      <title >vg</title>
      </Head> */}
      <body className={inter.className}>
      <AuthContextProvider>
      {children}
      </AuthContextProvider>
      </body>
      
    </html>
  );
}
