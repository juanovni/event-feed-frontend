import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@/interfaces";

interface Props {
  user: User;
}

export const EventConfirmedTooltipItem = ({ user }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          {/* Gradient ring */}
          <div className="p-[2px] rounded-full bg-gradient-to-tr">
            <Avatar className="h-8 w-8 border-2 border-white rounded-full transition-all duration-200 hover:scale-110 hover:z-10 cursor-pointer">
              <AvatarImage src={user?.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </TooltipTrigger>

      <TooltipContent side="top" className="text-sm font-medium">
        {user.name}
      </TooltipContent>
    </Tooltip>
  );
};