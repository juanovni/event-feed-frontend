"use client";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Bounds, MapEvent } from "./page";
type Position = { lat: number; lng: number };
function Controls({ position, events, focusId, onFocusHandled, onBoundsChange, onZoom, visible }: { position: Position | null; events: MapEvent[]; focusId: string | null; onFocusHandled: () => void; onBoundsChange: (value: Bounds) => void; onZoom: (value: number) => void; visible: boolean }) {
  const map = useMap();
  const report = () => { const b = map.getBounds(); const west = b.getWest(); const east = b.getEast(); onBoundsChange({ south: Math.max(-90, b.getSouth()), north: Math.min(90, b.getNorth()), west: east - west >= 360 ? -180 : L.Util.wrapNum(west, [-180, 180], true), east: east - west >= 360 ? 180 : L.Util.wrapNum(east, [-180, 180], true) }); onZoom(map.getZoom()); };
  useMapEvents({ moveend: report, zoomend: report });
  useEffect(() => { report(); }, [map]);
  useEffect(() => { if (position) map.setView([position.lat, position.lng], 13); }, [map, position]);
  useEffect(() => { if (visible) { map.invalidateSize(); report(); } }, [map, visible]);
  useEffect(() => { const event = events.find(item => item.id === focusId); if (event) { map.setView([event.latitude, event.longitude], Math.max(map.getZoom(), 14)); onFocusHandled(); } }, [focusId, events, map, onFocusHandled]);
  return null;
}
export default function NearbyMap({ events, position, selected, focusId, onFocusHandled, onSelect, onBoundsChange, visible }: { events: MapEvent[]; position: Position | null; selected: string | null; focusId: string | null; onFocusHandled: () => void; onSelect: (id: string) => void; onBoundsChange: (bounds: Bounds) => void; visible: boolean }) {
  const [zoom, setZoom] = useState(7);
  const groups = useMemo(() => { const result = new Map<string, MapEvent[]>(); for (const event of events) { const point = L.CRS.EPSG3857.latLngToPoint(L.latLng(event.latitude, event.longitude), zoom); const key = zoom >= 17 ? `${event.latitude.toFixed(5)},${event.longitude.toFixed(5)}` : `${Math.floor(point.x / 70)},${Math.floor(point.y / 70)}`; const group = result.get(key) ?? []; group.push(event); result.set(key, group); } return [...result.values()]; }, [events, zoom]);
  return <MapContainer center={[-1.8, -78.5]} zoom={7} scrollWheelZoom className="h-[500px] w-full md:h-[600px]" aria-label="Mapa de eventos">
    <TileLayer url={process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png"} attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'} />
    <Controls position={position} events={events} focusId={focusId} onFocusHandled={onFocusHandled} onBoundsChange={onBoundsChange} onZoom={setZoom} visible={visible} />
    {position && <CircleMarker center={[position.lat, position.lng]} radius={7} pathOptions={{ color: "#fff", fillColor: "#2563eb", fillOpacity: 1, weight: 2 }}><Popup>Tu ubicación aproximada</Popup></CircleMarker>}
    {groups.map(group => { const event = group[0]; const marker = document.createElement("div"); marker.className = `flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white p-0.5 shadow-md ${group.some(item => item.id === selected) ? "border-black" : "border-white"}`; if (group.length === 1 && event.user.avatar) { const image = document.createElement("img"); image.src = event.user.avatar; image.alt = ""; image.className = "h-full w-full rounded-full object-cover"; image.onerror = () => { image.remove(); marker.textContent = "1"; }; marker.append(image); } else marker.textContent = String(group.length); const icon = L.divIcon({ html: marker, className: "", iconSize: [44, 44], iconAnchor: [22, 22] }); return <Marker key={group.map(item => item.id).join(":")} position={[event.latitude, event.longitude]} icon={icon} eventHandlers={{ click: () => onSelect(event.id) }}><Popup><div className="space-y-2">{group.map(item => <button key={item.id} type="button" className="block text-left font-medium underline" onClick={() => onSelect(item.id)}>{item.title}</button>)}</div></Popup></Marker>; })}
  </MapContainer>;
}
