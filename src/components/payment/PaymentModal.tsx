"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus, Minus } from "lucide-react";
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
import { useAuthStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PaymentModal({ event, open, onOpenChange }: PaymentModalProps) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [step, setStep] = useState<"tickets" | "details">("tickets");
  const [billing, setBilling] = useState({
    name: "", email: "", phone: "", documentType: "cedula", documentNumber: "", billingName: "",
  });
  useEffect(() => {
    if (open) {
      const name = [user?.name, user?.lastName].filter(Boolean).join(" ");
      setBilling({ name, email: user?.email ?? "", phone: user?.phone ?? "", documentType: "cedula", documentNumber: "", billingName: name });
      setStep("tickets");
      setTermsAccepted(false);
    }
  }, [open, user?.name, user?.lastName, user?.email, user?.phone]);
  const [paymentSuccess] = useState(false);
  const [quote, setQuote] = useState<{ lines: { name: string; quantity: number; amount: number }[]; subtotal: number; tax: number; total: number; taxRate: number; currency: string } | null>(null);
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
    if (!items.length || !quote || !termsAccepted) return;
    const idPattern = billing.documentType === "cedula" ? /^\d{10}$/ : billing.documentType === "ruc" ? /^\d{13}$/ : /^[a-zA-Z0-9-]{3,30}$/;
    if (!billing.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email.trim()) ||
        billing.phone.trim().length < 5 || !billing.billingName.trim() || !idPattern.test(billing.documentNumber.trim())) {
      toast.error("Completa tus datos y revisa el número de identificación.");
      return;
    }
    setIsProcessing(true);
    try {
      const { data } = await eventApi.post("/payments/prepare", { items, expectedTotal: quote.total, billingData: billing, termsAccepted });
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
      <DialogContent className="w-full max-w-lg md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>{step === "tickets" ? "Selecciona tus entradas" : "Datos de compra"}</DialogTitle>
              <DialogDescription>
                {step === "tickets" ? "Escoge la cantidad de entradas que deseas comprar" : "Confirma tus datos de contacto y facturación"}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* COLUMNA IZQUIERDA: LISTA DE TICKETS */}
              <div className="space-y-4">
                {step === "tickets" ? (event.eventTicketTypes ?? []).map((ticket) => (
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
                )) : (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-semibold">Contacto</h3>
                      <p className="text-sm text-muted-foreground">Las entradas estarán disponibles en tu cuenta.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2"><Label htmlFor="checkout-name">Nombre completo</Label><Input id="checkout-name" value={billing.name} maxLength={150} onChange={e => setBilling({ ...billing, name: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="checkout-email">Correo electrónico</Label><Input id="checkout-email" type="email" value={billing.email} maxLength={254} onChange={e => setBilling({ ...billing, email: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="checkout-phone">Teléfono</Label><Input id="checkout-phone" type="tel" value={billing.phone} maxLength={30} onChange={e => setBilling({ ...billing, phone: e.target.value })} /></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Facturación</h3>
                      <p className="text-sm text-muted-foreground">Guarda los datos de facturación de esta compra.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="checkout-document-type">Tipo de identificación</Label>
                        <select id="checkout-document-type" value={billing.documentType} onChange={e => setBilling({ ...billing, documentType: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                          <option value="cedula">Cédula</option><option value="ruc">RUC</option><option value="passport">Pasaporte</option>
                        </select>
                      </div>
                      <div className="space-y-2"><Label htmlFor="checkout-document">Número de identificación</Label><Input id="checkout-document" value={billing.documentNumber} maxLength={30} onChange={e => setBilling({ ...billing, documentNumber: e.target.value })} /></div>
                      <div className="space-y-2 sm:col-span-2"><Label htmlFor="checkout-billing-name">Nombre o razón social</Label><Input id="checkout-billing-name" value={billing.billingName} maxLength={150} onChange={e => setBilling({ ...billing, billingName: e.target.value })} /></div>
                    </div>
                    <Button type="button" variant="outline" onClick={() => setStep("tickets")}>Volver a las entradas</Button>
                  </div>
                )}
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
                        <span>${(quote.total / 100).toFixed(2)} {quote.currency}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground" role="status">
                      {quoteError ? "No se pudo calcular el resumen." : items.length ? "Calculando resumen..." : "Selecciona tus entradas."}
                    </p>
                  )}
                </div>

                {step === "details" && (
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={event => setTermsAccepted(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-foreground"
                    />
                    <span>
                      He leído y acepto los{" "}
                      <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
                        Términos y Condiciones
                      </Link>{" "}y la{" "}
                      <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
                        Política de Privacidad
                      </Link>{" "}(obligatorio).
                    </span>
                  </label>
                )}
                <Button
                  type="button"
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  disabled={isProcessing || !quote || (step === "details" && !termsAccepted)}
                  onClick={step === "tickets" ? () => setStep("details") : handlePayment}
                >
                  {isProcessing ? "Preparando pago..." : step === "tickets" ? "Continuar al checkout" : quote?.total === 0 ? "Confirmar entradas" : quote ? `Continuar a PayPhone - $${(quote.total / 100).toFixed(2)}` : "Continuar a PayPhone"}
                  {step === "tickets" && <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />}
                </Button>
                {(!quote || quote.total > 0) && (
                  <div className="space-y-2 pt-1 text-center text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <span>Continuarás en</span>
                      <Image src="/images/payphone-logo.svg" alt="Payphone" width={92} height={16} className="h-4 w-auto" />
                    </div>
                    <p>Tarjetas aceptadas: Visa · Mastercard · Diners Club · Discover</p>
                  </div>
                )}
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
