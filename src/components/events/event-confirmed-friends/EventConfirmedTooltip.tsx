import { TooltipProvider } from "@/components/ui/tooltip"
import { User } from "@/interfaces";
import { EventConfirmedTooltipItem } from "./EventConfirmedTooltipItem";

interface Props {
  users: User[];
}

export const EventConfirmedTooltip = ({ users }: Props) => {
  return (
    <TooltipProvider>
      <div className="flex items-center -space-x-2">
        {users.map((user) => (
          <EventConfirmedTooltipItem key={user.id} user={user} />
        ))}
      </div>
    </TooltipProvider>
  )
}
