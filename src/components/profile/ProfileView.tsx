'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bookmark,
  Calendar,
  Camera,
  Edit2,
  MapPin,
  NotebookTabs,
  ThumbsUp,
} from "lucide-react";
import { InterestedEventsGrid, PublisherEventsSection, Title } from "@/components";
import { Category, User } from "@/interfaces";
import { useEventsByUser, useInterestedEvents } from "@/hooks";

interface Props {
  profile: User;
  isOwnProfile?: boolean;
}

interface Stats {
  label: string;
  value: number;
}

export const ProfileView = ({ profile, isOwnProfile = false }: Props) => {
  const router = useRouter();
  const { data: interestedEventsResponse, isLoading: isLoadingInterested } = useInterestedEvents();
  const roleType = profile.role_type ?? profile.role;
  const isPublisher = roleType === "publisher";
  const { data: createdEvents = [], isLoading: isLoadingCreatedEvents } = useEventsByUser(
    isPublisher ? profile.id : ""
  );
  const [activeTab, setActiveTab] = useState<'interested' | 'created' | 'saved'>(
    isPublisher ? "created" : "interested"
  );
  const interestedEvents = isOwnProfile ? interestedEventsResponse?.items ?? [] : [];

  useEffect(() => {
    if (!isOwnProfile && activeTab !== "created" && isPublisher) {
      setActiveTab("created");
    }

    if (!isPublisher && activeTab === "created") {
      setActiveTab(isOwnProfile ? "interested" : "saved");
    }
  }, [activeTab, isOwnProfile, isPublisher]);

  const formatJoinDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
  };

  const avatarSrc =
    profile.avatar
      ? `${profile.avatar}?t=${Date.now()}`
      : "/images/default-avatar.jpeg";

  const showInterestedTab = isOwnProfile;
  const showSavedTab = isOwnProfile;
  const showCreatedTab = isPublisher;
  const pageTitle = isOwnProfile ? "Mi Perfil" : "Perfil";

  return (
    <div className="space-y-4">
      <Title title={pageTitle}>{""}</Title>

      <div className="max-w-6xl mx-auto px-2 md:px-0 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative mb-4 sm:mb-0">
                <Image
                  width={200}
                  height={200}
                  src={avatarSrc}
                  alt={profile.name || "avatar"}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />

                {isOwnProfile && (
                  <button className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-full hover:scale-105 transition">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {profile.name || "Sin nombre"} {profile.lastName || ""}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      @{profile.username || "username"}
                    </p>
                  </div>

                  {isOwnProfile && (
                    <button
                      onClick={() => router.push("/profile/edit")}
                      className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:opacity-90 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar perfil</span>
                    </button>
                  )}
                </div>

                {profile.description && (
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    {profile.description}
                  </p>
                )}

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs sm:text-sm text-gray-600 mb-4">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}

                  {profile.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Se unió en {formatJoinDate(profile.createdAt)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-6">
                  {isPublisher && <Stat label="Eventos" value={isPublisher ? createdEvents.length : 0} />}
                  <Stat label="Seguidores" value={0} />
                  <Stat label="Siguiendo" value={0} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isOwnProfile && profile.categories && profile.categories.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Intereses
            </h2>

            <div className="flex flex-wrap gap-2">
              {profile.categories.map((cat: Category) => (
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

        {(showCreatedTab || showInterestedTab || showSavedTab) && (
          <div className="flex items-center justify-around border-b border-gray-200 mb-3">
            {showCreatedTab && (
              <button
                onClick={() => setActiveTab('created')}
                className={`flex flex-col items-center py-2 cursor-pointer ${activeTab === 'created' ? 'text-black' : 'text-gray-400'}`}
              >
                <NotebookTabs className="w-5 h-5" />
                <div className={`h-[2px] w-6 mt-1 ${activeTab === 'created' ? 'bg-black' : 'bg-transparent'}`} />
              </button>
            )}

            {showInterestedTab && (
              <button
                onClick={() => setActiveTab('interested')}
                className={`flex flex-col items-center py-2 cursor-pointer ${activeTab === 'interested' ? 'text-black' : 'text-gray-400'}`}
              >
                <ThumbsUp className="w-5 h-5" />
                <div className={`h-[2px] w-6 mt-1 ${activeTab === 'interested' ? 'bg-black' : 'bg-transparent'}`} />
              </button>
            )}

            {showSavedTab && (
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex flex-col items-center py-2 cursor-pointer ${activeTab === 'saved' ? 'text-black' : 'text-gray-400'}`}
              >
                <Bookmark className="w-5 h-5" />
                <div className={`h-[2px] w-6 mt-1 ${activeTab === 'saved' ? 'bg-black' : 'bg-transparent'}`} />
              </button>
            )}
          </div>
        )}

        {activeTab === 'created' && showCreatedTab && (
          <PublisherEventsSection
            events={createdEvents}
            isLoading={isLoadingCreatedEvents}
          />
        )}

        {activeTab === 'interested' && showInterestedTab && (
          isLoadingInterested ? (
            <div className="grid grid-cols-3 gap-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-square animate-pulse" />
              ))}
            </div>
          ) : (
            <InterestedEventsGrid events={interestedEvents} />
          )
        )}

        {activeTab === 'saved' && showSavedTab && (
          <div className="rounded-[28px] border border-dashed border-gray-200 px-6 py-12 text-center text-sm text-gray-500">
            Próximamente verás aquí tus eventos guardados.
          </div>
        )}

        {!showCreatedTab && !showInterestedTab && !showSavedTab && (
          <div className="rounded-[28px] border border-dashed border-gray-200 px-6 py-12 text-center text-sm text-gray-500">
            Este usuario aún no tiene contenido público para mostrar.
          </div>
        )}
      </div>
    </div>
  );
};

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
