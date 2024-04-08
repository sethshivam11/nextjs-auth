import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJs Auth",
  description: "Authentication Tutorial",
  openGraph: {
    type: "website",
    url: process.env.DOMAIN,
    title: "NextJs Auth",
    description: "Authentication Tutorial",
    siteName: "",
    images: [
      {
        url: "./public/logo.png",
        type: "image/png",
        height: "192",
        width: "192",
      },
    ],
  },
  metadataBase: new URL(process.env.DOMAIN as string),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
