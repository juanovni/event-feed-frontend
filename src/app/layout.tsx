import type { Metadata } from "next";
import { poppinsFont } from "@/config/fonts";
import { Providers } from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s - AlLado',
    default: 'AlLado',
  },
  description: 'AlLado es una plataforma de eventos sociales que te conecta con experiencias únicas cerca de ti. Descubre, comparte y únete a eventos organizados por personas como tú. Desde conciertos y exposiciones hasta encuentros gastronómicos, encuentra el evento perfecto para ti y tus amigos. ¡Explora lo que sucede a tu alrededor con AlLado!',
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
