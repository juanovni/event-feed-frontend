
import { Button } from "@/components";
import { UserPlus } from "lucide-react";

interface Props {
  isFollowing: boolean;
  handleFollow: () => void;
}

export const FollowerButton = ({ isFollowing, handleFollow }: Props) => {
  return (
    <Button
      variant={isFollowing ? "secondary" : "outline"}
      size="sm"
      onClick={handleFollow}>
      <UserPlus className="mr-1.5 h-4 w-4" />
      {isFollowing ? "Siguiendo" : "Seguir"}
    </Button>
  )
}
