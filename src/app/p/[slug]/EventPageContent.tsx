'use client';

import { use } from "react";
import { useEventBySlug } from "@/hooks";
import { EventDetailPage, EventSkeletonCard } from "@/components";

interface Props {
  params: Promise<{ slug: string }>;
}

export function EventPageContent({ params }: Props) {
  const { slug } = use(params);
  const { data: event, isLoading, isError } = useEventBySlug(slug);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EventSkeletonCard />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-16 text-center sm:px-6">
        <section
          aria-labelledby="event-unavailable-title"
          className="space-y-3 rounded-[28px] border border-black/8 bg-white/80 px-8 py-10 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Evento no disponible
          </p>
          <h1
            id="event-unavailable-title"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            No fue posible cargar este evento
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Verifica el enlace o intenta nuevamente en unos minutos.
          </p>
        </section>
      </div>
    );
  }

  return <EventDetailPage event={event} />;
}
