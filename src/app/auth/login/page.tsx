"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store";
import { ImageAccordion } from "@/components/ui/image-accordion/ImageAccordion";
import { Logo } from "@/components/ui/logo/Logo";
import { getSafeRedirectPath } from "@/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      router.push(redirectTo);
    } catch (err) {
      console.log(err);
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* LOGO */}
      <Logo className="top-12 md:top-4 left-0 md:left-4 justify-center md:justify-start"/>

      {/* CONTENIDO */}
      <div className="flex items-center justify-center px-4 py-30">
        <form
          className="w-full max-w-sm space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">
              Inicia sesión para continuar
            </h2>
            <p className="text-sm text-gray-500">
              Ingresa tus credenciales para acceder a tu cuenta y descubrir eventos personalizados según tus intereses.
            </p>
          </div>

          <input
            type="email"
            placeholder="Correo"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={`w-full bg-black text-white py-3 rounded-full text-sm cursor-pointer ${!isFormValid || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-800"
              } transition`}
            disabled={!isFormValid || loading}
            type="submit"
          >
            {loading ? "Ingresando..." : "Continuar"}
          </button>

          <div className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => router.push(`/auth/register?redirect=${encodeURIComponent(redirectTo)}`)}
              className="text-black font-medium hover:underline cursor-pointer"
            >
              Regístrate
            </button>
          </div>

        </form>
      </div>

      {/* IMÁGENES */}
      <ImageAccordion />

    </div>
  );
}
