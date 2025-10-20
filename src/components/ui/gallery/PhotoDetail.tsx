'use client';

import { X, User, Clock } from 'lucide-react';

interface Photo {
  id: number;
  image_url: string;
  photographer_name: string;
}

interface PhotoDetailProps {
  photo: Photo;
  onClose: () => void;
}

export function PhotoDetail({ photo, onClose }: PhotoDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-98 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center bg-black p-8">
            <img
              src={photo.image_url}
              alt={`Foto por ${photo.photographer_name}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>

          <div className="w-full md:w-80 bg-gray-900 p-8 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Detalles de la Foto</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="text-blue-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Fotógrafo</p>
                  <p className="text-white text-lg font-semibold">
                    {photo.photographer_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Fecha y Hora</p>
                  <p className="text-white text-lg">
                    {/* {formatDate(photo.taken_at)} */}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
