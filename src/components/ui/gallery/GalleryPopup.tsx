'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X, Images } from "lucide-react";
/* import { PhotoDetail } from "./PhotoDetail"; */

interface GalleryPopupProps {
  images: string[];
}

interface Photo {
  id: number;
  image_url: string;
  photographer_name: string;
}
const defaultPhotos: Photo[] = [
  {
    id: 1,
    image_url: 'https://offloadmedia.feverup.com/secretchicago.com/wp-content/uploads/2023/08/13042908/bub-city-1024x762.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 2,
    image_url: 'https://offloadmedia.feverup.com/secretchicago.com/wp-content/uploads/2023/08/13042908/bub-city-1024x762.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 3,
    image_url: 'https://offloadmedia.feverup.com/secretmiami.com/wp-content/uploads/2021/12/13053615/334061804_1396914061112320_8657061276421314979_n.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 4,
    image_url: 'https://offloadmedia.feverup.com/secretchicago.com/wp-content/uploads/2023/08/13042908/bub-city-1024x762.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 5,
    image_url: 'https://offloadmedia.feverup.com/secretchicago.com/wp-content/uploads/2023/08/13042908/bub-city-1024x762.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 6,
    image_url: 'https://esa-cdn.carta.menu/storage/media/company_gallery/75431901/conversions/contribution_gallery.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 7,
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    photographer_name: 'Juan'
  }
]


export const GalleryPopup: React.FC<GalleryPopupProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photos] = useState<Photo[]>(defaultPhotos);
  /* const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null); */

  const getRandomSize = (index: number) => {
    const sizes = [
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-2',
      'col-span-2 row-span-2',
    ];
    return sizes[index % sizes.length];
  };

  return (
    <>
      {/* 🔘 Botón para abrir galería */}
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm hover:bg-black/80 transition"
      >
        <Images size={16} /> {images.length} fotos
      </button>

      {/* 🪟 Modal tipo Instagram */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Fondo oscuro */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Contenedor principal */}

        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
          <div className="min-h-screen p-8">
            <div className="max-w-8xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Galería de Fotos</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-white hover:text-gray-300 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`${getRandomSize(index)} relative group cursor-pointer overflow-hidden rounded-lg`}
                  /* onClick={() => setSelectedPhoto(photo)} */
                  >
                    <Image
                      width={200}
                      height={200}
                      src={photo.image_url}
                      alt={`Foto por ${photo.photographer_name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                        <p className="font-semibold">{photo.photographer_name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {photos.length === 0 && (
                <div className="text-center text-white text-xl mt-20">
                  No hay fotos disponibles
                </div>
              )}
            </div>
          </div>
        </div>


      </Dialog>

      {/* {selectedPhoto && (
        <PhotoDetail
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )} */}
    </>
  );
};
