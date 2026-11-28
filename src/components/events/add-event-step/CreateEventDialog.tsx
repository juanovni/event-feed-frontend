"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EventDetailsStep, MediaUploadStep, TicketsStep } from "@/components";
import { useCategories, useCreateEvent } from "@/hooks";
import { UserStatus } from "@/interfaces";
import { combineDateAndTime } from "@/utils";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  locationLat: string;
  locationLon: string;
  eventDate: string;
  endDate: string;
  endTime: string;
  mediaType: string;
  eventTime: string;
  cost: number,
  currency: string,
  attendees: number,
  userStatus: UserStatus;
  categoryId: string;
  mediaFile?: File | null;
  tickets: {
    name: string;
    price: number;
    quantity: number;
    validUntil: Date | null;
  }[];
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [step, setStep] = useState(1);
  const { mutate, isPending } = useCreateEvent();
  const { data: categories, isLoading } = useCategories();

  const methods = useForm<EventFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      locationLat: "",
      locationLon: "",
      eventDate: "",
      endDate: "",
      endTime: "",
      mediaType: "image",
      cost: 0,
      currency: "USA",
      attendees: 0,
      userStatus: "none",
      categoryId: "",
      mediaFile: null,
      tickets: []
    },
  });

  const { handleSubmit, getValues, setValue } = methods;

  const hasMedia = (file: EventFormValues["mediaFile"]) => Boolean(file);

  const onSubmit = (data: EventFormValues) => {
    const formData = new FormData();
    const eventToSave = {
      ...data,
      tickets: data.tickets,
    };
    if (!hasMedia(data.mediaFile)) {
      toast.error("Sube una imagen o un video para el evento");
      return;
    }

    const eventDateTime = getFutureEventDate(data.eventDate, data.eventTime);
    if (!eventDateTime) return;
    const endDateTime = getEndEventDate(data.endDate, data.endTime, eventDateTime);
    if (!endDateTime) return;

    formData.append("title", eventToSave.title);
    formData.append("description", eventToSave.description);
    formData.append("location", eventToSave.location);
    formData.append("lat", eventToSave.locationLat);
    formData.append("log", eventToSave.locationLon);
    formData.append("eventDate", eventDateTime.toISOString());
    formData.append("endDate", endDateTime.toISOString());
    formData.append("mediaType", eventToSave.mediaType);
    formData.append("mediaFile", data.mediaFile!);
    formData.append("cost", Math.max(0, ...eventToSave.tickets.map((ticket) => ticket.price)).toString());
    formData.append("currency", eventToSave.currency);
    formData.append("attendees", eventToSave.attendees.toString());
    formData.append("userStatus", eventToSave.userStatus);
    formData.append("categoryId", eventToSave.categoryId);
    formData.append("eventTicketTypes", JSON.stringify(eventToSave.tickets));
    mutate(formData);

    onOpenChange(false);
    methods.reset();
    setStep(1);
  };

  const handleNextFormStep = () => {
    if (!hasMedia(getValues("mediaFile"))) {
      toast.error("Sube una imagen o un video para el evento");
      return;
    }
    setStep(2);
  };

  const handleNextTicketStep = () => {
    const start = getFutureEventDate(getValues("eventDate"), getValues("eventTime"));
    if (!start || !getEndEventDate(getValues("endDate"), getValues("endTime"), start)) return;
    setStep(3);
  };

  function getEndEventDate(date: string, time: string, start: Date): Date | null {
    try {
      if (!date || !time) throw new Error();
      const end = combineDateAndTime(date, time);
      if (!Number.isFinite(end.getTime()) || end.getTime() <= start.getTime()) throw new Error();
      return end;
    } catch {
      toast.error("Selecciona una fecha y hora de finalización posteriores al inicio.");
      return null;
    }
  }

  function getFutureEventDate(date: string, time: string): Date | null {
    try {
      if (!date || !time) throw new Error();
      const result = combineDateAndTime(date, time);
      if (!Number.isFinite(result.getTime()) || result.getTime() <= Date.now()) throw new Error();
      return result;
    } catch {
      toast.error("Selecciona una fecha y hora futuras para el evento.");
      return null;
    }
  }

  if (isLoading) return <p></p>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="px-2 pt-2 pb-4 border-b">
          <div className="flex items-center justify-between">
            {step === 2 && (
              <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {step === 3 && (
              <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className={cn("text-lg font-semibold", step === 1 && "mx-auto")}>
              {step === 1 ? "Sube tu imagen" : step === 2 ? "Detalles del evento" : "Entradas del evento"}
            </DialogTitle>
            {step === 2 && <div className="w-8" />}
          </div>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] overflow-y-auto">
              {step === 1 ? (
                <MediaUploadStep setValue={setValue} />
              ) : step === 2 ? (
                <EventDetailsStep categories={categories} />
              ) : (
                <TicketsStep />
              )}
            </div>

            <div className="px-6 py-4 border-t bg-muted/30">
              {step === 1 ? (
                <Button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleNextFormStep(); }}
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              ) : step === 2 ? (
                <Button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleNextTicketStep(); }}
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 "
                  size="lg"
                >
                  Asignar entradas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (

                <Button
                  type="submit"
                  className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                  disabled={isPending}
                >
                  Crear evento
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
