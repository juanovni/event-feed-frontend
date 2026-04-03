"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Camera,
  Edit2,
  MapPin,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "@/store/auth/authStore";
import { Category } from "@/interfaces";

interface Stats {
  label: string;
  value: number;
}

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!user) return null;

  const formatJoinDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
  };

  const avatarSrc =
    user?.avatar
      ? `${user.avatar}?t=${Date.now()}`
      : "/default-avatar.png";

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 space-y-6">

      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-5 sm:p-6">

          {/* Avatar + Info */}
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-6">

            {/* Avatar */}
            <div className="relative mb-4 sm:mb-0">
              <Image
                width={200}
                height={200}
                src={avatarSrc}
                alt={user?.name || "avatar"}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <button className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-full hover:scale-105 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left w-full">

              {/* Name + Edit */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {user?.name || "Sin nombre"} {user?.lastName || ""}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    @{user?.username || "username"}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/profile/edit")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:opacity-90 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar perfil</span>
                </button>
              </div>

              {/* Bio */}
              {user?.description && (
                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                  {user.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs sm:text-sm text-gray-600 mb-4">

                {user?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}

                {user?.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Se unió en {formatJoinDate(user.createdAt)}
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-6">
                <Stat label="Publicaciones" value={0} />
                <Stat label="Seguidores" value={0} />
                <Stat label="Siguiendo" value={0} />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      {user?.categories && user.categories.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Intereses
          </h2>

          <div className="flex flex-wrap gap-2">
            {user.categories.map((cat: Category) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* Mini componente */
const Stat = ({ label, value }: Stats) => (
  <div className="text-center">
    <div className="text-base sm:text-lg font-semibold text-gray-900">
      {Number(value).toLocaleString()}
    </div>
    <div className="text-[11px] sm:text-xs text-gray-500">
      {label}
    </div>
  </div>
);