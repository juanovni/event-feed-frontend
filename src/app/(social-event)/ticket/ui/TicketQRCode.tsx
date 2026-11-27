"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, CircleCheck, Clock, Copy, Download, Mail, MapPin } from "lucide-react";
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { eventApi } from "@/api/event.api";
import { AccessPass } from "@/interfaces";

type Pass = { id: string; token: string; redeemedAt: string | null; name?: string };

export const TicketQRCode = ({ ticket }: { ticket: AccessPass }) => {
  const [passes, setPasses] = useState<Pass[] | null>(null);
  const [error, setError] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qrOpen, setQrOpen] = useState(false);
  const [message, setMessage] = useState("");
  const qrContainers = useRef<Record<string, HTMLDivElement | null>>({});

  const downloadPass = async (pass: Pass, index: number) => {
    setDownloadError(false);
    let svgUrl: string | undefined;
    try {
      const svg = qrContainers.current[pass.id]?.querySelector("svg");
      if (!svg) throw new Error("No se encontró el código QR.");
      const svgCopy = svg.cloneNode(true) as SVGElement;
      svgCopy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const blob = new Blob([new XMLSerializer().serializeToString(svgCopy)], { type: "image/svg+xml;charset=utf-8" });
      svgUrl = URL.createObjectURL(blob);
      const image = new window.Image();
      image.src = svgUrl;
      await image.decode();

      const canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 1280;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("No se pudo crear la imagen.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.textAlign = "center";
      context.fillStyle = "#111111";
      context.font = "700 32px sans-serif";
      context.fillText("TheNextTicket", 480, 85);
      context.font = "700 42px sans-serif";

      const drawWrapped = (text: string, y: number, maxLines: number, lineHeight: number) => {
        const words = text.trim().split(/\s+/);
        const lines: string[] = [];
        let line = "";
        for (const word of words) {
          const next = line ? `${line} ${word}` : word;
          if (line && context.measureText(next).width > 800) {
            lines.push(line);
            line = word;
          } else {
            line = next;
          }
        }
        if (line) lines.push(line);
        const visible = lines.slice(0, maxLines);
        if (lines.length > maxLines) visible[maxLines - 1] += "…";
        visible.forEach((value, lineIndex) => context.fillText(value, 480, y + lineIndex * lineHeight, 800));
      };

      drawWrapped(ticket.event.title, 165, 2, 52);
      context.font = "500 28px sans-serif";
      context.fillStyle = "#525252";
      const eventDate = new Date(ticket.event.eventDate);
      context.fillText(eventDate.toLocaleString("es-EC", { dateStyle: "full", timeStyle: "short" }), 480, 280, 800);
      context.fillStyle = "#111111";
      context.font = "600 32px sans-serif";
      drawWrapped(`${pass.name ?? "Entrada"} · ${index + 1}`, 340, 1, 40);
      context.fillStyle = "#ffffff";
      context.fillRect(200, 385, 560, 560);
      context.drawImage(image, 240, 425, 480, 480);
      context.fillStyle = "#525252";
      context.font = "24px sans-serif";
      context.fillText("Presenta este código al ingresar", 480, 1005);
      context.font = "22px monospace";
      context.fillText(pass.token, 480, 1050, 840);
      context.font = "24px sans-serif";
      drawWrapped(ticket.event.location, 1110, 2, 34);

      const png = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(result => result ? resolve(result) : reject(new Error("No se pudo guardar la imagen.")), "image/png");
      });
      const downloadUrl = URL.createObjectURL(png);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `entrada-${pass.id}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 60000);
    } catch {
      setDownloadError(true);
    } finally {
      if (svgUrl) URL.revokeObjectURL(svgUrl);
    }
  };

  useEffect(() => {
    let active = true;
    eventApi.get<Pass[]>(`/admission/passes/${encodeURIComponent(ticket.id)}`)
      .then(({ data }) => { if (active) setPasses(data); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [ticket.id]);

  const selected = passes?.[selectedIndex];
  const eventDate = new Date(ticket.event.eventDate);
  const eventLink = typeof window === "undefined" ? "" : `${window.location.origin}/p/${ticket.event.slug || ""}`;
  const copyCode = async () => {
    try { await navigator.clipboard.writeText(selected!.token); setMessage("Código copiado."); }
    catch { setMessage("No se pudo copiar el código."); }
  };
  return (
    <div className="space-y-4">
      <section className="space-y-4" aria-labelledby="ticket-selection-title">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Acceso al evento</p><h2 id="ticket-selection-title" className="mt-2 text-2xl font-semibold">Tus entradas</h2></div>
        {error && <p role="alert">No se pudieron cargar tus entradas.</p>}
        {downloadError && <p role="alert" className="text-sm text-destructive">No se pudo descargar la entrada. Inténtalo nuevamente.</p>}
        {!passes && !error && <p role="status">Cargando entradas...</p>}
        {passes && passes.length > 0 && <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Seleccionar entrada">
          {passes.map((pass, index) => <button key={pass.id} type="button" aria-pressed={selectedIndex === index} onClick={() => { setSelectedIndex(index); setMessage(""); }} className={`h-24 min-w-56 flex-1 cursor-pointer overflow-hidden rounded-xl border p-4 text-left text-sm transition-colors hover:border-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${selectedIndex === index ? "border-black bg-gray-100" : "bg-white"}`}><span className="flex items-center justify-between font-semibold">Entrada {index + 1}{selectedIndex === index && <Check className="size-4" />}</span><span className="mt-1 block truncate text-muted-foreground">{pass.name ?? "Entrada"}{pass.redeemedAt ? " · Canjeada" : ""}</span></button>)}
        </div>}
      </section>
      <Card className="relative"><span aria-hidden="true" className="pointer-events-none absolute -left-px top-1/2 z-10 h-6 w-3 -translate-y-1/2 rounded-r-full border border-l-0 border-gray-200 bg-gray-50" /><span aria-hidden="true" className="pointer-events-none absolute -right-px top-1/2 z-10 h-6 w-3 -translate-y-1/2 rounded-l-full border border-r-0 border-gray-200 bg-gray-50" /><CardContent className="space-y-4 p-0">
        {selected && <div className="grid overflow-hidden md:grid-cols-2">
          <div className="border-b border-dashed p-6 md:border-b-0 md:border-r">
            <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold uppercase ${selected.redeemedAt ? "bg-gray-100 text-gray-600" : "bg-teal-50 text-teal-700"}`}><CircleCheck className="size-4" />{selected.redeemedAt ? "Canjeada" : "Activa"}</span>
            <h2 className="mt-3 text-xl font-semibold">{selected.name ?? "Entrada"}</h2><p className="mt-1 text-sm text-muted-foreground">{selected.redeemedAt ? "Esta entrada ya fue utilizada." : "Presenta este código al ingresar al evento."}</p>
            {!selected.redeemedAt && <button type="button" aria-label={`Ampliar código QR de la entrada ${selectedIndex + 1}`} onClick={() => setQrOpen(true)} className="mx-auto mt-5 block cursor-zoom-in rounded-xl bg-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><div ref={element => { qrContainers.current[selected.id] = element; }}><QRCode value={selected.token} size={200} level="H" /></div></button>}
            <p className="mt-3 break-all text-center font-mono text-xs text-muted-foreground">{selected.token}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2"><Button type="button" variant="outline" onClick={() => void copyCode()}><Copy className="size-4" /> Copiar código</Button>{!selected.redeemedAt && <Button type="button" variant="outline" onClick={() => void downloadPass(selected, selectedIndex)}><Download className="size-4" /> Descargar entrada</Button>}</div>
          </div>
          <div className="space-y-5 p-6"><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Detalle del evento</p><h2 className="text-xl font-semibold">{ticket.event.title}</h2><div className="space-y-4 text-sm"><p className="flex gap-3"><CalendarDays className="size-5 shrink-0" />{eventDate.toLocaleDateString("es-EC", { dateStyle: "full" })}</p><p className="flex gap-3"><Clock className="size-5 shrink-0" />{eventDate.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}</p><p className="flex gap-3"><MapPin className="size-5 shrink-0" />{ticket.event.location}</p></div><div className="flex flex-wrap gap-2 border-t pt-5"><Button asChild variant="outline"><a href={`mailto:?subject=${encodeURIComponent(ticket.event.title)}&body=${encodeURIComponent(`Mira este evento: ${eventLink}`)}`}><Mail className="size-4" /> Enviar evento por correo</a></Button></div><p className="text-xs text-muted-foreground">Se envía el enlace del evento, no tu entrada ni su código QR.</p></div>
        </div>}
        {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
        {passes?.length === 0 && <p>No hay accesos disponibles para esta compra.</p>}
      </CardContent>
    </Card>
    <Dialog open={qrOpen} onOpenChange={setQrOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm">
        <DialogTitle className="pr-8">{selected?.name ?? "Entrada"} · {selectedIndex + 1}</DialogTitle>
        <DialogDescription>Presenta este código al ingresar al evento.</DialogDescription>
        {selected?.redeemedAt ? <p className="py-12 text-center text-muted-foreground">Esta entrada ya fue canjeada.</p> : selected && <div className="w-full bg-white p-2"><QRCode value={selected.token} size={320} level="H" style={{ width: "100%", height: "auto" }} /></div>}
        {passes && passes.length > 1 && <div className="flex items-center justify-between"><Button type="button" variant="outline" size="icon" aria-label="Entrada anterior" disabled={selectedIndex === 0} onClick={() => setSelectedIndex((index) => index - 1)}><ChevronLeft className="size-4" /></Button><span className="text-sm text-muted-foreground" aria-live="polite">{selectedIndex + 1} / {passes.length}</span><Button type="button" variant="outline" size="icon" aria-label="Entrada siguiente" disabled={selectedIndex === passes.length - 1} onClick={() => setSelectedIndex((index) => index + 1)}><ChevronRight className="size-4" /></Button></div>}
      </DialogContent>
    </Dialog></div>
  );
};
