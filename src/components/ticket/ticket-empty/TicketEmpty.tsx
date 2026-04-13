import { Ticket } from "lucide-react";

export const TicketEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 rounded-full bg-muted/50 mb-4">
        <Ticket className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        No tienes tickets ni accesos confirmados
      </h2>
      <p className="text-muted-foreground max-w-md">
        Cuando compres una entrada o confirmes asistencia a un evento gratuito, tu QR aparecerá aquí.
      </p>
    </div>
  )
}
