'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronRight, MapPin, Users } from "lucide-react";
import { Event } from "@/interfaces";

interface Props {
  events: Event[];
  isLoading?: boolean;
}

interface EventGroup {
  label: string;
  items: Event[];
  sortValue: number;
}

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDayDifference = (date: Date) => {
  const currentDay = getStartOfDay(new Date()).getTime();
  const targetDay = getStartOfDay(date).getTime();
  return Math.round((targetDay - currentDay) / DAY_IN_MS);
};

const getGroupLabel = (date: Date) => {
  const diff = getDayDifference(date);

  if (diff === 0) return "Hoy";
  if (diff === 1) return "Mañana";

  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

const getEventOrderValue = (eventDate: Date) => {
  const dayStart = getStartOfDay(eventDate).getTime();
  const diff = getDayDifference(eventDate);

  if (diff >= 0) {
    return dayStart;
  }

  return Number.MAX_SAFE_INTEGER + Math.abs(dayStart);
};

const groupEventsByDate = (events: Event[]) => {
  const sortedEvents = [...events].sort((a, b) => {
    const aDate = new Date(a.eventDate);
    const bDate = new Date(b.eventDate);
    const aIsUpcoming = getDayDifference(aDate) >= 0;
    const bIsUpcoming = getDayDifference(bDate) >= 0;

    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;

    if (aIsUpcoming && bIsUpcoming) {
      return aDate.getTime() - bDate.getTime();
    }

    return bDate.getTime() - aDate.getTime();
  });

  const grouped = new Map<string, EventGroup>();

  sortedEvents.forEach((event) => {
    const eventDate = new Date(event.eventDate);
    const label = getGroupLabel(eventDate);

    if (!grouped.has(label)) {
      grouped.set(label, {
        label,
        items: [],
        sortValue: getEventOrderValue(eventDate),
      });
    }

    grouped.get(label)?.items.push(event);
  });

  return Array.from(grouped.values()).sort((a, b) => a.sortValue - b.sortValue);
};

const formatTimeLabel = (date: Date) =>
  date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

const PublisherEventsSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 2 }).map((_, groupIndex) => (
      <div key={groupIndex} className="space-y-3">
        <div className="h-5 w-32 animate-pulse rounded-full bg-gray-200" />
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((__, itemIndex) => (
            <div
              key={itemIndex}
              className="h-28 animate-pulse rounded-2xl border border-gray-100 bg-white"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const PublisherEventsSection = ({ events, isLoading = false }: Props) => {
  if (isLoading) {
    return <PublisherEventsSkeleton />;
  }

  if (events.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-gray-200 px-6 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <CalendarDays size={48} className="text-gray-500" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Aún no has creado eventos
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Cuando publiques uno, aparecerá aquí ordenado por fecha para que sea fácil de revisar.
        </p>
      </div>
    );
  }

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="space-y-6 mb-4">
      {groupedEvents.map((group) => (
        <section key={group.label} className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold capitalize text-gray-900">
              {group.label}
            </h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-3">
            {group.items.map((event) => {
              const eventDate = new Date(event.eventDate);
              const href = event.slug ? `/p/${event.slug}` : "#";
              const directionsUrl = event.location
                ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(event.location)}`
                : null;

              return (
                <Link
                  key={event.id}
                  href={href}
                  className={`group flex gap-3 md:gap-4 rounded-xl md:p-2 transition hover:-translate-y-0.5 hover:shadow-md sm:p-4 ${event.slug ? "" : "pointer-events-none"
                    }`}
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-44 sm:w-44">
                    {event.mediaUrl ? (
                      <Image
                        src={event.mediaUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        Sin portada
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                          {event.title}
                        </p>
                        <div className="mt-2 space-y-2 text-xs text-gray-500 sm:text-sm">
                          <div className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatTimeLabel(eventDate)}
                          </div>

                        </div>
                        {event.location && directionsUrl && (
                          <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex min-w-0 max-w-full items-center gap-1.5 rounded-full bg-gray-50  py-1 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            title={`Ver ${event.location} en OpenStreetMap`}
                          >
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span className="min-w-0 truncate">{event.location}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {event.attendees ?? 0} asistentes
                        </div>
                      </div>

                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition group-hover:bg-black group-hover:text-white sm:flex">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
