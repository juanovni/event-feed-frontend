'use client';

import { useState } from "react";
import { Event } from "@/interfaces";
import {
  CreditCard,
  MessageCircle,
  Users
} from "lucide-react";
import { IoSendOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils";
import {
  AvatarProfile,
  Button,
  EventInformation,
  FavoriteButton,
  FollowerButton,
  InterestedButton,
  GalleryPopup,
  PaymentModal
} from "@/components";
import { Badge } from "@/components/ui/badge";

interface Props {
  event: Event;
}

export const EventGridItem = ({ event }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [assist, setAssist] = useState(false);
  const distanceKm = 4;
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handlePaymentSuccess = () => {
    setAssist(true);
  }

  const handleAttend = () => {
    if (event.cost === 0) {
      setAssist(!assist);
    } else {
      setShowPaymentModal(true);
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
        <div className="relative bg-gray-100">
          {event.mediaType === 'image' ? (
            <>
              <img
                src={event.mediaUrl}
                alt="Post content"
                className="w-full object-cover max-h-96 cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              {event.gallery && event.gallery.length > 1 && (
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
                size="lg"

              >
                <Users className={cn("mr-2 h-4 w-4", assist && "fill-current")} />
                <span>{assist ? "Confirmado" : "Asistiré"}</span>
              </Button>

              {/* <Button
                onClick={() => setShowComments(!showComments)}
                variant="outline"
                size="lg"
              >
                <MessageCircle />{event.comments.length}
              </Button> */}

              {event.cost > 0 && (
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="w-60 font-medium bg-gray-800 text-white hover:bg-gray-900 hover:text-white transition-colors duration-200"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <CreditCard />
                  Pagar y Confirmar Asistencia
                </Button>
              )}

            </div>

            <FavoriteButton event={event} />

          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-100">
            <div className="p-4 space-y-4">
              {event.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-4 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                      <button className="text-xs text-gray-500 hover:text-red-500 transition-colors duration-200">
                        Me gusta ({comment.likes})
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t border-gray-100">
              <form
                /* onSubmit={handleSubmitComment}  */
                className="flex space-x-3">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    /* value={newComment}
                    onChange={(e) => setNewComment(e.target.value)} */
                    placeholder="Escribe un comentario..."
                    className="flex-1 px-4 py-2 bg-gray-50 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  />
                  <button
                    type="submit"
                    /*  disabled={!newComment.trim()} */
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <IoSendOutline className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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