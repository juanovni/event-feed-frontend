"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext, UseFormSetValue } from "react-hook-form";
import { ImageUpIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EventGalleryFormValues } from "./UploadGalleryImageDialog";

interface MediaUploadStepProps {
  setValue: UseFormSetValue<EventGalleryFormValues>;
}

export function MediaGalleryUploadStep({ setValue }: MediaUploadStepProps) {
  const { watch } = useFormContext();
  const mediaFile = watch("mediaFile");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (mediaFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(mediaFile);
    } else {
      setPreview(null);
    }
  }, [mediaFile]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Por favor sube una imagen o video");
      return;
    }
    setValue("mediaFile", file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setValue("mediaFile", null);
  };

  if (mediaFile && preview) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {mediaFile.type.startsWith("image/") ? (
          <Image
            width={200}
            height={200}
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <video src={preview} controls className="w-full h-full object-cover" />
        )}
        <Button
          type="button"
          variant="default"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full shadow-lg"
          onClick={handleRemove}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
      onClick={() => document.getElementById("media-upload")?.click()}
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="h-28 w-28 rounded-full bg-black flex items-center justify-center transition-transform hover:scale-110">
            <ImageUpIcon className="h-14 w-14 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Arrastra tu archivo aquí</h3>
          <p className="text-sm text-muted-foreground">o haz clic para seleccionar</p>
          <p className="text-xs text-muted-foreground mt-2">Soporta imágenes</p>
        </div>
      </div>
      <input id="media-upload" type="file" accept="image/*,video/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}
