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
      ? `${user.avatar}?t=${Date.now()}` // 🔥 evita cache Cloudinary
      : "/default-avatar.png";

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">

            {/* Avatar */}
            <div className="relative -mt-20 mb-4 sm:mb-0">
              <Image
                width={200}
                height={200}
                src={avatarSrc}
                alt={user?.name || "avatar"}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <button className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-full hover:scale-105 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {user?.name || "Sin nombre"} {user?.lastName || ""}
                  </h1>
                  <p className="text-gray-600">
                    @{user?.username || "username"}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/profile/edit")}
                  className="cursor-pointer mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:opacity-90 transition">
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              </div>

              {/* Bio */}
              {user?.description && (
                <p className="text-gray-800 mb-4 leading-relaxed text-sm">
                  {user.description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">

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
              <div className="flex gap-6">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Intereses
          </h2>

          <div className="flex flex-wrap gap-2">
            {user.categories.map((cat: Category) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
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
    <div className="text-lg font-semibold text-gray-900">
      {Number(value).toLocaleString()}
    </div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);