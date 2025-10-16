import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

const confirmedFriends = [
  { id: 1, name: "María", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Carlos", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 3, name: "Laura", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
];

export const AvatarsFriendsWidget = () => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <div className="flex items-center -space-x-2">
          {confirmedFriends.map((friend) => (
            <Tooltip key={friend.id}>
              <TooltipTrigger asChild>
                <Avatar
                  className="
                      h-8 w-8 border-2 border-white rounded-full
                      transition-transform duration-200
                      hover:scale-110 hover:z-10 cursor-pointer
                    "
                >
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-sm font-medium">
                {friend.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <p className="text-muted-foreground text-sm">tus amigos ya confirmaron</p>
    </div>
  )
}
