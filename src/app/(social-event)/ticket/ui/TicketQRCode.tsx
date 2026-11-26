"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { eventApi } from "@/api/event.api";
import { AccessPass } from "@/interfaces";

type Pass = { id: string; token: string; redeemedAt: string | null; name?: string };

export const TicketQRCode = ({ ticket }: { ticket: AccessPass }) => {
  const [passes, setPasses] = useState<Pass[] | null>(null);
  const [error, setError] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
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
      context.fillText("QueBuenPlan!", 480, 85);
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

  return (
    <Card>
      <CardHeader className="text-center"><CardTitle className="text-2xl">{ticket.event.title}</CardTitle></CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {error && <p role="alert">No se pudieron cargar tus entradas.</p>}
        {downloadError && <p role="alert" className="text-sm text-destructive">No se pudo descargar la entrada. Inténtalo nuevamente.</p>}
        {!passes && !error && <p role="status">Cargando entradas...</p>}
        {passes?.map((pass, index) => (
          <div key={pass.id} className="flex flex-col items-center gap-3">
            <p className="font-medium">{pass.name ?? "Entrada"} · {index + 1}</p>
            {pass.redeemedAt ? <p className="text-sm">Entrada canjeada</p> : <div ref={element => { qrContainers.current[pass.id] = element; }} className="rounded-xl bg-white p-6"><QRCode value={pass.token} size={200} level="H" /></div>}
            <p className="text-sm text-muted-foreground">Código: <span className="font-mono break-all">{pass.token}</span></p>
            {!pass.redeemedAt && (
              <Button type="button" variant="outline" onClick={() => void downloadPass(pass, index)}>
                <Download aria-hidden="true" className="h-4 w-4" />
                Descargar entrada
              </Button>
            )}
          </div>
        ))}
        {passes?.length === 0 && <p>No hay accesos disponibles para esta compra.</p>}
      </CardContent>
    </Card>
  );
};
