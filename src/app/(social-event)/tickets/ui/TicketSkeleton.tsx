import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const TicketSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
      {/* Imagen simulada */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-4 space-y-3">
        {/* Título */}
        <Skeleton className="h-5 w-3/4" />

        {/* Ubicación */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Fecha y hora */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Línea inferior */}
        <div className="flex justify-between items-center pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  )
}
