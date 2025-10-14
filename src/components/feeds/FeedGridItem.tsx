'use client';

import { Post } from "@/interfaces";
import { useState } from "react";
import {
  IoBookmarkOutline,
  IoCalendarOutline,
  IoHeartCircle,
  IoMapOutline,
  IoSendOutline,
  IoShareOutline,
  IoSwapHorizontalOutline
} from "react-icons/io5";

interface Props {
  post: Post;
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
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
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

export const FeedGridItem = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <p className="text-sm text-gray-500">@{post.user.username} · {formatTime(post.timestamp)}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <IoSwapHorizontalOutline className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      {/* <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div> */}

      {/* Media */}
      <div className="relative bg-gray-100">
        {post.mediaType === 'image' ? (
          <img
            src={post.mediaUrl}
            alt="Post content"
            className="w-full object-cover max-h-96 cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <video
            src={post.mediaUrl}
            controls
            className="w-full object-cover max-h-96"
            poster="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-3">{post.content}</p>
        </div>
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center space-x-1">
            <IoMapOutline size={16} />
            <span>{post.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <IoCalendarOutline size={16} />
            <span>{formatDate(post.eventDate)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              /* onClick={() => onLike(post.id)} */
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${post.isLiked
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
            >
              <IoHeartCircle className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>

            <button
              /* onClick={() => setShowComments(!showComments)} */
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              {/* <MessageCircle className="w-5 h-5" /> */}
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-all duration-200">
              <IoShareOutline className="w-5 h-5" />
            </button>
          </div>

          <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200">
            <IoBookmarkOutline className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <div className="p-4 space-y-4">
            {post.comments.map((comment) => (
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
