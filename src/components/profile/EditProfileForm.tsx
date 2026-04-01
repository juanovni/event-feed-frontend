"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useAuthStore } from "@/store";
import { useCategories } from "@/hooks";
import { eventApi } from "@/api/event.api";
import { Category } from "@/interfaces";

export default function EditProfileForm() {
  const { user, setUser } = useAuthStore();

  const { data: categories } = useCategories();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: user?.description || "",
    gender: user?.gender || "",
    birthdate: user?.birthdate?.slice(0, 10) || "",
    location: user?.location || "",
    phone: user?.phone || "",
    categories: user?.categories?.map((c: any) => c.id) || [],
    avatar: user?.avatar || "",
  });

  const toggleCategory = (id: string) => {
    setForm((prev) => {
      const exists = prev.categories.includes(id);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== id)
          : [...prev.categories, id],
      };
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      avatar: preview,
    }));

  };


  const handleSave = async () => {
    try {
      setLoading(true);

      const { data } = await eventApi.put("/users/me", form);

      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!user) return;

    setForm({
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      bio: user.description || "",
      gender: user.gender,
      birthdate: user.birthdate.slice(0, 10),
      location: user.location || "",
      phone: user.phone || "",
      categories: user.categories?.map((c: any) => c.id) || [],
      avatar: user.avatar || "",
    });
  }, [user]);

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* AVATAR */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={form.avatar || "/images/default-avatar.jpeg"}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full object-cover w-28 h-28"
          />

          <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
            <Camera size={16} />
            <input
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-center font-semibold text-md">@{user?.username}</div>

      {/* NAME */}
      <div>
        <label className="text-sm text-gray-500">Nombres</label>
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label className="text-sm text-gray-500">Apellidos</label>
        <input
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* BIO */}
      <div>
        <label className="text-sm text-gray-500">Descripción</label>
        <textarea
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          rows={3}
        />
      </div>

      {/* GENERO */}
      <div>
        <label className="text-sm text-gray-500">Género</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {["Mujer", "Hombre", "No binario", "Prefiero no decirlo"].map((g) => (
            <button
              key={g}
              onClick={() => setForm({ ...form, gender: g })}
              className={`p-2 border rounded-lg text-sm ${form.gender === g
                ? "bg-black text-white border-black"
                : "border-gray-300"
                }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* FECHA */}
      <div>
        <label className="text-sm text-gray-500">Fecha de nacimiento</label>
        <input
          type="date"
          value={form.birthdate}
          onChange={(e) =>
            setForm({ ...form, birthdate: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* UBICACION */}
      <div>
        <label className="text-sm text-gray-500">Ubicación</label>
        <input
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* TELEFONO */}
      <div>
        <label className="text-sm text-gray-500">Celular</label>
        <input
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* INTERESES */}
      <div>
        <label className="text-sm text-gray-500">Intereses</label>

        <div className="flex flex-wrap gap-2 mt-2">
          {categories?.map((cat: Category) => {
            const active = form.categories.includes(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm ${active
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full bg-black text-white py-3 rounded-full disabled:opacity-50 
          ${loading ? 'cursor-not-allowed' : 'hover:bg-gray-800'} transition`}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}