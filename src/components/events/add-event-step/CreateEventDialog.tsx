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
  eventDate: string;
  mediaType: string;
  eventTime: string;
  mediaUrl: string,
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
      eventDate: "",
      mediaType: "image",
      mediaUrl: "https://scontent.cdninstagram.com/v/t51.82787-15/569176248_18067982831584200_8285398647440749845_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzc1MDAyODY4MDk3NTE2ODEwMg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=RwSfuHU776oQ7kNvwF19-NR&_nc_oc=AdkD1ALPRuoWARM5gNm8LpKrIfF2uIr-B4ILfo_7MGTBFOWw-u6BzMYZ4R38BAaSFg8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ehnVMZiT0sYZWzERZ7h0KA&oh=00_AfebIvWZps5LqkVa0VOeIa-ub4OcEUwENsE3T6Rg9z_5lg&oe=690B62E3",
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

  const onSubmit = (data: EventFormValues) => {
    const formData = new FormData();
    const { ...eventToSave } = data;
    const eventDateTime = combineDateAndTime(eventToSave.eventDate, eventToSave.eventTime);

    if (!data.mediaFile) {
      toast('Por favor sube una imagen o video"')
      return;
    }

    formData.append("title", eventToSave.title);
    formData.append("description", eventToSave.description);
    formData.append("location", eventToSave.location);
    formData.append("eventDate", eventDateTime.toISOString());
    formData.append("mediaType", eventToSave.mediaType);
    formData.append("mediaUrl", eventToSave.mediaUrl);
    formData.append("cost", "0".toString());
    formData.append("currency", eventToSave.currency);
    formData.append("attendees", eventToSave.attendees.toString());
    formData.append("userStatus", eventToSave.userStatus);
    formData.append("categoryId", eventToSave.categoryId);
    formData.append("mediaFile", data.mediaFile);
    formData.append("eventTicketTypes", JSON.stringify(eventToSave.tickets));
    mutate(formData);

    onOpenChange(false);
    methods.reset();
    setStep(1);
  };

  const handleNextFormStep = () => {
    const file = getValues("mediaFile");
    if (!file) {
      toast.error("Por favor sube una imagen o video");
      return;
    }
    setStep(2);
  };

  const handleNextTicketStep = () => {
    setStep(3);
  };

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
              {step === 1 ? "Sube tu imagen" : "Detalles del evento"}
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
                  className="w-full"
                  size="lg"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              ) : step === 2 ? (
                <Button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleNextTicketStep(); }}
                  className="w-full"
                  size="lg"
                >
                  Asignar entradas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isPending}
                >
                  Crear Evento
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
