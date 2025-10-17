
import { EventGrid, Title } from "@/components";
import { mockEvents } from "@/data/mockData";

export default function EventsPage() {
  return (
    <div className="space-y-4">
      
      <Title title="Eventos">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
            Para ti
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 font-medium">
            Siguiendo
          </button>
        </div>
      </Title>

      <EventGrid events={mockEvents} />

    </div>
  )
}
