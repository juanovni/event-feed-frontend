"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function TicketsStep() {
  const { control, register, watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Entradas del evento</h2>

        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              price: 0,
              quantity: 0,
              validUntil: null,
            })
          }
        >
          Agregar entrada
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No has agregado ninguna entrada todavía.
        </p>
      )}

      {fields.map((field, index) => {
        const selectedDate = watch(`tickets.${index}.validUntil`);

        return (
          <div key={field.id} className="border p-4 rounded-xl space-y-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => remove(index)}
            >
              <Trash size={18} />
            </button>

            <div className="space-y-2">
              <Label>Nombre / tipo de entrada</Label>
              <Input
                {...register(`tickets.${index}.name`, { required: true })}
                placeholder="Ej: VIP, General, Preventa"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Precio</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register(`tickets.${index}.price`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Cantidad disponible</Label>
                <Input
                  type="number"
                  placeholder="0"
                  {...register(`tickets.${index}.quantity`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Válido hasta</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Selecciona una fecha"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => setValue(`tickets.${index}.validUntil`, d)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      })}
    </div>
  );
}
