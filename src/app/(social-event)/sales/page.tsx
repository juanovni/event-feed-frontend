"use client";

import { useEffect, useMemo, useState } from "react";
import { eventApi } from "@/api/event.api";
import { useAuthStore } from "@/store";
import { Title } from "@/components/ui/title/Title";

type Sale = {
  id: string;
  eventId: string;
  eventTitle: string;
  currency: string;
  ticketsSold: number;
  subtotalCents: number;
  taxCents: number;
  buyerTotalCents: number;
  commissionCents: number;
  commissionTaxCents: number;
  estimatedProcessingCents: number;
  actualProcessingCents: number | null;
  estimatedOrganizerCents: number;
  reconciledOrganizerCents: number | null;
  paidAt: string | null;
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("es-EC", { style: "currency", currency }).format(cents / 100);
}

export default function SalesPage() {
  const user = useAuthStore(state => state.user);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user?.role !== "publisher") {
      setLoading(false);
      return;
    }
    let active = true;
    eventApi.get<Sale[]>("/settlements/mine")
      .then(({ data }) => { if (active) setSales(data); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.role]);

  const groups = useMemo(() => {
    const result = new Map<string, { eventId: string; title: string; currency: string; tickets: number; total: number; commission: number; commissionTax: number; processing: number; amount: number; pending: number; sales: Sale[] }>();
    for (const sale of sales) {
      const key = JSON.stringify([sale.eventId, sale.currency]);
      let group = result.get(key);
      if (!group) {
        group = { eventId: sale.eventId, title: sale.eventTitle, currency: sale.currency, tickets: 0, total: 0, commission: 0, commissionTax: 0, processing: 0, amount: 0, pending: 0, sales: [] };
        result.set(key, group);
      }
      group.tickets += sale.ticketsSold;
      group.total += sale.buyerTotalCents;
      group.commission += sale.commissionCents;
      group.commissionTax += sale.commissionTaxCents;
      group.processing += sale.actualProcessingCents ?? sale.estimatedProcessingCents;
      group.amount += sale.reconciledOrganizerCents ?? sale.estimatedOrganizerCents;
      if (sale.actualProcessingCents === null) group.pending++;
      group.sales.push(sale);
    }
    return [...result.values()];
  }, [sales]);

  if (user?.role !== "publisher") {
    return <main className="p-8">Esta pantalla está disponible para organizadores.</main>;
  }

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <Title title="Mis ventas">{null}</Title>
        <p className="px-2 text-sm text-muted-foreground md:px-0">Consulta las entradas vendidas y los importes de tus eventos.</p>
      </header>

      {loading && <p role="status" className="text-sm text-muted-foreground">Cargando ventas...</p>}
      {error && <p role="alert" className="text-sm text-destructive">No se pudieron cargar tus ventas. Inténtalo nuevamente.</p>}
      {!loading && !error && !groups.length && (
        <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">Todavía no hay ventas pagadas con registro de liquidación.</div>
      )}

      {groups.map(group => (
        <section key={`${group.eventId}-${group.currency}`} className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><h2 className="text-lg font-semibold">{group.title}</h2><p className="text-sm text-muted-foreground">{group.tickets} {group.tickets === 1 ? "entrada vendida" : "entradas vendidas"}</p></div>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-muted/60 p-4"><dt className="text-sm text-muted-foreground">Total pagado por compradores</dt><dd className="mt-1 text-xl font-semibold">{money(group.total, group.currency)}</dd></div>
            <div className="rounded-xl bg-muted/60 p-4"><dt className="text-sm text-muted-foreground">Comisión e IVA de comisión</dt><dd className="mt-1 text-xl font-semibold">{money(group.commission + group.commissionTax, group.currency)}</dd></div>
            <div className="rounded-xl bg-muted/60 p-4"><dt className="text-sm text-muted-foreground">Liquidación calculada</dt><dd className="mt-1 text-xl font-semibold">{money(group.amount, group.currency)}</dd></div>
          </dl>
          <p className="text-sm text-muted-foreground">
            Costo de PayPhone considerado: {money(group.processing, group.currency)}.
            {group.pending > 0 ? ` ${group.pending} compra(s) usan un costo estimado.` : " Los costos de estas ventas están conciliados."}
            {" "}El importe no descuenta transferencias ni devoluciones.
          </p>
          <details className="border-t pt-4">
            <summary className="cursor-pointer text-sm font-medium">Ver detalle de compras</summary>
            <div className="mt-3 space-y-2">
              {group.sales.map(sale => (
                <div key={sale.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm">
                  <div><p>{sale.ticketsSold} {sale.ticketsSold === 1 ? "entrada" : "entradas"}</p><p className="text-muted-foreground">{sale.paidAt ? new Date(sale.paidAt).toLocaleDateString("es-EC") : "Fecha no disponible"}</p></div>
                  <div className="text-right"><p>{money(sale.buyerTotalCents, sale.currency)}</p><p className="text-muted-foreground">Costo PayPhone {sale.actualProcessingCents === null ? "estimado" : "conciliado"}</p></div>
                </div>
              ))}
            </div>
          </details>
        </section>
      ))}
      {!loading && !error && <p className="text-xs text-muted-foreground">Se muestran compras pagadas con registro de liquidación. Las compras anteriores a esta función requieren conciliación.</p>}
    </main>
  );
}
