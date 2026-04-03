'use client';

import { useState } from 'react';
import { Event } from '@/interfaces';
import {
  MoreVertical,
  Copy,
} from 'lucide-react';
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { toast } from 'sonner';

interface Props {
  event: Event;
}

export const ShareEventButton = ({ event }: Props) => {
  const [openSharePopover, setOpenSharePopover] = useState(false);

  const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${event.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      toast('Enlace copiado al portapapeles');
      setOpenSharePopover(false);
    } catch (err) {
      console.error('Error al copiar enlace:', err);
      toast.error('Error al copiar el enlace');
    }
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setOpenSharePopover(false);
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(`¡Únete a ${event.title}!`)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setOpenSharePopover(false);
  };

  return (
    <Popover open={openSharePopover} onOpenChange={setOpenSharePopover}>
      <PopoverTrigger asChild>
        <Button variant="link" size="default" className="h-6 w-6">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="end">
        <div className="flex flex-col">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 font-medium text-sm transition-colors cursor-pointer"
          >
            <Copy className="h-5 w-5" />
            Copiar enlace
          </button>
          <button
            onClick={handleShareFacebook}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 font-medium text-sm border-t transition-colors cursor-pointer"
          >
            <FaFacebook className="h-5 w-5" />
            Compartir en Facebook
          </button>
          <button
            onClick={handleShareTwitter}
            className="flex gap-3 px-4 py-3 hover:bg-gray-100 font-medium text-sm border-t transition-colors cursor-pointer"
          >
            <FaTwitter className="h-5 w-5" />
            Compartir en Twitter
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
