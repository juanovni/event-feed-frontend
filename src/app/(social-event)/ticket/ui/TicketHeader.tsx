import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { Event } from "@/interfaces";

export const TicketHeader = ({ event }: { event: Event }) => {
  const date = new Date(event.eventDate);
  return (
    <div className="space-y-5">
      <Link href="/tickets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><span className="rounded-lg border bg-white p-2"><ArrowLeft className="size-4" /></span>Mis entradas <span aria-hidden="true">/</span> <span className="font-medium text-foreground">Detalle de entrada</span></Link>
      <header className="relative overflow-hidden rounded-2xl bg-[#123943] px-6 py-8 text-white sm:px-10 sm:py-10">
        {event.mediaType === "image" && event.mediaUrl && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${JSON.stringify(event.mediaUrl)})` }} />}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/65" />
        <div className="relative space-y-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-200"><span className="size-2 rounded-full bg-teal-300" />Acceso confirmado</p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{event.title}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-teal-50"><span className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0" />{date.toLocaleDateString("es-EC", { dateStyle: "long" })}</span><span className="flex items-center gap-2"><Clock className="size-4 shrink-0" />{date.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}</span><span className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />{event.location}</span></div>
        </div>
      </header>
    </div>
  );
};
