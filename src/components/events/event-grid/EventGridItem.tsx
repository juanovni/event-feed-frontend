'use client';

import { useState } from "react";
import Image from "next/image";
import { Event } from "@/interfaces";
import {
  CreditCard,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AvatarProfile,
  EventInformation,
  FavoriteButton,
  FollowerButton,
  InterestedButton,
  GalleryPopup,
  PaymentModal
} from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  event: Event;
}

export const EventGridItem = ({ event }: Props) => {
  const [assist, setAssist] = useState(event.hasPaid);
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handlePaymentSuccess = () => {
    setAssist(true);
  }

  const handleAttend = () => {
    if (event.cost === 0) {
      setAssist(!assist);
    } else {
      if (!assist) {
        setShowPaymentModal(true);
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">

          <AvatarProfile
            name={event.user.name}
            username={event.user.username}
            image={event.user.avatar}
            timesamp={event.timestamp}
            className='h-12 w-12'
          />

          <FollowerButton event={event} />

        </div>

        {/* Media */}
        <div className="relative bg-black">
          {event.mediaType === 'image' ? (
            <>
              <Image
                src={event.mediaUrl}
                width={200}
                height={200}
                alt="Post content"
                className="w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              {event.gallery && (
                <GalleryPopup images={event.gallery} />
              )}
            </>
          ) : (
            <video
              src={event.mediaUrl}
              controls
              className="w-full object-cover max-h-96"
              poster="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          )}
          <Badge variant="secondary" className="absolute right-3 top-3">{event.category}</Badge>
        </div>

        {/* Informations */}
        <EventInformation event={event} />

        {/* Actions */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

              <InterestedButton event={event} />

              <Button
                onClick={handleAttend}
                variant={assist ? "secondary" : "outline"}
                className="flex-1"
              >
                <Users className={cn("mr-2 h-4 w-4", assist && "fill-current")} />
                <span>{assist ? "Confirmado" : "Asistiré"}</span>
              </Button>
            </div>

            <FavoriteButton event={event} />

          </div>
          {event.cost > 0 && !assist && (
            <Button
              variant="outline"
              size="lg"
              className="w-full mt-3 font-medium bg-gray-800 text-white hover:bg-gray-900 hover:text-white transition-colors duration-200"
              onClick={() => setShowPaymentModal(true)}
            >
              <CreditCard />
              Pagar y Confirmar Asistencia
            </Button>
          )}
        </div>
      </div>

      <PaymentModal
        event={event}
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onSuccess={handlePaymentSuccess}
      />
    </>
  )
}