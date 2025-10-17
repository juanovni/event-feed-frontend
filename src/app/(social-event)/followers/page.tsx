
import { EventGrid, HeaderButton, Title } from "@/components";
import { mockEvents } from "@/data/mockData";

export default function FollowersPage() {
  return (
    <div className="space-y-4">

      <Title title="Eventos">
        <HeaderButton />
      </Title>

      <EventGrid events={mockEvents} />

    </div>
  )
}
