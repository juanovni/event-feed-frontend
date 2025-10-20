
import { Button } from "@/components";
import { useFollowStore } from "@/store";
import { UserPlus } from "lucide-react";

interface Props {
  userId: string;
 /*  isFollowing: boolean; */
  handleFollow: () => void;
}

export const FollowerButton = ({ userId, handleFollow }: Props) => {
  const { toggleFollow, isFollowing } = useFollowStore();
  const following = isFollowing(userId);

  return (
    <>
      <Button
        /* variant={isFollowing() ? "secondary" : "outline"} */
        size="sm"
        onClick={() => toggleFollow(userId)}
      >
        <UserPlus className="mr-1.5 h-4 w-4" />
        {/* {isFollowing ? "Siguiendo" : "Seguir"} */}
      </Button>

      {/*    <Button
      variant={isFollowing ? "secondary" : "outline"}
      size="sm"
      onClick={handleFollow}>
      <UserPlus className="mr-1.5 h-4 w-4" />
      {isFollowing ? "Siguiendo" : "Seguir"}
    </Button> */}
    </>

  )
}
