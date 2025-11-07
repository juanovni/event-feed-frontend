"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TicketInstructions } from "../ui/TicketInstructions";
import { TicketQRCode } from "../ui/TicketQRCode";
import { useTicket } from "@/hooks";
import { TicketDetails } from "../ui/TicketDetails";

interface Props {
  params: {
    id: string;
  };
}

export default function TicketPage({ params }: Props) {
  const { id } = params;
  const { data: ticket, isLoading, isError } = useTicket(id);

  if (isLoading) return <p>Cargando ticket...</p>;
  if (isError) return <p>Error al cargar el ticket.</p>;

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">Entrada no encontrada</p>
            <Link href="/">
              <Button
                variant="default">
                Volver a mis entradas
              </Button>
            </Link>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          width={200}
          height={200}
          src={ticket.event.mediaUrl}
          alt={ticket.event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/25 to-background" />
        <Link href="/tickets">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-12 pb-8 space-y-4">

        <TicketQRCode ticket={ticket} />

        {/* ticket Details Card */}
        <TicketDetails ticket={ticket} />

        <TicketInstructions />

      </div>
    </div>
  );

}