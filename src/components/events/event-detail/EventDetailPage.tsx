'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  ImageUpIcon,
  LoaderCircle,
  MapPin,
  Users,
} from "lucide-react";
import {
  AvatarProfile,
  AvatarsFriendsWidget,
  EventAttendeesDialog,
  FollowerButton,
  InterestedButton,
  MapPreview,
  PaymentModal,
  PublisherEventStats,
  ShareEventButton,
  UploadGalleryImageDialog,
} from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/interfaces";
import { useAuthStore, useEventAttendeesDialogStore } from "@/store";
import {
  currencyFormat,
  formatDate,
  formatTime,
  getAttendanceAccessPassId,
  getTotalPrice,
} from "@/utils";
import {
  useEventImages,
  useEventsByUser,
  useLocationSearch,
  useRequireAuth,
  useToggleAttend,
} from "@/hooks";
import ExpandableText from "@/components/ui/expandable-text/ExpandableText";
import { EventMediaBlock } from "./EventMediaBlock";

interface Props {
  event: Event;
}

const getPriceLabel = (event: Event) => {
  if (!event.eventTicketTypes?.length) {
    return "Entrada gratuita";
  }

  if (event.eventTicketTypes.length === 1) {
    return `${event.eventTicketTypes[0].name} - $${currencyFormat(event.eventTicketTypes[0].price)} ${event.currency}`;
  }

  const cheapestTicket = Math.min(...event.eventTicketTypes.map((ticket) => ticket.price));
  return `Tickets desde $${currencyFormat(cheapestTicket)} ${event.currency}`;
};

