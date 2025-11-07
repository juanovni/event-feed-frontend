
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "@/interfaces";

interface Props {
  ticket: Ticket;
}

export const TicketQRCode = ({ ticket }: Props) => {
  const qrData = JSON.stringify({
    ticketNumber: ticket.ticketNumber,
    ticketName: ticket.event.title,
    date: ticket.event.eventDate,
    venue: ticket.event.location,
    /* section: ticket.section,
    seat: ticket.seat, */
  });

  return (
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
  )
}
