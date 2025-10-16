'use client';

import { useState } from "react";
import { Event } from "@/interfaces";
import { Bookmark, Calendar, CreditCard, DollarSign, Map, MessageCircle, Share, ThumbsUp, UserPlus, Users } from "lucide-react";
import { IoSendOutline } from "react-icons/io5";
import { GalleryPopup } from "../ui/gallery/GalleryPopup";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Props {
  event: Event;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (date: Date) => {
  return date
    .toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace('a. m.', 'AM')
    .replace('p. m.', 'PM');
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'attending':
      return 'bg-green-600 hover:bg-green-700 text-white';
    case 'interested':
      return 'bg-yellow-600 hover:bg-yellow-700 text-white';
    default:
      return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'attending':
      return 'Asistiré';
    case 'interested':
      return 'Me interesa';
    default:
      return 'Marcar interés';
  }
};

export const FeedGridItem = ({ event }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [interested, setInterested] = useState(false);
  const [assist, setAssist] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    //onFollow?.(event.publisherId)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={event.user.avatar}
            alt={event.user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{event.user.name}</h3>
            <p className="text-sm text-gray-500">@{event.user.username} · {formatTime(event.timestamp)}</p>
          </div>
        </div>

        <Button
          variant={isFollowing ? "secondary" : "outline"}
          size="sm"
          onClick={handleFollow}>
          <UserPlus className="mr-1.5 h-4 w-4" />
          {isFollowing ? "Siguiendo" : "Seguir"}
        </Button>

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

      <div className="mt-2 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-balance">{event.title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{event.description}</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Map size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
            <span className="font-medium">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
            <span className="font-medium">{formatDate(event.eventDate)}</span><span className="font-medium"> • {formatTime(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
            <p className="font-medium">
              {event.cost === 0 ? "Entrada gratuita" : `${event.cost} ${event.currency}`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="h-4 w-4 shrink-0 text-blue-800 font-bold" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">122</span> asistirán •{" "}
              <span className="font-medium text-foreground">30</span> interesados
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setInterested(!interested)}
              variant={interested ? "secondary" : "outline"}
              className="flex-1"
              size="lg"

            >
              <ThumbsUp className={cn("mr-2 h-4 w-4", interested && "fill-current")} />
              <span>{interested ? "Interesado" : "Me interesa"}</span>
            </Button>

            <Button
              onClick={() => setAssist(!assist)}
              variant={assist ? "secondary" : "outline"}
              className="flex-1"
              size="lg"

            >
              <Users className={cn("mr-2 h-4 w-4", assist && "fill-current")} />
              <span>{assist ? "Confirmado" : "Asistiré"}</span>
            </Button>

            <Button
              onClick={() => setShowComments(!showComments)}
              variant="outline"
              size="lg"
            >
              <MessageCircle />{event.comments.length}
            </Button>

          </div>

          <Button
            variant="outline"
            size="lg"
            className="p-2 text-gray-500 rounded-full transition-all duration-200"
          >
            <Bookmark />
          </Button>

        </div>

        {event.cost > 0 && (
          <Button
            variant="outline"
            size="lg"
            className="flex-1 w-full mt-4 bg-blue-600 text-white hover:bg-blue-500 hover:text-white transition-colors duration-200"
          /* onClick={() => setShowPaymentModal(true)} */
          >
            <CreditCard />
            Pagar y Confirmar Asistencia
          </Button>
        )}
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
  )
}
