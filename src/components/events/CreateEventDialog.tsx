import { SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, X, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [step, setStep] = useState(1);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [eventDate, setEventDate] = useState<Date>();
  const [eventTime, setEventTime] = useState("");

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setMediaFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Por favor sube una imagen o video");
      }
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleNextStep = () => {
    if (!mediaFile) {
      toast.error("Por favor sube una imagen o video");
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!title || !description || !category || !cost || !eventDate || !eventTime) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    toast.success("¡Evento creado exitosamente!");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setMediaFile(null);
    setMediaPreview(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setCost("");
    setEventDate(undefined);
    setEventTime("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            {step === 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(1)}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className={cn("text-xl font-semibold", step === 1 && "mx-auto")}>
              {step === 1 ? "Sube tu imagen o video" : "Detalles del evento"}
            </DialogTitle>
            {step === 2 && <div className="w-8" />}
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="p-6">
              {!mediaPreview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="relative border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer group"
                  onClick={() => document.getElementById('media-upload')?.click()}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="h-20 w-20 rounded-full bg-black from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="h-10 w-10 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Arrastra tu archivo aquí</h3>
                      <p className="text-sm text-muted-foreground">o haz clic para seleccionar</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Soporta imágenes y videos
                      </p>
                    </div>
                  </div>
                  <input
                    id="media-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-muted">
                  {mediaFile?.type.startsWith('image/') ? (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={mediaPreview}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute top-4 right-4 h-10 w-10 rounded-full shadow-lg"
                    onClick={handleRemoveMedia}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título del evento</Label>
                <Input
                  id="title"
                  placeholder="Ej: Concierto de Rock en vivo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe tu evento..."
                  value={description}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
                  className="min-h-[120px] text-base resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
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
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="text-base"
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
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Selecciona fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora del evento</Label>
                  <Input
                    id="time"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="text-base"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-muted/30">
          {step === 1 ? (
            <Button
              onClick={handleNextStep}
              className="w-full"
              size="lg"
            >
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
            >
              Crear evento
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
