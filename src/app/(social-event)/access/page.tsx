"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { eventApi } from "@/api/event.api";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Event = { id: string; title: string; eventDate: string };
type Assignment = { id: string; status: string; event: Event };
type Staff = { id: string; status: string; user: { name: string | null; email: string } };
type Result = { status: string; redeemedAt?: string; ticketName?: string };
type Scan = { id: string; result: string; createdAt: string; actor: { name: string | null; username: string } };

export default function AccessPage() {
  const user = useAuthStore(state => state.user);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [managed, setManaged] = useState<Event[]>([]);
  const [selected, setSelected] = useState("");
  const [staff, setStaff] = useState<Staff[]>([]);
  const [history, setHistory] = useState<Scan[]>([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const reader = useRef<Html5Qrcode | null>(null);
  const active = useRef(false);
  const events = [...managed, ...assignments.filter(a => a.status === "accepted" && !managed.some(e => e.id === a.event.id)).map(a => a.event)];
  const canManage = managed.some(event => event.id === selected);

  const refresh = useCallback(async () => {
    const [a, e] = await Promise.all([eventApi.get<Assignment[]>("/admission/assignments"), eventApi.get<Event[]>("/admission/managed-events")]);
    setAssignments(a.data);
    setManaged(e.data);
  }, []);

  useEffect(() => {
    refresh().catch(() => setError("No se pudieron cargar los eventos.")).finally(() => setLoading(false));
    return () => { active.current = false; const instance = reader.current; if (instance?.isScanning) void instance.stop().catch(() => {}); };
  }, [refresh]);

  useEffect(() => {
    setStaff([]);
    setHistory([]);
    setResult(null);
    if (selected && canManage) {
      eventApi.get<Staff[]>(`/admission/events/${encodeURIComponent(selected)}/staff`)
        .then(({ data }) => setStaff(data)).catch(() => setError("No se pudo cargar el personal."));
      eventApi.get<Scan[]>(`/admission/events/${encodeURIComponent(selected)}/history`)
        .then(({ data }) => setHistory(data)).catch(() => setError("No se pudo cargar el historial."));
    }
  }, [selected, canManage]);

  const accept = async (id: string) => {
    try { await eventApi.post(`/admission/assignments/${encodeURIComponent(id)}/accept`); await refresh(); }
    catch { setError("No se pudo aceptar la invitación."); }
  };

  const invite = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await eventApi.post(`/admission/events/${encodeURIComponent(selected)}/staff`, { email });
      setEmail("");
      const { data } = await eventApi.get<Staff[]>(`/admission/events/${encodeURIComponent(selected)}/staff`);
      setStaff(data);
    } catch (e: unknown) {
      const response = e as { response?: { data?: { message?: string } } };
      setError(response.response?.data?.message ?? "No se pudo crear la invitación.");
    }
  };

  const revoke = async (id: string) => {
    try {
      await eventApi.delete(`/admission/events/${encodeURIComponent(selected)}/staff/${encodeURIComponent(id)}`);
      setStaff(current => current.filter(item => item.id !== id));
    } catch { setError("No se pudo revocar el acceso."); }
  };

  const redeem = async (value: string) => {
    if (!selected || !value.trim()) return;
    setError("");
    setResult(null);
    try {
      const { data } = await eventApi.post<Result>(`/admission/events/${encodeURIComponent(selected)}/redeem`, { token: value.trim() });
      setResult(data);
      if (canManage) {
        const historyResponse = await eventApi.get<Scan[]>(`/admission/events/${encodeURIComponent(selected)}/history`);
        setHistory(historyResponse.data);
      }
    } catch { setError("No se pudo validar la entrada."); }
  };

  const stop = async () => {
    active.current = false;
    const instance = reader.current;
    if (instance?.isScanning) await instance.stop();
    setScanning(false);
  };

  const start = async () => {
    setError("");
    setResult(null);
    try {
      const instance = reader.current ?? new Html5Qrcode("access-qr-reader");
      reader.current = instance;
      active.current = true;
      setScanning(true);
      await instance.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 240, height: 240 } }, async value => {
        if (!active.current) return;
        active.current = false;
        try { await instance.stop(); } finally { setScanning(false); }
        setToken(value);
        await redeem(value);
      }, () => {});
      if (!active.current && instance.isScanning) await instance.stop();
    } catch {
      active.current = false;
      setScanning(false);
      setError("No se pudo abrir la cámara. Revisa los permisos y usa una conexión HTTPS.");
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <header><h1 className="text-2xl font-semibold">Control de acceso</h1><p className="mt-2 text-sm text-muted-foreground">Gestiona el personal y valida las entradas de cada evento.</p></header>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading && <p role="status">Cargando eventos...</p>}
      {assignments.some(item => item.status === "pending") && (
        <section className="space-y-3 rounded-2xl border bg-card p-5">
          <h2 className="font-semibold">Invitaciones</h2>
          {assignments.filter(item => item.status === "pending").map(item => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-3"><span>{item.event.title}</span><Button type="button" variant="outline" onClick={() => accept(item.id)}>Aceptar invitación</Button></div>
          ))}
        </section>
      )}
      <section className="space-y-4 rounded-2xl border bg-card p-5">
        <label htmlFor="access-event" className="block text-sm font-medium">Evento</label>
        <select id="access-event" className="h-10 w-full rounded-md border bg-background px-3" value={selected} onChange={event => { void stop(); setSelected(event.target.value); }}>
          <option value="">Selecciona un evento</option>
          {events.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}
        </select>
        {!loading && !events.length && <p className="text-sm text-muted-foreground">No tienes eventos asignados para controlar acceso.</p>}
      </section>
      {selected && (
        <section className="space-y-4 rounded-2xl border bg-card p-5">
          <h2 className="font-semibold">Validar entrada</h2>
          <div id="access-qr-reader" className="mx-auto w-full max-w-sm" />
          <Button type="button" onClick={scanning ? () => void stop() : () => void start()}>{scanning ? "Cerrar cámara" : "Abrir cámara"}</Button>
          <form onSubmit={event => { event.preventDefault(); void redeem(token); }} className="flex flex-wrap gap-2">
            <Input value={token} onChange={event => setToken(event.target.value)} placeholder="Código de la entrada" aria-label="Código de la entrada" className="flex-1 min-w-48" />
            <Button type="submit" variant="outline">Validar código</Button>
          </form>
          {result && <p role="status" className={result.status === "redeemed" ? "rounded-lg bg-green-50 p-3 text-green-800" : "rounded-lg bg-amber-50 p-3 text-amber-900"}>
            {result.status === "redeemed" ? `${result.ticketName ?? "Entrada"} válida y canjeada.` : result.status === "already_redeemed" ? `Entrada ya canjeada${result.redeemedAt ? ` el ${new Date(result.redeemedAt).toLocaleString("es-EC")}` : ""}.` : "Entrada inválida o de otro evento."}
          </p>}
        </section>
      )}
      {selected && canManage && (
        <section className="space-y-4 rounded-2xl border bg-card p-5">
          <div><h2 className="font-semibold">Personal de acceso</h2><p className="text-sm text-muted-foreground">Invita a una persona con cuenta registrada. Debe aceptar desde Control de acceso.</p></div>
          <form onSubmit={invite} className="flex flex-wrap gap-2"><Input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Correo de la persona" aria-label="Correo de la persona" className="flex-1 min-w-48" /><Button type="submit">Invitar</Button></form>
          {staff.filter(item => item.status !== "revoked").map(item => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 border-t pt-3"><div><p className="text-sm font-medium">{item.user.name || item.user.email}</p><p className="text-xs text-muted-foreground">{item.user.email} · {item.status === "accepted" ? "Aceptada" : "Pendiente"}</p></div><Button type="button" variant="outline" onClick={() => revoke(item.id)}>Revocar</Button></div>
          ))}
        </section>
      )}
      {selected && canManage && (
        <section className="space-y-3 rounded-2xl border bg-card p-5">
          <h2 className="font-semibold">Historial de validaciones</h2>
          <p className="text-sm text-muted-foreground">Últimas 100 lecturas del evento.</p>
          {!history.length && <p className="text-sm text-muted-foreground">Aún no hay validaciones.</p>}
          {history.map(scan => (
            <div key={scan.id} className="flex flex-wrap justify-between gap-2 border-t pt-3 text-sm">
              <div><p>{scan.result === "redeemed" ? "Entrada canjeada" : scan.result === "already_redeemed" ? "Ya canjeada" : "Código inválido"}</p><p className="text-muted-foreground">{scan.actor.name || scan.actor.username}</p></div>
              <time dateTime={scan.createdAt} className="text-muted-foreground">{new Date(scan.createdAt).toLocaleString("es-EC")}</time>
            </div>
          ))}
        </section>
      )}
      {!user && <p>Inicia sesión para continuar.</p>}
    </main>
  );
}
