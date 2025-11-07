"use client";

import { useState } from "react";
import { CreditCard, Lock, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Event } from "@/interfaces"
import { useEventsStore } from "@/store"
import { formatDate } from "@/utils"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCreateTicket } from "@/hooks/tickets/useCreateTicket";

interface PaymentModalProps {
  event: Event;
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function PaymentModal({ event, open, onOpenChange, onSuccess }: PaymentModalProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { mutateAsync } = useCreateTicket();
  const { updateEventAsPaid } = useEventsStore();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Construimos el payload del ticket
      const payload = {
        items: [
          {
            eventId: event.id,
            quantity: 1,
            price: event.cost,
          },
        ],
      };

      setIsProcessing(false)
      setPaymentSuccess(true)

      // Llama al backend con React Query
      const resp = await mutateAsync(payload);
      // Actualiza el estado global (Zustand)
      updateEventAsPaid(event.id);

      //router.replace('/ticket/' + resp.ticket?.id);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        onSuccess?.()
        onOpenChange(false)
        setPaymentSuccess(false)
      }, 2000)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Confirmar Asistencia</DialogTitle>
              <DialogDescription>Completa el pago para confirmar tu asistencia al evento</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Event Summary */}
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <h4 className="font-semibold text-sm">{event.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDate(event.eventDate)}
                </p>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total a pagar</span>
                  <span className="text-lg font-bold">
                    ${event.cost} {event.currency}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
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

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Pago seguro y encriptado</span>
                </div>

                <DialogFooter className="space-x-2 gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="default" disabled={isProcessing} className="hover:bg-gray-500">
                    {isProcessing ? "Procesando..." : `Pagar ${event.cost} ${event.currency}`}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Pago exitoso</h3>
              <p className="text-sm text-muted-foreground">Tu asistencia ha sido confirmada</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
