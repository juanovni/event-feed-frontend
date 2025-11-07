import { Card, CardContent } from "@/components/ui/card";

const initialData = [
  { label: 'Presenta este código QR en la entrada del ticketo' },
  { label: 'Llega al menos 30 minutos antes del inicio' },
  { label: 'Ten tu identificación oficial a la mano' },
  { label: 'No compartas tu código QR con nadie' },
];

export const TicketInstructions = () => {
  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-foreground mb-2">Instrucciones</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          {initialData.map((item, index) => (
            <li key={index}>• {item.label}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
