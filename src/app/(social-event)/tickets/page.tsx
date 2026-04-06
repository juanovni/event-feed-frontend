"use client";

import { useState, useMemo } from "react";
import { TicketGrid, TicketEmpty, Title } from "@/components";
import { useTickets } from "@/hooks";
import { TicketSkeleton } from "./ui/TicketSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTicketStatus } from "@/utils/getTicketStatus";
import FilterCarousel from "@/components/ui/filter-carousel/FilterCarousel";

export default function TicketsPage() {
  const { data: tickets, isLoading, isError } = useTickets();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    let result = [...tickets];

    // ✅ Filtrar por estado usando la función utilitaria
    if (statusFilter !== "all") {
      result = result.filter((ticket) => getTicketStatus(ticket) === statusFilter);
    }

    // ✅ Ordenar por fecha del evento
    result.sort((a, b) => {
      const dateA = new Date(a.event.eventDate).getTime();
      const dateB = new Date(b.event.eventDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [tickets, statusFilter, sortOrder]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Title title="Tickets">{""}</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <TicketSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <p>Error al cargar los tickets.</p>;

  return (
    <div className="space-y-6">
      <Title title="Tickets">{""}</Title>

      {/* Filtros de estado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">

        <FilterCarousel
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "Todos" },
            { value: "redeemed", label: "Canjeados" },
            { value: "pending", label: "Por canjear" },
            { value: "upcoming", label: "Próximos" },
          ]}
        />

        {/* Ordenar */}
        <div className="flex justify-end pt-4 sm:pt-0">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Más recientes</SelectItem>
              <SelectItem value="asc">Más antiguos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <TicketEmpty />
      ) : (
        <TicketGrid tickets={filteredTickets} />
      )}
    </div>
  );
}
