"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "@/interfaces";
import { formatDate } from "@/utils";
import { Button } from "../ui/button";
import { eventApi } from "@/api/event.api";
import { toast } from "sonner";

interface PaymentModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PaymentModal({ event, open, onOpenChange }: PaymentModalProps) {
  const router = useRouter();
  const [paymentSuccess] = useState(false);
  const [quote, setQuote] = useState<{ lines: { name: string; quantity: number; amount: number }[]; subtotal: number; tax: number; total: number; taxRate: number } | null>(null);
  const [quoteError, setQuoteError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cantidades por cada tipo de ticket
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const q: Record<string, number> = {};
    for (const ticket of event.eventTicketTypes ?? []) {
      q[ticket.id] = 0;
    }
    return q;
  });


  // Incrementar
  const increment = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  // Decrementar
  const decrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) - 1),
    }));
  };

  const items = useMemo(() => (event.eventTicketTypes ?? [])
    .filter(ticket => (quantities[ticket.id] ?? 0) > 0)
    .map(ticket => ({
      eventId: event.id,
      eventTicketTypeId: ticket.id,
      quantity: quantities[ticket.id],
    })), [event.id, event.eventTicketTypes, quantities]);

  useEffect(() => {
    let active = true;
    setQuote(null);
    setQuoteError(false);
    if (open && items.length) {
      eventApi.post("/payments/quote", { items })
        .then(({ data }) => { if (active) setQuote(data); })
        .catch(() => { if (active) setQuoteError(true); });
    }
    return () => { active = false; };
  }, [open, items]);

  const handlePayment = async () => {
    if (!items.length || !quote) return;
    setIsProcessing(true);
    try {
      const { data } = await eventApi.post("/payments/prepare", { items, expectedTotal: quote.total });
      if (data.status === "approved" && typeof data.ticketId === "string") {
        router.push(`/ticket/${encodeURIComponent(data.ticketId)}`);
        return;
      }
      const url = new URL(data.paymentUrl);
      if (url.protocol !== "https:" || !["pay.payphonetodoesposible.com", "payphonetodoesposible.com"].includes(url.hostname)) {
        throw new Error("La dirección de pago no es válida");
      }
      window.location.assign(url.href);
    } catch {
      toast.error("No se pudo iniciar el pago. Inténtalo nuevamente.");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl h-[90vh] md:h-auto overflow-y-auto">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Selecciona tus Tickets</DialogTitle>
              <DialogDescription>
                Escoge la cantidad de tickets que deseas comprar
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* COLUMNA IZQUIERDA: LISTA DE TICKETS */}
              <div className="space-y-4">
                {(event.eventTicketTypes ?? []).map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{ticket.name}</p>
                      <p className="text-sm text-muted-foreground">${ticket.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => decrement(ticket.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-6 text-center">{quantities[ticket.id]}</span>

                      <Button variant="outline" size="icon" onClick={() => increment(ticket.id)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* COLUMNA DERECHA: RESUMEN + FORMULARIO */}
              <div className="space-y-4">

                {/* RESUMEN */}
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.eventDate)}
                  </p>

                  {quote ? (
                    <div className="space-y-2 pt-2 text-sm">
                      {quote.lines.map((line, index) => (
                        <div key={index} className="flex justify-between gap-4">
                          <span>{line.name} × {line.quantity}</span>
                          <span>${(line.amount / 100).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t pt-2">
                        <span>Subtotal</span>
                        <span>${(quote.subtotal / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA ({(quote.taxRate * 100).toLocaleString("es-EC")} %)</span>
                        <span>${(quote.tax / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total a pagar</span>
                        <span>${(quote.total / 100).toFixed(2)} USD</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground" role="status">
                      {quoteError ? "No se pudo calcular el resumen." : items.length ? "Calculando resumen..." : "Selecciona tus entradas."}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  disabled={isProcessing || !quote}
                  onClick={handlePayment}
                >
                  {isProcessing ? "Preparando pago..." : "Continuar al pago"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold">Pago exitoso</h3>
            <p className="text-sm text-muted-foreground">Tus tickets han sido generados</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
