import Link from 'next/link';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  url: string;
  title: string;
}

export const TicketHeader = ({ url, title }: Props) => {
  return (
    <div className="relative h-64 overflow-hidden">
      <Image
        width={200}
        height={200}
        src={url}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/25 to-background" />
      <Link href="/tickets">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  )
}
