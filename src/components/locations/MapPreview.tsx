"use client";

import { MapPin } from "lucide-react";

interface MapPreviewProps {
  latitude: string;
  longitude: string;
  locationName: string;
}

export function MapPreview({ latitude, longitude, locationName }: MapPreviewProps) {
  if (!latitude || !longitude) {
    return null;
  }

  const zoomLevel = 15;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude) - 0.01},${parseFloat(latitude) - 0.01},${parseFloat(longitude) + 0.01},${parseFloat(latitude) + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="w-full min-w-0 space-y-2">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-500" />
        <p className="text-sm font-medium">Vista previa de ubicación</p>
      </div>
      <div className="w-full h-48 rounded-md overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          style={{ border: 0 }}
        />
      </div>
      <p className="text-xs text-gray-600 break-words">{locationName}</p>
    </div>
  );
}
