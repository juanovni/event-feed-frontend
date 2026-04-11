"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModalStore } from "@/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const AuthRequiredModal = () => {
  const { isOpen, closeModal, payload } = useAuthModalStore();
  const event = payload?.event;
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className="
          w-[90%] max-w-md
          rounded-2xl
          border border-white/10
          shadow-2xl
          text-center
          p-6
          animate-in fade-in zoom-in-95"
      >
        {/* LOGO / ICON */}
        <div className="flex justify-center">
          <Image
            width={200}
            height={200}
            src={event?.user?.avatar || "/images/default-avatar.jpeg"}
            alt={event?.user?.name || "Usuario"}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold">
          {event
            ? `No te pierdas ninguna publicacion de ${event.user.name}`
            : "No te pierdas ningún evento"}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600">
          Regístrate o inicia sesión para comenzar a descubrir eventos personalizados según tus intereses.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 mt-4">

          <Button
            variant="outline"
            size="lg"
            className="w-full bg-black text-white py-[21.1px] rounded-full text-sm cursor-pointer hover:text-white hover:bg-gray-800 transition mt-4"
            onClick={() => {
              closeModal();
              router.push("/auth/register");
            }}
          >
            Registrarte
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full text-black py-[21.1px] rounded-full text-sm cursor-pointer transition"
            onClick={() => {
              closeModal();
              router.push("/auth/login");
            }}
          >
            Iniciar sesión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}