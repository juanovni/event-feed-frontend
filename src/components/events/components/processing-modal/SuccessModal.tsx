"use client";

import { useEffect, useState } from "react";

export default function SuccessModal({ onClose }: { onClose?: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // animación entrada
    const timer = setTimeout(() => {
      onClose?.(); // auto cerrar
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className={`bg-white rounded-xl shadow-xl w-[420px] px-8 py-7 flex flex-col items-center gap-4 transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>

        {/* Check animado */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white animate-drawCheck"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Texto */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            ¡Asistencia confirmada!
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Ya estás inscrito en el evento 🎉
          </p>
        </div>

        {/* Botón opcional */}
        <button
          onClick={onClose}
          className="mt-4 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}