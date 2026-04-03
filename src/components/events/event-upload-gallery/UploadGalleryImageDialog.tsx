"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useUploadEventImage } from "@/hooks";
import { MediaGalleryDetailsStep } from "./MediaGalleryDetailsStep";
import { MediaGalleryUploadStep } from "./MediaGalleryUploadStep";

interface CreateMediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
}

export interface EventGalleryFormValues {
  description: string;
  mediaFile?: File | null;
}

export function UploadGalleryImageDialog({ open, onOpenChange, eventId }: CreateMediaDialogProps) {
  const [step, setStep] = useState(1);
  //const { mutate, isPending } = useUploadEventImage();
  const { mutateAsync, isPending } = useUploadEventImage();

  const methods = useForm<EventGalleryFormValues>({
    defaultValues: {
      description: "",
      mediaFile: null
    },
  });

  const { handleSubmit, getValues, setValue } = methods;

  const onSubmit = async (data: EventGalleryFormValues) => {
    const formData = new FormData();

    if (!data.mediaFile) {
      toast('Por favor sube una imagen o video"')
      return;
    }

    formData.append("mediaFile", data.mediaFile);
    await mutateAsync({ eventId, formData });

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
        <DialogHeader className="px-2 pt-2 pb-4 border-b">
          <div className="flex items-center justify-between">
            {step === 2 && (
              <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className={cn("text-lg font-semibold", step === 1 && "mx-auto")}>
              {step === 1 ? "Sube tu imagen o video" : "Detalles de foto"}
            </DialogTitle>
            {step === 2 && <div className="w-8" />}
          </div>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-h-[70vh] overflow-y-auto">
              {step === 1 ? (
                <MediaGalleryUploadStep setValue={setValue} />
              ) : (
                <MediaGalleryDetailsStep />
              )}
            </div>

            <div className="px-6 py-4 border-t bg-muted/30">
              {step === 1 ? (
                <Button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleNextStep(); }}
                  className="w-full"
                  size="lg"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isPending}
                >
                  Publicar Foto
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
