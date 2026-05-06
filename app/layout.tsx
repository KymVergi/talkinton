import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Talking Ton - Multi Lingual AI Bot",
  description: "Interactive AI chat bot with voice recognition and speech synthesis in multiple languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
