"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, Bookmark, LocateFixed, Search, SlidersHorizontal } from "lucide-react";
import { eventApi } from "@/api/event.api";
import { useCategories } from "@/hooks";
import { Category } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSavedEvents } from "@/hooks/event/useSavedEvents";

const NearbyMap = dynamic(() => import("./NearbyMap"), { ssr: false, loading: () => <div className="h-[500px] animate-pulse rounded-xl bg-gray-100" /> });
export type Bounds = { south: number; north: number; west: number; east: number };
export type MapEvent = { id: string; slug: string; title: string; location: string; eventDate: string; mediaType: "image" | "video"; mediaUrl: string; cost: number; currency: string; latitude: number; longitude: number; user: { id: string; name: string | null; username: string; avatar: string | null }; category: { id: string; name: string }; eventTicketTypes: { price: number }[]; distance?: number };
type ApiEvent = Omit<MapEvent, "latitude" | "longitude"> & { lat: number; log: number };
type Position = { lat: number; lng: number };
const DEFAULT_BOUNDS: Bounds = { south: -5.1, north: 1.6, west: -81.2, east: -75.1 };
function distance(a: Position, b: Position) { const rad = (v: number) => v * Math.PI / 180; const n = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2; return 12742 * Math.atan2(Math.sqrt(n), Math.sqrt(Math.max(0, 1 - n))); }

