import type { Metadata } from "next";
import { poppinsFont } from "@/config/fonts";
import { Providers } from "@/components";

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
        className={`${poppinsFont} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
