
import { TooltipProvider } from "@/components/ui/tooltip"
import { User } from "@/interfaces";
import { EventConfirmedTooltipItem } from "./EventConfirmedTooltipItem";

interface Props {
  users: User[];
}
const MAX_VISIBLE = 4;

export const EventConfirmedTooltip = ({ users }: Props) => {
  const visibleUsers = users.slice(0, MAX_VISIBLE);
  const remaining = users.length - MAX_VISIBLE;

  return (
    <TooltipProvider>
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user) => (
          <EventConfirmedTooltipItem key={user.id} user={user} />
        ))}
        {remaining > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border border-white">
            +{remaining}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
