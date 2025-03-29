
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

// import Head from "next/head";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "send msg",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
 

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html>
        <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
