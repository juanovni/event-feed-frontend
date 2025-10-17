
import { Button, EventGrid, Title } from "@/components";
import { mockEvents } from "@/data/mockData";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";

const bottonLinks: { label: string; variant: ButtonVariant }[] = [
  {
    label: 'Para ti',
    variant: "default",
  },
  {
    label: 'Siguiendo',
    variant: "default",
  }
];

export default function EventsPage() {
  return (
    <div className="space-y-4">

      <Title title="Eventos">
        {bottonLinks.map(item => (
          <Button
            key={item.label}
            size="icon-lg"
            variant={`${item.variant}`}
            className="rounded-full w-30"
          >
            {item.label}
          </Button>
        ))}
      </Title>

      <EventGrid events={mockEvents} />

    </div>
  )
}
