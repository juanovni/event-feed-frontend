'use client';

import { useState, useMemo } from "react";
import { EventEmpty, EventGrid, EventSkeletonCard, HeaderButton, Title, AuthGuard } from "@/components";
import { useEvents } from "@/hooks";
import FilterCarousel from "@/components/ui/filter-carousel/FilterCarousel";
import { Category, Event } from "@/interfaces";

interface Option {
  value: string;
  label: string;
}

export default function EventsPage() {
  const { data: events, isLoading, isError } = useEvents();

  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo<Option[]>(() => {
    if (!events?.length) {
      return [{ value: "all", label: "Todos" }];
    }

    const unique: string[] = Array.from(
      new Set(
        events
          .map((e: Event) => e.category)
          .filter((cat: Category): cat is Category => Boolean(cat))
      )
    );

    return [
      { value: "all", label: "Todos" },
      ...unique.map((cat) => ({
        value: cat,
        label: cat,
      })),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    if (categoryFilter === "all") return events;

    return events.filter((event: Event) => event.category === categoryFilter);
  }, [events, categoryFilter]);

  return (
    <AuthGuard>
      {isLoading ? (
        <EventSkeletonCard />
      ) : isError ? (
        <p>Error al cargar los eventos.</p>
      ) : (
        <div className="space-y-4">
          <Title title="Eventos">
            <HeaderButton />
          </Title>

          <FilterCarousel
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categories}
          />

          {filteredEvents.length === 0 ? (
            <EventEmpty type="event" />
          ) : (
            <EventGrid events={filteredEvents} />
          )}
        </div>
      )}
    </AuthGuard>
  );
}