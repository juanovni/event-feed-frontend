"use client";

import { useMemo, useState } from "react";
import { EventGrid, EventSkeletonCard, Title } from "@/components";
import { Button } from "@/components/ui/button";
import { LocationInput } from "@/components/locations/LocationInput";
import { useEvents } from "@/hooks";
import { Event } from "@/interfaces";
import { LocateFixed, MapPin, Navigation } from "lucide-react";

type Coordinates = { latitude: number; longitude: number; label: string };

const distanceInKm = (from: Coordinates, to: { latitude: number; longitude: number }) => {
  const earthRadiusKm = 6371;
  const radians = (value: number) => (value * Math.PI) / 180;
  const latitudeDifference = radians(to.latitude - from.latitude);
  const longitudeDifference = radians(to.longitude - from.longitude);
  const a = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude))
    * Math.sin(longitudeDifference / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export default function NearbyEventsPage() {
  const { data: events = [], isLoading, isError } = useEvents();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationText, setLocationText] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const nearbyEvents = useMemo(() => {
    if (!coordinates) return [];
    return (events as Event[])
      .flatMap((event) => {
        const longitude = event.log ?? event.lon;
        if (typeof event.lat !== "number" || typeof longitude !== "number") return [];
        return [{ event, distanceKm: distanceInKm(coordinates, { latitude: event.lat, longitude }) }];
      })
      .sort((first, second) => first.distanceKm - second.distanceKm);
  }, [coordinates, events]);

  const distances = useMemo(
    () => Object.fromEntries(nearbyEvents.map(({ event, distanceKm }) => [event.id, distanceKm])),
    [nearbyEvents]
  );

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Tu navegador no permite consultar la ubicación. Busca una zona manualmente.");
      return;
    }
    setLocationError(null);
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude, label: "Tu ubicación actual" });
        setLocationText("Tu ubicación actual");
        setIsLocating(false);
      },
      () => {
        setLocationError("No pudimos acceder a tu ubicación. Puedes buscar por ciudad, barrio o dirección.");
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  if (isLoading) return <EventSkeletonCard />;

  return (
    <div className="space-y-5">
      <Title title="Cerca de ti">
        <span className="hidden text-sm font-normal text-muted-foreground sm:inline">Encuentra planes ordenados por distancia</span>
      </Title>
      <section className="space-y-4 rounded-2xl border bg-white p-4 md:p-5">
        <div><h2 className="font-semibold">¿Desde dónde quieres explorar?</h2><p className="mt-1 text-sm text-muted-foreground">Tu ubicación se usa solo para calcular distancias y no se guarda.</p></div>
        <div className="flex flex-col gap-3 md:flex-row">
          <Button type="button" onClick={useCurrentLocation} disabled={isLocating} className="md:w-auto"><LocateFixed className="mr-2 size-4" />{isLocating ? "Buscando ubicación..." : "Usar mi ubicación"}</Button>
          <div className="min-w-0 flex-1"><LocationInput value={locationText} onChange={setLocationText} placeholder="Busca ciudad, barrio o dirección" onLocationSelect={({ name, lat, lon }) => { setCoordinates({ latitude: Number(lat), longitude: Number(lon), label: name }); setLocationError(null); }} /></div>
        </div>
        {locationError && <p role="alert" className="text-sm text-destructive">{locationError}</p>}
      </section>
      {isError ? <p className="text-sm text-destructive">No pudimos cargar los eventos. Inténtalo nuevamente.</p>
        : !coordinates ? <section className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-6 py-10 text-center"><MapPin className="size-10 text-muted-foreground" /><div className="mt-5 space-y-2"><h2 className="font-semibold">Elige una ubicación para descubrir planes cercanos</h2><p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">Puedes compartir tu ubicación actual o buscar otra zona.</p></div></section>
          : nearbyEvents.length === 0 ? <section className="rounded-2xl border border-dashed bg-white px-6 py-14 text-center"><Navigation className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-4 font-semibold">Aún no hay eventos ubicables cerca de {coordinates.label}</h2><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Algunos eventos todavía no tienen coordenadas. Prueba otra zona más tarde.</p></section>
            : <><p className="text-sm text-muted-foreground">Eventos ordenados desde <span className="font-medium text-foreground">{coordinates.label}</span>.</p><EventGrid events={nearbyEvents.map(({ event }) => event)} distances={distances} /></>}
    </div>
  );
}
