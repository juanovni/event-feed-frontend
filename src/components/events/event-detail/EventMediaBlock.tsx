'use client';

import Image from "next/image";
import { Event, User } from "@/interfaces";
import { GalleryPopup } from "@/components/ui/gallery/GalleryPopup";
import { Badge } from "@/components/ui/badge";

interface GalleryImage {
  id: number;
  url: string;
  user: User;
}

interface EventMediaBlockProps {
  event: Event;
  galleryImages: GalleryImage[];
  className?: string;
  objectFit?: "cover" | "contain";
}

export function EventMediaBlock({ event, galleryImages, className, objectFit = "contain" }: EventMediaBlockProps) {
  return (
    <div className={className}>
      <div className="relative">
        {event.mediaType === "image" ? (
          <>
            <Image
              src={event.mediaUrl}
              width={1400}
              height={1400}
              alt={event.title}
              priority
              className={`h-[clamp(220px,52vh,720px)] w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${objectFit === "cover" ? "object-cover" : "object-contain"} object-center sm:h-[clamp(240px,58vh,720px)]`}
            />
            {event.gallery && <GalleryPopup images={galleryImages} />}
          </>
        ) : (
          <video
            src={event.mediaUrl}
            controls
            className={`h-[clamp(220px,52vh,720px)] w-full transition-transform duration-300 hover:scale-105 cursor-pointer ${objectFit === "cover" ? "object-cover" : "object-contain"} object-center rounded-xl sm:h-[clamp(240px,58vh,720px)]`}
            poster="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
        )}
        <Badge variant="secondary" className="absolute right-3 top-3">{event.category}</Badge>
      </div>
    </div>
  );
}