"use client";

import { useEffect, useState } from "react";
import { eventApi } from "@/api/event.api";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Rates = {
  commissionRate: number;
  commissionTaxRate: number;
  processingRate: number;
  processingTaxRate: number;
};

type Sale = {
  id: string;
  eventTitle: string;
  organizer: string;
  buyerTotalCents: number;
  commissionCents: number;
  commissionTaxCents: number;
  estimatedProcessingCents: number;
  actualProcessingCents: number | null;
  currency: string;
};

type OrganizerSummary = {
  organizerId: string;
  organizerName: string;
  currency: string;
  ticketsSold: number;
  salesCents: number;
  commissionCents: number;
  estimatedPayoutCents: number;
  reconciledPayoutCents: number | null;
  pendingFees: number;
};

const labels: Record<keyof Rates, string> = {
  commissionRate: "Comisión de TheNextTicket",
  commissionTaxRate: "IVA de la comisión",
  processingRate: "Tarifa estimada de PayPhone",
  processingTaxRate: "IVA de la tarifa de PayPhone",
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("es-EC", { style: "currency", currency }).format(cents / 100);
}

export default function SettlementAdminPage() {
  const user = useAuthStore(state => state.user);
  const [rates, setRates] = useState<Rates | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sales, setSales] = useState<Sale[]>([]);
  const [summary, setSummary] = useState<OrganizerSummary[]>([]);
  const [legacyCount, setLegacyCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fees, setFees] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [configResponse, salesResponse, summaryResponse] = await Promise.all([
        eventApi.get<Rates>("/settlements/admin/config"),
        eventApi.get<Sale[]>("/settlements/admin/sales"),
        eventApi.get<{ organizers: OrganizerSummary[]; legacyCount: number }>("/settlements/admin/summary"),
      ]);
      setRates(configResponse.data);
      setValues(Object.fromEntries(Object.entries(configResponse.data).map(([key, value]) => [key, String(Number((value * 100).toFixed(4)))])));
      setSales(salesResponse.data);
      setSummary(summaryResponse.data.organizers);
      setLegacyCount(summaryResponse.data.legacyCount);
      setLoaded(true);
      setError("");
    } catch {
      setError("No se pudo cargar la información de liquidaciones.");
    }
  };

  useEffect(() => {
    if (user?.role === "admin") void load();
  }, [user?.role]);

  const saveRates = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!rates) return;
    const data = Object.fromEntries(Object.keys(labels).map(key => [key, Number(values[key]) / 100]));
    if (Object.keys(labels).some(key => !values[key]?.trim() || !Number.isFinite(data[key]) || data[key] < 0 || data[key] > 1)) {
      toast.error("Ingresa porcentajes entre 0 y 100.");
      return;
    }
    setBusy(true);
    try {
      await eventApi.put("/settlements/admin/config", data);
      toast.success("Configuración actualizada.");
      await load();
    } catch {
      toast.error("No se pudo actualizar la configuración.");
    } finally {
      setBusy(false);
    }
  };

  const saveFee = async (sale: Sale) => {
    const text = fees[sale.id]?.trim() ?? "";
    if (!/^\d+(?:\.\d{1,2})?$/.test(text)) {
      toast.error("Ingresa un importe válido con hasta dos decimales.");
      return;
    }
    setBusy(true);
    try {
      await eventApi.patch(`/settlements/${sale.id}/processing-fee`, { actualProcessingCents: Math.round(Number(text) * 100) });
      toast.success("Costo registrado.");
      await load();
    } catch {
      toast.error("No se pudo registrar el costo.");
    } finally {
      setBusy(false);
    }
  };

  if (user?.role !== "admin") return <main className="p-8">Acceso reservado para administradores.</main>;

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-8">
      <header>
        <h1 className="text-2xl font-semibold">Administración de liquidaciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">Configura las tasas y revisa los costos de las ventas pagadas.</p>
      </header>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <section className="rounded-2xl border bg-card p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Tasas generales</h2>
          <p className="text-sm text-muted-foreground">Los cambios se aplican a compras nuevas. Las ventas anteriores conservan sus tasas.</p>
        </div>
        {rates && (
          <form onSubmit={saveRates} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(labels) as (keyof Rates)[]).map(key => (
                <label key={key} className="space-y-2 text-sm font-medium">
                  <span>{labels[key]} (%)</span>
                  <Input type="number" min="0" max="100" step="0.0001" value={values[key] ?? ""} onChange={event => setValues({ ...values, [key]: event.target.value })} required />
                </label>
              ))}
            </div>
            <Button type="submit" disabled={busy}>Guardar tasas</Button>
          </form>
        )}
      </section>
      <section className="rounded-2xl border bg-card p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Resumen por organizador</h2>
          <p className="text-sm text-muted-foreground">Incluye ventas pagadas con registro de comisión. Las cantidades calculadas aún no descuentan transferencias ni devoluciones.</p>
        </div>
        {legacyCount > 0 && <p className="rounded-lg bg-muted p-3 text-sm">{legacyCount} compras pagadas anteriores no tienen registro de comisión y requieren conciliación.</p>}
        {loaded && summary.length === 0 && <p className="text-sm text-muted-foreground">No hay ventas registradas para resumir.</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {summary.map(item => (
            <div key={`${item.organizerId}-${item.currency}`} className="rounded-xl border p-4 space-y-3">
              <h3 className="font-semibold">{item.organizerName}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3"><dt>Entradas vendidas</dt><dd>{item.ticketsSold}</dd></div>
                <div className="flex justify-between gap-3"><dt>Total pagado por compradores</dt><dd>{money(item.salesCents, item.currency)}</dd></div>
                <div className="flex justify-between gap-3"><dt>Comisión de TheNextTicket sin IVA</dt><dd>{money(item.commissionCents, item.currency)}</dd></div>
                <div className="flex justify-between gap-3 border-t pt-2 font-semibold"><dt>Liquidación calculada</dt><dd>{money(item.estimatedPayoutCents, item.currency)}</dd></div>
              </dl>
              <p className="text-xs text-muted-foreground">
                {item.pendingFees > 0 ? `${item.pendingFees} venta(s) usan costo estimado de PayPhone.` : "Costos de PayPhone conciliados."}
                {" "}La comisión mostrada es ingreso bruto, antes de otros gastos.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-6 space-y-4">
        <div><h2 className="text-lg font-semibold">Ventas pagadas</h2><p className="text-sm text-muted-foreground">Se muestran hasta 100 ventas recientes con registro de comisión.</p></div>
        {loaded && !sales.length && !error && <p className="text-sm text-muted-foreground">No hay ventas registradas.</p>}
        <div className="space-y-3">
          {sales.map(sale => (
            <div key={sale.id} className="rounded-xl border p-4 space-y-3">
              <div className="flex flex-wrap justify-between gap-2">
                <div><p className="font-medium">{sale.eventTitle}</p><p className="text-sm text-muted-foreground">@{sale.organizer}</p></div>
                <p className="font-semibold">{money(sale.buyerTotalCents, sale.currency)}</p>
              </div>
              <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                <p>Comisión: {money(sale.commissionCents, sale.currency)}</p>
                <p>IVA de comisión: {money(sale.commissionTaxCents, sale.currency)}</p>
                <p>PayPhone estimado: {money(sale.estimatedProcessingCents, sale.currency)}</p>
                <p>PayPhone conciliado: {sale.actualProcessingCents === null ? "Pendiente" : money(sale.actualProcessingCents, sale.currency)}</p>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <label className="space-y-1 text-sm"><span>Costo real de PayPhone ({sale.currency})</span><Input inputMode="decimal" placeholder="0.00" value={fees[sale.id] ?? ""} onChange={event => setFees({ ...fees, [sale.id]: event.target.value })} /></label>
                <Button type="button" variant="outline" disabled={busy} onClick={() => saveFee(sale)}>Registrar costo</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
