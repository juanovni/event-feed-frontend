'use client';

import Image from "next/image";
import Link from "next/link";

interface Props {
  events: any[];
}

export const InterestedEventsGrid = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-1 auto-rows-[220px] md:auto-rows-[420px]">
      {events.map((item) => (
        <Link
          key={item.eventId}
          target="_blank"
          href={`/p/${item.eventSlug}`}
          className="relative group overflow-hidden "
        >
          {/* Imagen */}
          <Image
            src={item.imageUrl}
            alt="Evento"
            fill
            className="object-contain md:object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 right-14 text-white">
            <p className="text-sm font-semibold line-clamp-2">
              {item.eventTitle}
            </p>
            <p className="text-xs opacity-80">
              {item.eventDate && new Date(item.eventDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};