'use client';

import { useState } from "react";
import Image from "next/image";
import { Event } from "@/interfaces";
import {
  CheckCircle2,
  CreditCard,
  ImageUpIcon,
  LoaderCircle,
  Users,
} from "lucide-react";
import {
  AvatarProfile,
  EventInformation,
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
import { useEventImages, useRequireAuth, useToggleAttend } from "@/hooks";
import { getTotalPrice } from "@/utils";
import { useAuthStore } from '@/store';
import { EventMediaBlock } from "../event-detail/EventMediaBlock";

interface Props {
  event: Event;
}

export const EventGridItem = ({ event }: Props) => {
  const { user } = useAuthStore();
  const { requireAuth } = useRequireAuth();
  const { mutateAsync: attendEvent } = useToggleAttend();
  const [assist, setAssist] = useState(event.hasPaid || event.isAttending);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const { data: galleryImages } = useEventImages(event.id);
  const totalCost = getTotalPrice(event);

  const isEventOwner = user?.id === event.user.id;
  const isConfirmed = event.hasPaid || assist;
  const isPastEvent = new Date(event.eventDate).getTime() < Date.now();

  const handlePaymentSuccess = () => {
    setAssist(true);
  }

  const handleAttendance = () => {
    requireAuth(
      async () => {
        if (totalCost > 0) {
          setShowPaymentModal(true);
          return;
        }

        try {
          setIsSubmittingAttendance(true);
          const response = await attendEvent(event.id);

          if (response?.attending) {
            setAssist(true);
          }
        } catch (error) {
          console.error("Error al confirmar asistencia", error);
        } finally {
          setIsSubmittingAttendance(false);
        }
      },
      {
        event,
        action: "JOIN",
      }
    );
  };

  const handleOpenUpload = () => {
    requireAuth(() => setOpenUpload(true));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarProfile
              userId={event.user.id}
              name={event.user.name}
              username={event.user.username}
              image={event.user.avatar}
              timestamp={event.timestamp}
              className='h-10 md:h-12 w-10 md:w-12'
            />
          </div>

          <div className="flex items-center">
            {!isEventOwner && user && <FollowerButton event={event} />}
            <ShareEventButton event={event} />
          </div>

        </div>

        {/* Media */}
        <EventMediaBlock
          event={event}
          galleryImages={galleryImages || []}
          objectFit="contain"
          className="rounded-sm border bg-black"
        />


        {/* Informations */}
        <EventInformation event={event} />

        {/* Publisher Stats */}
        {isEventOwner && (
          <PublisherEventStats event={event} totalPhotos={galleryImages?.length || 0} />
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex justify-center">
            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              <InterestedButton event={event} />
              <Button
                variant="outline"
                className="h-11 rounded-full border-black/10 bg-white hover:bg-muted"
                onClick={handleOpenUpload}
                disabled={!isConfirmed}
                title={isConfirmed ? "Publicar foto" : "Debes confirmar tu asistencia para publicar"}
              >
                <ImageUpIcon className="h-4 w-4" />
                Subir foto
              </Button>
            </div>
          </div>
          {!isEventOwner && (
            <Button
              size="lg"
              className="mt-4 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
              onClick={handleAttendance}
              disabled={isConfirmed || isPastEvent || isSubmittingAttendance}
            >
              {isSubmittingAttendance ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Confirmando...
                </>
              ) : isConfirmed ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Asistencia confirmada
                </>
              ) : totalCost > 0 ? (
                <>
                  <CreditCard className="h-4 w-4" />
                  Comprar entrada
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
                  Confirmar asistencia
                </>
              )}
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
