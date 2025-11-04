"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces";

interface Props {
  categories: Category[];
}

export function EventDetailsStep({ categories }: Props) {
  const { register, setValue, watch } = useFormContext();
  const eventDate = watch("eventDate");
  const categoryId = watch("categoryId"); // 👈 observa el valor actual

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
          <Select
            value={categoryId || ""}
            onValueChange={(v) => setValue("categoryId", v)} >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorías</SelectLabel>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">Costo</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("cost", {
              required: "El costo es obligatorio",
              valueAsNumber: true,
              validate: (value) =>
                !isNaN(value) && value >= 0 && /^\d+(\.\d{1,2})?$/.test(value.toString()) ||
                "Debe ser un número válido con hasta dos decimales",
            })}
          />
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
