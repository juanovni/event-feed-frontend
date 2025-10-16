import { AvatarIcon } from "@/components"
import { formatTime } from "@/utils";

interface Props {
  name: string;
  username?: string;
  image: string;
  timesamp?: Date;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}

export const AvatarProfile = ({ name, image, username, timesamp, className }: Props) => {
  return (
    <div className="flex items-center space-x-3">
      <AvatarIcon
        name={name}
        image={image}
        className={className}
      />
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">@{username}
          {timesamp && (
            <>
              · {formatTime(timesamp)}
            </>
          )}
        </p>
      </div>
    </div>
  )
}