function EventLocationSection({ location }: { location: string }) {
  const { suggestions, loading, searchLocations } = useLocationSearch();

  useEffect(() => {
    searchLocations(location);
  }, [location, searchLocations]);

  const firstMatch = suggestions[0];
  const directionsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(location)}`;

  return (
    <Card className="border-black/8 bg-white/88 py-0 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <CardContent className="space-y-5 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Ubicación
            </p>
            <h2 className="text-lg font-semibold text-foreground">Cómo llegar</h2>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted sm:w-auto"
          >
            Ver mapa
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-3xl border border-black/6 bg-muted/45 p-4">
          <div className="mb-4 flex min-w-0 items-start gap-3">
            <div className="rounded-full bg-white p-2 shadow-sm">
              <MapPin className="h-4 w-4 text-foreground" />
            </div>
            <div className="min-w-0">
              <p className="break-words font-medium text-foreground">{location}</p>
              <p className="text-sm text-muted-foreground">
                {loading
                  ? "Buscando la mejor referencia de mapa..."
                  : firstMatch
                    ? "Vista aproximada generada desde OpenStreetMap."
                    : "No se encontró una coordenada exacta, pero puedes abrir la búsqueda completa del lugar."}
              </p>
            </div>
          </div>

          {firstMatch ? (
            <div className="overflow-hidden rounded-2xl border border-black/6 bg-white p-2">
              <MapPreview
                latitude={firstMatch.lat}
                longitude={firstMatch.lon}
                locationName={firstMatch.display_name}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/10 bg-white/70 px-4 py-6 text-sm text-muted-foreground">
              Abre el mapa externo para ver resultados detallados de esta ubicación.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface OrganizerEventsSectionProps {
  organizerId: string;
  organizerName: string;
  currentEventId: string;
}

function OrganizerEventsSection({ organizerId, organizerName, currentEventId }: OrganizerEventsSectionProps) {
  const { data: events, isLoading } = useEventsByUser(organizerId);

  const otherEvents = events?.filter((e) => e.id !== currentEventId) ?? [];

  if (isLoading || otherEvents.length === 0) return null;

  return (
    <div className="space-y-6 border-t border-black/6 pt-8 sm:pt-10">
      <div className="flex items-baseline justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Mismo anfitrión
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Más planes de {organizerName}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherEvents.slice(0, 3).map((e) => (
          <a
            key={e.id}
            href={`/p/${e.slug}`}
            className="group overflow-hidden rounded-[20px] border border-black/8 bg-white/90 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] transition hover:shadow-[0_16px_45px_-12px_rgba(15,23,42,0.35)] hover:-translate-y-0.5"
          >
            {e.mediaType === "image" && e.mediaUrl && (
              <div className="overflow-hidden bg-muted">
                <Image
                  src={e.mediaUrl}
                  width={600}
                  height={340}
                  alt={e.title}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="space-y-2 p-4">
              {e.category && (
                <Badge className="rounded-full border border-black/10 bg-muted px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {e.category}
                </Badge>
              )}
              <p className="line-clamp-2 font-semibold leading-snug text-foreground group-hover:underline group-hover:underline-offset-2">
                {e.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(e.eventDate)}
              </div>
              {e.location && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{e.location}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function EventDetailPage({ event }: Props) {
  const { user } = useAuthStore();
  const openAttendeesDialog = useEventAttendeesDialogStore((state) => state.openDialog);
  const { requireAuth } = useRequireAuth();
  const { mutateAsync: attendEvent } = useToggleAttend();
  const [assist, setAssist] = useState(event.hasPaid || event.isAttending);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const { data: galleryImages } = useEventImages(event.id);
  const totalCost = getTotalPrice(event);
  const isEventOwner = user?.id === event.user.id;
  const canViewAttendees = user?.role === "publisher";
  const isConfirmed = event.hasPaid || assist;
  const isPastEvent = new Date(event.eventDate).getTime() < Date.now();
  const priceLabel = getPriceLabel(event);
  const accessUrl = totalCost > 0 ? "/tickets" : `/ticket/${getAttendanceAccessPassId(event.id)}`;
  const eventSummary = [
    event.description?.trim(),
    event.location ? `Ubicación: ${event.location}.` : null,
    event.category ? `Categoría: ${event.category}.` : null,
  ].filter(Boolean).join(" ");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: eventSummary,
    startDate: new Date(event.eventDate).toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: isPastEvent
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    image: event.mediaUrl ? [event.mediaUrl] : undefined,
    location: {
      "@type": "Place",
      name: event.location,
      address: event.location,
    },
    organizer: {
      "@type": "Person",
      name: event.user.name,
    },
  };

  const handlePaymentSuccess = () => {
    setAssist(true);
  };

  const handleAttendance = () => {
    requireAuth(
      async () => {
        if (totalCost > 0) {
          setShowPaymentModal(true);
          return;
        }

        try {
          setIsSubmittingAttendance(true);
          const response = await attendEvent(event.id);

          if (response?.attending) {
            setAssist(true);
          }
        } catch (error) {
          console.error("Error al confirmar asistencia", error);
        } finally {
          setIsSubmittingAttendance(false);
        }
      },
      {
        event,
        action: "JOIN",
      }
    );
  };

  const handleOpenUpload = () => {
    requireAuth(() => setOpenUpload(true));
  };

  const handleOpenAttendees = () => {
    openAttendeesDialog({
      eventId: event.id,
      eventTitle: event.title,
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-3 sm:gap-8 sm:px-6 sm:py-4 lg:px-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
              <span className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1.5 shadow-sm">
                <CalendarDays className="h-4 w-4" />
                {formatDate(event.eventDate)}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1.5 shadow-sm">
                <Clock3 className="h-4 w-4" />
                {formatTime(event.eventDate)}
              </span>
              {event.category && (
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1.5 shadow-sm">
                  {event.category}
                </span>
              )}
            </div>
          </header>

          <EventMediaBlock
            event={event}
            galleryImages={galleryImages || []}
            objectFit="contain"
            className="block overflow-hidden md:hidden"
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,460px)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,520px)]">
            <div className="order-2 min-w-0 space-y-5 sm:space-y-6 lg:order-1">

              <EventMediaBlock
                event={event}
                galleryImages={galleryImages || []}
                objectFit="cover"
                className="hidden overflow-hidden rounded-xl border border-black/8 bg-white/85 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm md:block"
              />

              <div className="space-y-6">
                <section aria-labelledby="event-community-title">
                  <Card className="border-black/8 bg-white/88 py-0 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                    <CardContent className="space-y-5 p-4 sm:p-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Comunidad
                        </p>
                        <h2 id="event-community-title" className="text-lg font-semibold text-foreground">
                          La gente detrás del plan
                        </h2>
                      </div>

                      {/* Organizer block */}
                      <div className="space-y-3 rounded-3xl border border-black/6 bg-white p-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Organiza
                        </p>
                        <div className="flex items-start justify-between gap-3">
                          <AvatarProfile
                            name={event.user.name}
                            username={event.user.username}
                            image={event.user.avatar}
                            className="h-12 w-12"
                          />
                          {!isEventOwner && user && <FollowerButton event={event} />}
                        </div>
                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                          Sigue al anfitrión para estar al tanto de sus próximos planes.
                        </p>
                      </div>

                      {/* Social affinity block */}
                      {user && (
                        <div className="space-y-3 rounded-3xl border border-black/6 bg-muted/50 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                              Ya confirmaron
                            </p>
                            {canViewAttendees ? (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto rounded-full bg-white px-2.5 py-1 shadow-sm hover:bg-white"
                                onClick={handleOpenAttendees}
                              >
                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs font-semibold text-foreground">{event.attendees}</span>
                              </Button>
                            ) : (
                              <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-sm">
                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs font-semibold text-foreground">{event.attendees}</span>
                              </div>
                            )}
                          </div>
                          <AvatarsFriendsWidget eventId={event.id} />
                        </div>
                      )}

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-muted px-4 py-3">
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Interesados</p>
                          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{event.interested}</p>
                        </div>
                        <div className="rounded-2xl bg-muted px-4 py-3">
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Asistentes</p>
                          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{event.attendees}</p>
                          {canViewAttendees && isEventOwner && (
                            <Button
                              type="button"
                              variant="link"
                              className="mt-1 h-auto p-0 text-xs text-muted-foreground"
                              onClick={handleOpenAttendees}
                            >
                              Ver listado
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section aria-labelledby="event-details-title">
                  <Card className="border-black/8 bg-white/88 py-0 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                    <CardContent className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
                      <div className="space-y-4 border-b border-black/6 pb-6">
                        <div className="space-y-3">
                          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            Detalles
                          </p>
                          <h2 id="event-details-title" className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            Información del evento
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Acerca del evento</h3>
                        <div className="max-w-3xl text-[15px] leading-7 text-muted-foreground">
                          <ExpandableText text={event.description} maxLines={1} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

              </div>
            </div>

            <aside className="order-1 min-w-0 space-y-4 sm:space-y-6 lg:order-2 lg:sticky lg:top-14">


              <Card className="overflow-hidden rounded-xl border border-black/8 bg-white/92 py-0 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                <CardContent className="space-y-5 p-4 sm:space-y-6 sm:p-6">
                  <div className="space-y-4 border-b border-black/6 pb-6">
                    <div className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                        Evento en QueBuenPlan!
                      </p>
                      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        {event.title}
                      </h1>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Inscripción
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          Reserva tu lugar
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">

                        {isConfirmed ? (
                          <Badge variant="default" className="rounded-full px-3 py-1">
                            Confirmado
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="rounded-full px-3 py-1">
                            Disponible
                          </Badge>
                        )}

                        <ShareEventButton event={event} />
                      </div>
                    </div>


                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 text-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{formatDate(event.eventDate)}</p>
                          <p>{formatTime(event.eventDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-muted/70 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Acceso
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{priceLabel}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {isPastEvent
                        ? "Este evento ya finalizó. Puedes revisar sus detalles y la galería publicada."
                        : isConfirmed
                          ? "Tu confirmación ya está activa. Encontrarás el acceso y su QR dentro de Tickets."
                          : "Reserva tu lugar y mantén tu confirmación sincronizada con el resto de la experiencia."}
                    </p>

                    {event.eventTicketTypes?.length > 0 && (
                      <div className="mt-4 space-y-3 rounded-2xl border border-black/6 bg-white/80 p-4">
                        {event.eventTicketTypes.map((ticket) => (
                          <p className="text-sm text-muted-foreground" key={ticket.id}>
                            {ticket.quantity} disponibles
                            {ticket.validUntil ? ` · Válido hasta ${formatDate(new Date(ticket.validUntil))}` : ""}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {!isEventOwner && (
                      <Button
                        size="lg"
                        className="h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                        onClick={handleAttendance}
                        disabled={isConfirmed || isPastEvent || isSubmittingAttendance}
                      >
                        {isSubmittingAttendance ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Confirmando...
                          </>
                        ) : isConfirmed ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Asistencia confirmada
                          </>
                        ) : totalCost > 0 ? (
                          <>
                            <CreditCard className="h-4 w-4" />
                            Comprar entrada
                          </>
                        ) : (
                          <>
                            <Users className="h-4 w-4" />
                            Confirmar asistencia
                          </>
                        )}
                      </Button>
                    )}

                    {isConfirmed && (
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 w-full rounded-full border-black/10 bg-white hover:bg-muted"
                      >
                        <Link href={accessUrl}>
                          {totalCost > 0 ? "Ver mis tickets" : "Ver mi QR de acceso"}
                        </Link>
                      </Button>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InterestedButton event={event} />
                      <Button
                        variant="outline"
                        className="h-11 rounded-full border-black/10 bg-white hover:bg-muted"
                        onClick={handleOpenUpload}
                        disabled={!isConfirmed}
                        title={isConfirmed ? "Publicar foto" : "Debes confirmar tu asistencia para publicar"}
                      >
                        <ImageUpIcon className="h-4 w-4" />
                        Subir foto
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-black/6 bg-white p-4 text-sm text-muted-foreground">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span>Estado del evento</span>
                      <span className="font-medium text-foreground">
                        {isPastEvent ? "Finalizado" : isConfirmed ? "Tu cupo está listo" : "Inscripción abierta"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span>Fotos en galería</span>
                      <span className="font-medium text-foreground">{galleryImages?.length || 0}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {isEventOwner && (
                      <div className="overflow-hidden rounded-3xl border border-black/8 bg-white/88 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                        <PublisherEventStats event={event} totalPhotos={galleryImages?.length || 0} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Location preview — sits at the top of the sidebar */}
              <div className="min-w-0">
                <EventLocationSection location={event.location} />
              </div>

            </aside>
          </div>

          {/* More from this organizer */}
          <OrganizerEventsSection
            organizerId={event.user.id}
            organizerName={event.user.name}
            currentEventId={event.id}
          />
        </div>
      </main>

      <PaymentModal
        event={event}
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onSuccess={handlePaymentSuccess}
      />

      <UploadGalleryImageDialog
        open={openUpload}
        onOpenChange={setOpenUpload}
        eventId={event.id}
      />

      {canViewAttendees && <EventAttendeesDialog />}
    </>
  );
}
