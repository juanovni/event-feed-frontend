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
    image_url: 'https://scontent.cdninstagram.com/v/t51.75761-15/488755914_18045350327584200_2691189010476031384_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzYwNzEzNjkxODc5MTY2Mzk4OQ%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=iFgMwxlelT4Q7kNvwHJqR_w&_nc_oc=Adlp5SJvICnn5TuvKwRrIyqoe6i24CAQ3gvSMQq3tExSY0Hhn0qcBwmtJbaQG6TRB4k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=_oxl1D0HJdi9TGb5N1HDGg&oh=00_AfdlvFZ984ftLt_2vdODXFgxS0gSTpMUF3rhFEwQ_dWyKQ&oe=68FB7BB0',
    photographer_name: 'Juan'
  },
  {
    id: 2,
    image_url: 'https://scontent.cdninstagram.com/v/t51.75761-15/481377883_18040173806584200_7448017545496699739_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=102&ig_cache_key=MzU3MzcxMTU4MjA3NDk4NDU4Mg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzMzR4MTY2Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=-bsGnsRRqREQ7kNvwEIl4UE&_nc_oc=AdkM-rsH-uU604cnjJo4ZN-Tqvlqiv0kAlS9xVQxTzz9mMFOtCFN1csNOgvhHcZzTmA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=aH-6rNd9I19AETP_xdbM1w&oh=00_AfebQSMvwzkgBGXzT-sT1-q2T_CxgXEFMuJ9OQeP6ojrgg&oe=68FB7FE9',
    photographer_name: 'Juan'
  },
  {
    id: 3,
    image_url: 'https://offloadmedia.feverup.com/secretmiami.com/wp-content/uploads/2021/12/13053615/334061804_1396914061112320_8657061276421314979_n.jpg',
    photographer_name: 'Juan'
  },
  {
    id: 4,
    image_url: 'https://scontent.cdninstagram.com/v/t51.75761-15/487077406_18044067791584200_8493636497851970786_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=100&ig_cache_key=MzU5ODQ0MjQyMDk4MTE5ODQxMw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=npS5qonkZDcQ7kNvwGMeRge&_nc_oc=AdmyWpxPNgwTL5Ii6kPN6UL8NQRjJ7L77Bdci3qMP2NTt2pas52MjdYTPIZ_ptLk6jo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=_oxl1D0HJdi9TGb5N1HDGg&oh=00_AfdJgB-Phk3wl9-JM76cbzdfP6zVFA4eMdr0QMsHKBsALQ&oe=68FB81CA',
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
