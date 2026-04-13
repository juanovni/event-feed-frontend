'use client';

import Image from "next/image";
import Link from "next/link";
/* import { Heart, Bookmark, Share2 } from "lucide-react";
 */
interface Props {
  events: any[];
}

export const InterestedEventsGrid = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[260px]">
      {events.map((item) => (
        <Link
          key={item.eventId}
          target="_blank"
          href={`/p/${item.eventSlug}`}
          className="relative group overflow-hidden rounded-2xl bg-black"
        >
          {/* Imagen */}
          <Image
            src={item.imageUrl}
            alt="Evento"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* <div className="absolute right-2 bottom-4 flex flex-col items-center gap-3 text-white">
            
            <div className="flex flex-col items-center">
              <div className="bg-black/40 backdrop-blur-md p-2 rounded-full">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1">{item.likes ?? 0}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-black/40 backdrop-blur-md p-2 rounded-full">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1">{item.favorites ?? 0}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-black/40 backdrop-blur-md p-2 rounded-full">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1">Share</span>
            </div>
          </div> */}

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