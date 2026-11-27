import type { Metadata } from "next";
import { poppinsFont } from "@/config/fonts";
import { Providers } from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s - TheNextTicket',
    default: 'TheNextTicket',
  },
  description: 'TheNextTicket es una plataforma de eventos sociales que te conecta con experiencias únicas cerca de ti. Descubre, comparte y únete a eventos organizados por personas como tú.',
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
