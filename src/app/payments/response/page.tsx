"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { eventApi } from "@/api/event.api";
import { Button } from "@/components/ui/button";

export default function PaymentResponsePage() {
  const started = useRef(false);
  const [message, setMessage] = useState("Estamos verificando tu pago.");
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const clientTransactionId = params.get("clientTransactionId");
    if (!id || !clientTransactionId) {
      setMessage("No se recibieron los datos necesarios para verificar el pago.");
      return;
    }
    eventApi.post("/payments/confirm", { id, clientTransactionId })
      .then(({ data }) => {
        if (data.status === "approved" && typeof data.ticketId === "string") {
          setTicketId(data.ticketId);
          setMessage("Tu pago fue confirmado.");
        } else {
          setMessage("El pago no fue aprobado. Revisa el estado de tu compra.");
        }
      })
      .catch(() => setMessage("No pudimos verificar el pago. Revisa tus entradas o inténtalo más tarde."));
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 text-center shadow-sm space-y-5">
        <h1 className="text-xl font-semibold">Estado de tu pago</h1>
        <p className="text-sm text-muted-foreground" role="status">{message}</p>
        <Button asChild className="w-full rounded-full">
          <Link href={ticketId ? `/ticket/${encodeURIComponent(ticketId)}` : "/tickets"}>
            {ticketId ? "Ver mi entrada" : "Ver mis entradas"}
          </Link>
        </Button>
      </div>
    </main>
  );
}
