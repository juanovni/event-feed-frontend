"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/api/event.api";
import { TicketGrid, TicketEmpty, Title } from "@/components";
import { useEvents, useTickets } from "@/hooks";
import { TicketSkeleton } from "./ui/TicketSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { normalizeAccessPasses } from "@/utils";
import FilterCarousel from "@/components/ui/filter-carousel/FilterCarousel";

export default function TicketsPage() {
  const { data: tickets = [], isLoading: isLoadingTickets, isError: isErrorTickets } = useTickets();
  const { data: redemptionCounts = {}, isLoading: isLoadingRedemptions, isError: isErrorRedemptions } = useQuery({
    queryKey: ["admission-redemption-status"],
    queryFn: async () => (await eventApi.get<Record<string, number>>("/admission/redemption-status")).data,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });
  const { data: events = [], isLoading: isLoadingEvents, isError: isErrorEvents } = useEvents();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const accessPasses = useMemo(
    () => normalizeAccessPasses(tickets, events).map(ticket => ({ ...ticket, redeemedCount: redemptionCounts[ticket.id] ?? 0 })),
    [tickets, events, redemptionCounts]
  );

  const filteredTickets = useMemo(() => {
    if (!accessPasses.length) return [];

    let result = [...accessPasses];

    if (statusFilter !== "all") {
      result = result.filter((ticket) => {
        const redeemed = ticket.redeemedCount ?? 0;
        const total = Math.max(ticket.itemsInOrder || 1, 1);
        if (statusFilter === "redeemed") return redeemed > 0;
        if (statusFilter === "pending") return redeemed < total;
        return redeemed < total && new Date(ticket.event.eventDate) > new Date();
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.event.eventDate).getTime();
      const dateB = new Date(b.event.eventDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [accessPasses, statusFilter, sortOrder]);

  const isLoading = isLoadingTickets || isLoadingEvents || isLoadingRedemptions;
  const isError = (isErrorTickets && isErrorEvents) || isErrorRedemptions;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Title title="Tickets y accesos">{""}</Title>
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
      <div className="space-y-2">
        <Title title="Tickets y accesos">{""}</Title>
        <p className="px-3 text-sm text-muted-foreground md:px-0">
          Aqui veras tanto tus entradas pagadas como las asistencias confirmadas para eventos gratuitos.
        </p>
      </div>

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
        statusFilter === "all" ? <TicketEmpty /> : (
          <p className="py-16 text-center text-muted-foreground">No hay entradas en este filtro.</p>
        )
      ) : (
        <TicketGrid tickets={filteredTickets} />
      )}
    </div>
  );
}
