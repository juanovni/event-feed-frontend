"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EventDetailsStep, MediaUploadStep } from "@/components";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EventFormValues {
  title: string;
  description: string;
  category: string;
  cost: number;
  eventDate: string;
  eventTime: string;
  mediaFile?: File | null;
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [step, setStep] = useState(1);

  const methods = useForm<EventFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      cost: 0,
      eventDate: "",
      eventTime: "",
      mediaFile: null,
    },
  });

  const { handleSubmit, getValues, setValue } = methods;

  const onSubmit = (data: EventFormValues) => {
    if (!data.mediaFile) {
      toast.error("Por favor sube una imagen o video");
      return;
    }

    toast.success("¡Evento creado exitosamente!");
    console.log("Datos del evento:", data);
    onOpenChange(false);
    methods.reset();
    setStep(1);
  };

  const handleNextStep = () => {
    const file = getValues("mediaFile");
    if (!file) {
      toast.error("Por favor sube una imagen o video");
      return;
    }
    setStep(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            {step === 2 && (
              <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className={cn("text-xl font-semibold", step === 1 && "mx-auto")}>
              {step === 1 ? "Sube tu imagen o video" : "Detalles del evento"}
            </DialogTitle>
            {step === 2 && <div className="w-8" />}
          </div>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] overflow-y-auto">
              {step === 1 ? (
                <MediaUploadStep setValue={setValue} />
              ) : (
                <EventDetailsStep />
              )}
            </div>

            <div className="px-6 py-4 border-t bg-muted/30">
              {step === 1 ? (
                <Button onClick={handleNextStep} className="w-full" size="lg" type="button">
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="w-full" size="lg" type="submit">
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
