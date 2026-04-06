'use client';

import { useState } from "react";
import Image from "next/image";
import { Event } from "@/interfaces";
import {
  CreditCard,
  ImageUpIcon,
} from "lucide-react";
import {
  AttendButton,
  AvatarProfile,
  EventInformation,
  FavoriteButton,
  FollowerButton,
  InterestedButton,
  GalleryPopup,
  PaymentModal,
  UploadGalleryImageDialog,
  PublisherEventStats,
  ShareEventButton
} from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventImages, useRequireAuth } from "@/hooks";
import { getTotalPrice } from "@/utils";
import { useAuthStore } from '@/store';

interface Props {
  event: Event;
}

export const EventGridItem = ({ event }: Props) => {
  const { user } = useAuthStore();
  const { requireAuth } = useRequireAuth();
  const [assist, setAssist] = useState(event.hasPaid || event.isAttending);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const { data: galleryImages } = useEventImages(event.id);
  const totalCost = getTotalPrice(event);

  const isEventOwner = user?.id === event.user.id;

  const handlePaymentSuccess = () => {
    setAssist(true);
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarProfile
              name={event.user.name}
              username={event.user.username}
              image={event.user.avatar}
              timesamp={event.timestamp}
              className='h-10 md:h-12 w-10 md:w-12'
            />
          </div>

          <div className="flex items-center">
            {!isEventOwner && user && <FollowerButton event={event} />}
            <ShareEventButton event={event} />
          </div>

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
                loading="eager"
                className="w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              {event.gallery && (
                <GalleryPopup images={galleryImages || []} />
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

        {/* Publisher Stats */}
        {isEventOwner && (
          <PublisherEventStats event={event} totalPhotos={galleryImages?.length || 0} />
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

              <InterestedButton event={event} />

              {user?.role !== "publisher" && (
                <AttendButton
                  event={event}
                  totalCost={totalCost}
                  onRequirePayment={() => setShowPaymentModal(true)}
                />
              )}

              {event.hasPaid || assist && (
                <Button
                  title="Publicar foto"
                  onClick={() => requireAuth(() => setOpenUpload(true))}
                  className="bg-gray-800 text-white hover:bg-gray-900 hover:text-white transition-colors duration-200"
                >
                  <ImageUpIcon className="h-4 w-4" />
                  <span className="hidden md:block">Subir Foto</span>
                </Button>
              )}

            </div>

            <FavoriteButton event={event} />

          </div>
          {user?.role !== "publisher" && totalCost > 0 && !assist && (
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-black text-white py-[21.1px] rounded-full text-sm cursor-pointer hover:text-white hover:bg-gray-800 transition mt-4"
              onClick={() => requireAuth(() => setShowPaymentModal(true))}
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

      <UploadGalleryImageDialog
        open={openUpload}
        onOpenChange={setOpenUpload}
        eventId={event.id}
      />

    </>
  )
}