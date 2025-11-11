import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@/interfaces";

interface Props {
  user: User;
}

export const EventConfirmedTooltipItem = ({ user }: Props) => {
  console.log(user)
  return (
    <Tooltip key={user.id}>
      <TooltipTrigger asChild>
        <Avatar
          className="h-8 w-8 border-2 border-white rounded-full transition-transform duration-200 hover:scale-110 hover:z-10 cursor-pointer"
        >
          <AvatarImage src={user?.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-sm font-medium">
        {user.name}
      </TooltipContent>
    </Tooltip>
  )
}
