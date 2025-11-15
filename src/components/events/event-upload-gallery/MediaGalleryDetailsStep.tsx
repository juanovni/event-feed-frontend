"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function MediaGalleryDetailsStep() {
  const { register } = useFormContext();

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea {...register("description", { required: true })} placeholder="Describe tu evento..." />
      </div>
    </div>
  );
}