export default function NearbyEventsPage() {
  const [bounds, setBounds] = useState<Bounds>(DEFAULT_BOUNDS);
  const [visibleBounds, setVisibleBounds] = useState<Bounds | null>(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("");
  const [radius, setRadius] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [listType, setListType] = useState<"events" | "places">("events");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLElement>(null);
  const { data: categoryData = [] } = useCategories();
  const categories: Category[] = categoryData;
  const queryClient = useQueryClient();
  const savedEvents = useSavedEvents();
  const filterKey = { ...bounds, query: search, category, price, period };
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["nearby-events", filterKey],
    queryFn: async () => {
      const now = new Date();
      let until: string | undefined;
      if (period) { const end = new Date(now); end.setHours(0, 0, 0, 0); end.setDate(end.getDate() + (period === "today" ? 1 : 7)); until = end.toISOString(); }
      const items: ApiEvent[] = []; let cursor: string | null = null;
      do { const response: { data: { items: ApiEvent[]; nextCursor: string | null } } = await eventApi.get("/events/nearby", { params: { ...bounds, query: search || undefined, category: category || undefined, price: price || undefined, until, cursor: cursor || undefined } }); items.push(...response.data.items); cursor = response.data.nextCursor; } while (cursor && items.length < 1000);
      return { items, truncated: Boolean(cursor) };
    },
  });
  const events = useMemo(() => (data?.items ?? []).map(event => ({ ...event, latitude: event.lat, longitude: event.log, distance: position ? distance(position, { lat: event.lat, lng: event.log }) : undefined })).filter(event => !radius || (event.distance !== undefined && event.distance <= Number(radius))).sort((a, b) => position ? (a.distance ?? 0) - (b.distance ?? 0) : new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()), [data, position, radius]);
  const places = useMemo(() => { const grouped = new Map<string, MapEvent[]>(); for (const event of events) { const key = `${event.location.trim().toLocaleLowerCase()}|${event.latitude.toFixed(5)}|${event.longitude.toFixed(5)}`; const group = grouped.get(key) ?? []; group.push(event); grouped.set(key, group); } return [...grouped.values()]; }, [events]);
  useEffect(() => { if (selected && !events.some(event => event.id === selected)) setSelected(null); }, [events, selected]);
  const locate = () => { if (!navigator.geolocation) { setError("Tu navegador no permite consultar la ubicación."); return; } setError(""); setLocating(true); navigator.geolocation.getCurrentPosition(({ coords }) => { setPosition({ lat: coords.latitude, lng: coords.longitude }); setLocating(false); }, () => { setError("No pudimos acceder a tu ubicación. Puedes explorar el mapa manualmente."); setLocating(false); }, { timeout: 10000, maximumAge: 300000 }); };
  const selectFromMap = (id: string) => { setSelected(id); const listId = listType === "places" ? places.find(group => group.some(event => event.id === id))?.[0].id ?? id : id; const container = listType === "places" ? document.querySelector<HTMLElement>('[aria-label="Lugares encontrados"]') : listRef.current; container?.querySelector<HTMLElement>(`[data-event-id="${CSS.escape(listId)}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }); };
  return <div className="space-y-5 pt-4 md:pt-0">
    <header><h1 className="text-2xl font-bold md:text-3xl">Encuentra un plan donde estás.</h1><p className="mt-2 text-sm text-muted-foreground">Descubre eventos y explora el mapa. Tu ubicación es opcional.</p></header>
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={event => { event.preventDefault(); setSearch(query.trim()); }}><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Buscar eventos, organizadores o lugares" className="pl-9" placeholder="Busca un evento, organizador o lugar" value={query} onChange={event => setQuery(event.target.value)} /></div><Button type="submit" variant="outline">Buscar</Button><Button type="button" variant="outline" aria-expanded={showFilters} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="size-4" /> Filtros</Button><Button type="button" onClick={locate} disabled={locating}><LocateFixed className="size-4" />{locating ? "Buscando..." : "Usar mi ubicación"}</Button></form>
    {showFilters && <div className="flex flex-wrap gap-3 rounded-xl border bg-white p-4"><label className="text-sm">Categoría <select aria-label="Categoría" className="ml-2 rounded border p-2" value={category} onChange={e => setCategory(e.target.value)}><option value="">Todas</option>{categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-sm">Precio <select className="ml-2 rounded border p-2" value={price} onChange={e => setPrice(e.target.value)}><option value="">Todos</option><option value="free">Gratis</option><option value="paid">De pago</option></select></label><label className="text-sm">Fecha <select className="ml-2 rounded border p-2" value={period} onChange={e => setPeriod(e.target.value)}><option value="">Próximos</option><option value="today">Hoy</option><option value="week">Próximos 7 días</option></select></label><label className="text-sm">Distancia <select className="ml-2 rounded border p-2" value={radius} onChange={e => setRadius(e.target.value)} disabled={!position}><option value="">Cualquiera</option><option value="2">2 km</option><option value="5">5 km</option><option value="10">10 km</option><option value="25">25 km</option></select></label>{!position && <span className="text-xs text-muted-foreground">Activa tu ubicación para filtrar por distancia.</span>}</div>}
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <div className="flex gap-2 md:hidden"><Button type="button" variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>Lista</Button><Button type="button" variant={view === "map" ? "default" : "outline"} onClick={() => setView("map")}>Mapa</Button></div>
    <div className="grid gap-4 md:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.7fr)]">
      <div className={`${view === "map" ? "hidden md:block" : "block"} space-y-3 rounded-xl border bg-white p-3 [&>section:first-of-type]:border-0 [&>section:first-of-type]:p-0 ${listType === "places" ? "[&>section:first-of-type]:hidden" : ""}`}>
        <div className="flex gap-2" aria-label="Tipo de resultados"><Button type="button" size="sm" variant={listType === "events" ? "default" : "outline"} aria-pressed={listType === "events"} onClick={() => setListType("events")}>Eventos</Button><Button type="button" size="sm" variant={listType === "places" ? "default" : "outline"} aria-pressed={listType === "places"} onClick={() => setListType("places")}>Lugares</Button></div>
        {listType === "places" && <p className="text-xs text-muted-foreground">Lugares agrupados según las ubicaciones de los eventos mostrados.</p>}
      <section ref={listRef} className={`${view === "map" ? "hidden md:block" : "block"} max-h-[600px] space-y-3 overflow-y-auto rounded-xl border bg-white p-3`} aria-label="Eventos encontrados"><p className="px-1 text-sm text-muted-foreground">{isLoading ? "Cargando eventos..." : `${events.length} eventos${isFetching ? " · Actualizando..." : ""}`}</p>{data?.truncated && <p className="text-xs text-muted-foreground">Hay más resultados; acerca el mapa para verlos.</p>}{isError && <p role="alert">No pudimos cargar los eventos. <button type="button" className="underline" onClick={() => void queryClient.invalidateQueries({ queryKey: ["nearby-events"] })}>Reintentar</button></p>}{!isLoading && !isError && !events.length && <p className="p-4 text-sm text-muted-foreground">No encontramos eventos en esta zona con estos filtros.</p>}{events.map(event => { const prices = event.eventTicketTypes.map(t => t.price).filter(p => p >= 0); const value = prices.length ? Math.min(...prices) : event.cost; return <div key={event.id} data-event-id={event.id} className={`flex items-center gap-2 rounded-xl border p-2 ${selected === event.id ? "border-black" : "border-gray-200"}`}><button type="button" onClick={() => { setSelected(event.id); setMapFocus(event.id); }} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"><div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">{event.mediaType === "image" && event.mediaUrl && <img src={event.mediaUrl} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0 space-y-1"><p className="text-xs text-muted-foreground">{new Date(event.eventDate).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}</p><h2 className="line-clamp-2 text-sm font-semibold">{event.title}</h2><p className="text-xs font-medium">{value > 0 ? `Desde $${value.toFixed(2)}` : "Gratis"}{event.distance !== undefined && ` · ${event.distance < 1 ? `${Math.round(event.distance * 1000)} m` : `${event.distance.toFixed(1)} km`}`}</p></div></button><div className="flex shrink-0 items-end gap-1 self-end"><button type="button" disabled={savedEvents.isUpdating || savedEvents.isLoading || savedEvents.isError} aria-pressed={!!savedEvents.data?.some(item => item.eventId === event.id)} aria-label={`${savedEvents.data?.some(item => item.eventId === event.id) ? "Quitar de guardados" : "Guardar evento"}: ${event.title}`} title={savedEvents.isError ? "No se pudieron cargar los guardados" : savedEvents.data?.some(item => item.eventId === event.id) ? "Quitar de guardados" : "Guardar evento"} onClick={() => savedEvents.setSaved({ eventId: event.id, saved: !savedEvents.data?.some(item => item.eventId === event.id) })} className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"><Bookmark className={`h-4 w-4 ${savedEvents.data?.some(item => item.eventId === event.id) ? "fill-current" : ""}`} aria-hidden="true" /></button><Link aria-label={`Ir al evento ${event.title}`} title="Ir al evento" className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={`/p/${encodeURIComponent(event.slug)}`}><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>; })}</section>
        {listType === "places" && <section className="max-h-[520px] space-y-3 overflow-y-auto" aria-label="Lugares encontrados"><p className="px-1 text-sm text-muted-foreground">{isLoading ? "Cargando lugares..." : `${places.length} ${places.length === 1 ? "lugar" : "lugares"}`}</p>{isError && <p role="alert" className="text-sm">No pudimos cargar los lugares. <button type="button" className="underline" onClick={() => void queryClient.invalidateQueries({ queryKey: ["nearby-events"] })}>Reintentar</button></p>}{!isLoading && !isError && places.length === 0 && <p className="p-4 text-sm text-muted-foreground">No encontramos lugares para estos filtros.</p>}{places.map(group => { const first = group[0]; return <div key={first.id} data-event-id={first.id} className={`rounded-xl border p-3 ${group.some(item => item.id === selected) ? "border-black" : "border-gray-200"}`}><button type="button" onClick={() => { setSelected(first.id); setMapFocus(first.id); }} className="w-full cursor-pointer text-left"><p className="text-sm font-semibold">{first.location}</p><p className="mt-1 text-xs text-muted-foreground">{group.length} {group.length === 1 ? "evento" : "eventos"}{first.distance !== undefined && ` · ${first.distance < 1 ? `${Math.round(first.distance * 1000)} m` : `${first.distance.toFixed(1)} km`}`}</p></button><div className="mt-2 space-y-1">{group.map(event => <Link key={event.id} href={`/p/${encodeURIComponent(event.slug)}`} className="block text-xs font-medium underline">{event.title}</Link>)}</div></div>; })}</section>}
      </div>
      <section className={`${view === "list" ? "hidden md:block" : "block"} relative overflow-hidden rounded-xl border`} aria-label="Mapa de eventos"><NearbyMap events={events} position={position} selected={selected} focusId={mapFocus} onFocusHandled={() => setMapFocus(null)} onSelect={selectFromMap} onBoundsChange={setVisibleBounds} visible={view === "map"} /><div className="absolute right-3 top-3 z-[500] flex gap-2"><Button type="button" variant="outline" onClick={locate} disabled={locating}><LocateFixed className="size-4" />{locating ? "Buscando..." : "Centrar"}</Button><Button type="button" onClick={() => { if (visibleBounds) setBounds(visibleBounds); }}>Buscar en esta zona</Button></div></section>
    </div>
  </div>;
}
