"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export function EventDetailsStep() {
  const { register, setValue, watch } = useFormContext();
  const eventDate = watch("eventDate");

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título del evento</Label>
        <Input {...register("title", { required: true })} id="title" placeholder="Ej: Concierto de Rock en vivo" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea {...register("description", { required: true })} placeholder="Describe tu evento..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Agregar ubicación</Label>
        <Input {...register("location", { required: true })} id="title" placeholder="Ej: Urdesa Central, Guayaquil, Ecuador" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select onValueChange={(v) => setValue("category", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="musica">Música</SelectItem>
              <SelectItem value="deporte">Deporte</SelectItem>
              <SelectItem value="arte">Arte</SelectItem>
              <SelectItem value="tecnologia">Tecnología</SelectItem>
              <SelectItem value="gastronomia">Gastronomía</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">Costo</Label>
          <Input {...register("cost", { required: true })} type="number" placeholder="0.00" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fecha del evento</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !eventDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {eventDate ? format(eventDate, "PPP") : "Selecciona fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={eventDate} onSelect={(v) => setValue("eventDate", v)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventTime">Hora del evento</Label>
          <Input {...register("eventTime", { required: true })} type="time" />
        </div>
      </div>
    </div>
  );
}
