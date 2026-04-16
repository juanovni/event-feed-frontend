import Link from "next/link";
import { AvatarIcon } from "@/components"
import { formatTime } from "@/utils";

interface Props {
  userId?: string;
  name: string;
  username?: string;
  image?: string;
  timestamp?: Date;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}

export const AvatarProfile = ({ userId, name, image, username, timestamp, className }: Props) => {
  const content = (
    <div className="flex items-center space-x-2">
      <AvatarIcon
        name={name}
        image={image}
        className={className}
      />
      <div>
        <h3 className="font-semibold text-xs md:text-base text-gray-900">
          <div className="flex items-center gap-1">
            <span>{name}</span>
          </div>
        </h3>
        <p className="text-xs md:text-sm text-gray-500">@{username}
          {timestamp && (
            <>
              · {formatTime(timestamp)}
            </>
          )}
        </p>
      </div>
    </div>
  );

  if (!userId) {
    return content;
  }

  return (
    <Link href={`/profile/${userId}`} className="block transition-opacity hover:opacity-80">
      {content}
    </Link>
  );
}
