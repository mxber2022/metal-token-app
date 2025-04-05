import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GoogleMapsWrapper from "@/components/GoogleMapsWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metal SDK Demo",
  description: "A demo app for Metal SDK token management",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleMapsWrapper>{children}</GoogleMapsWrapper>
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
