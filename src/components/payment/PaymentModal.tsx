"use client";

import { useState } from "react";
import { CreditCard, Lock, Check, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/interfaces";
import { useEventsStore } from "@/store";
import { formatDate } from "@/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCreateTicket } from "@/hooks/tickets/useCreateTicket";
import { useToggleAttend } from "@/hooks";

interface PaymentModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PaymentModal({ event, open, onOpenChange, onSuccess }: PaymentModalProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Cantidades por cada tipo de ticket
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const q: Record<string, number> = {};
    for (const ticket of event.eventTicketTypes ?? []) {
      q[ticket.id] = 0;
    }
    return q;
  });

  const { mutateAsync } = useCreateTicket();
  const { updateEventAsPaid } = useEventsStore();
  const { mutateAsync: attendEvent } = useToggleAttend();

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

  // Total
  const total = (event.eventTicketTypes ?? []).reduce((acc, ticket) => {
    return acc + ticket.price * (quantities[ticket.id] ?? 0);
  }, 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Items para API
      const items = (event.eventTicketTypes ?? [])
        .filter((t) => (quantities[t.id] ?? 0) > 0)
        .map((t) => ({
          eventId: event.id,
          eventTicketTypeId: t.id,
          quantity: quantities[t.id] ?? 0,
          price: t.price,
        }));

      const resp = await mutateAsync({ items });

      if (resp?.ok) {
        await attendEvent(event.id);
        updateEventAsPaid(event.id);
        router.replace("/ticket/" + resp.ticket?.id);
      }

      setPaymentSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        onSuccess?.();
        onOpenChange(false);
        setPaymentSuccess(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Selecciona tus Tickets</DialogTitle>
              <DialogDescription>
                Escoge la cantidad de tickets que deseas comprar
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">

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

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-medium">Total a pagar</span>
                    <span className="text-lg font-bold">
                      ${total.toFixed(2)} {event.currency}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">incluido Impuestos</span>
                </div>

                {/* FORMULARIO DE PAGO */}
                <form onSubmit={handlePayment} className="space-y-4">

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Vencimiento</Label>
                      <Input id="expiry" placeholder="MM/AA" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" maxLength={3} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre en la tarjeta</Label>
                    <Input id="name" placeholder="Juan Pérez" required />
                  </div>

                  <DialogFooter>
                    <Button type="submit" disabled={isProcessing || total === 0}>
                      {isProcessing ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
                    </Button>
                  </DialogFooter>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Pago seguro y encriptado</span>
                  </div>
                </form>
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
