'use client';

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { X, Images } from "lucide-react";

interface GalleryPopupProps {
  images: string[];
}

export const GalleryPopup: React.FC<GalleryPopupProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
            >
              <X size={18} />
            </button>

            {/* Carrusel */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                className="w-full max-h-[80vh] object-contain bg-black"
              />

              {/* Flechas navegación */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    ›
                  </button>
                </>
              )}
            </motion.div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 bg-black/70 py-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-500"}`}
                />
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
