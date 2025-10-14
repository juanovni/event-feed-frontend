import type { Metadata } from "next";
import { geistMono, geistSans } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s - Events | Feed',
    default: 'Home - Events | Feed'
  },
  description: 'EventsFeed una plataforma para compartir eventos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
