"use client";

import { LoaderCircle, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEventAttendees } from "@/hooks";
import { useEventAttendeesDialogStore } from "@/store";
import { AvatarProfile } from "@/components";

export function EventAttendeesDialog() {
  const { isOpen, eventId, eventTitle, closeDialog } = useEventAttendeesDialogStore();
  const { data: attendees = [], isLoading, isError } = useEventAttendees(eventId, isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="h-auto w-full max-w-lg mx-auto p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 py-4 text-center border-b">
          <DialogTitle className="text-base font-semibold">
            {eventTitle || "Asistentes"}
          </DialogTitle>

          <DialogDescription className="text-xs text-gray-400">
            {attendees.length} personas
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
          {isLoading ? (
            <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Cargando asistentes...
            </div>
          ) : isError ? (
            <div className="flex min-h-40 items-center justify-center text-sm text-destructive">
              No se pudo cargar el listado de asistentes.
            </div>
          ) : attendees.length === 0 ? (
            <div className="flex min-h-40 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <Users className="h-5 w-5" />
              No hay asistentes confirmados para este evento todavía.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <div className="mx-auto w-full max-w-md space-y-3">
                {attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3 bg-white border border-black/5 shadow-sm"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <AvatarProfile
                        name={attendee.name}
                        image={attendee.avatar || ''}
                        className="h-10 w-10"
                      />

                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium text-gray-900">
                          {attendee.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {attendee.username ? `@${attendee.username}` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <Badge
                      variant={attendee.isAttending ? "default" : "secondary"}
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {attendee.isAttending ? "✔" : "…"}
                    </Badge>
                    
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}