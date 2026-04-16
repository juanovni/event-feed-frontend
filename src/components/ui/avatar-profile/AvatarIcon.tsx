import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "../avatar";

interface Props {
  name: string;
  image?: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}

export const AvatarIcon = ({ name, image, className }: Props) => {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage
        src={image}
        alt={name}
        className={`${className} rounded-full object-cover ring-2 ring-gray-100`}
      />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
