import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate, formatTime } from "@/utils";

import QRCode from "react-qr-code";
import { mockTickets } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>
}

export default async function TicketPage({ params }: Props) {
  const { id } = await params;  // ✅ unwrap params
  const ticket = mockTickets.find((e) => e.id === id);

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

  const qrData = JSON.stringify({
    ticketNumber: ticket.ticketNumber,
    ticketName: ticket.event.title,
    date: ticket.event.eventDate,
    venue: ticket.event.location,
    section: ticket.section,
    seat: ticket.seat,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden">
        <img
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
        {/* QR Code Card */}
        <Card className="backdrop-blur-sm from-card/60 to-card/60 border-border/50 shadow-[var(--shadow-card)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-black from-primary to-secondary bg-clip-text">
              {ticket.event.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-2xl shadow-[var(--shadow-glow)]">
              <QRCode
                value={qrData}
                size={200}
                level="H"
                className="w-full h-auto"
              />
            </div>

            {/* Ticket Number */}
            <div className="w-full text-center space-y-1">
              <p className="text-sm text-muted-foreground">Número de Ticket</p>
              <p className="text-xl font-mono font-bold tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text">
                {ticket.ticketNumber}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ticket Details Card */}
        <Card className="backdrop-blur-sm bg-gradient-to-br from-card/80 to-card/60 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Detalles del ticketo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground capitalize">
                  {formatDate(ticket.event.eventDate)}
                </p>
                <p className="text-sm text-muted-foreground">Fecha del ticketo</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{formatTime(ticket.event.eventDate)} hrs</p>
                <p className="text-sm text-muted-foreground">Hora de inicio</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{ticket.event.location}</p>
                {/* <p className="text-sm text-muted-foreground">{ticket.location}</p> */}
              </div>
            </div>

            {(ticket.section || ticket.seat) && (
              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    {ticket.section && `Sección: ${ticket.section}`}
                    {ticket.section && ticket.seat && " • "}
                    {ticket.seat && `Asiento: ${ticket.seat}`}
                  </p>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 pt-4 border-t border-border/50">
              <CreditCard className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Precio pagado</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ${ticket.cost} {ticket.event.currency}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="backdrop-blur-sm bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Instrucciones</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Presenta este código QR en la entrada del ticketo</li>
              <li>• Llega al menos 30 minutos antes del inicio</li>
              <li>• Ten tu identificación oficial a la mano</li>
              <li>• No compartas tu código QR con nadie</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}