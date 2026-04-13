"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store";
import { useCategories } from "@/hooks";
import { Logo } from "@/components/ui/logo/Logo";
import { Category } from "@/interfaces";

export default function RegisterStepper() {
  const router = useRouter();
  const { register } = useAuthStore();
  const { data: categories } = useCategories();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    birthdate: "",
    gender: "",
    categories: [] as string[],
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const exists = prev.categories.includes(interest);

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((i) => i !== interest)
          : [...prev.categories, interest],
      };
    });
  };

  const canContinueStep0 = form.email && form.password;

  const canContinueStep1 =
    form.name && form.birthdate;

  const canContinueStep2 = form.gender !== "";

  const canContinueStep3 = form.categories.length >= 3;

  const handleRegister = async () => {
    try {
      setLoading(true);

      await register({
        name: form.name,
        lastName: '', // form.lastName, --- IGNORE ---
        email: form.email,
        phone: form.phone,
        password: form.password,
        birthdate: form.birthdate,
        gender: form.gender,
        categories: form.categories,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HEADER */}
      <Logo className="top-12 md:top-4 left-0 md:left-4 justify-center md:justify-start" />

      {/* CONTENIDO */}
      <div className="flex items-center justify-center px-4 py-30">
        <div className="w-full max-w-sm space-y-6">

          <div className="h-1 bg-gray-200 mb-6">
            <motion.div
              className="h-1 bg-black"
              animate={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >

              {step === 0 && (
                <div className="w-full max-w-sm space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-semibold text-center">
                      Crea tu cuenta
                    </h2>

                    <p className="text-sm text-gray-500 text-center">
                      Ingresa tu correo electrónico y crea una contraseña para comenzar a descubrir eventos personalizados según tus intereses.
                    </p>
                  </div>

                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button
                    onClick={next}
                    disabled={!canContinueStep0}
                    className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="w-full max-w-sm space-y-6">
                  <h2 className="text-xl font-semibold text-center">
                    Cuéntanos sobre ti
                  </h2>

                  <input
                    placeholder="Nombres Completos"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Telefono (opcional)"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={form.birthdate}
                    onChange={(e) =>
                      setForm({ ...form, birthdate: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button onClick={back} className="w-full border py-2 rounded-full cursor-pointer">
                      Atrás
                    </button>
                    <button
                      onClick={next}
                      disabled={!canContinueStep1}
                      className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="w-full max-w-sm space-y-6">
                  <h2 className="text-xl font-semibold text-center">
                    ¿Cuál es tu género?
                  </h2>

                  <div className="space-y-3">
                    {["Mujer", "Hombre", "No binario", "Prefiero no decirlo"].map((g) => (
                      <label
                        key={g}
                        className={`flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer ${form.gender === g ? "border-black" : "border-gray-300"
                          }`}
                      >
                        <span>{g}</span>
                        <input
                          type="radio"
                          name="gender"
                          checked={form.gender === g}
                          onChange={() => setForm({ ...form, gender: g })}
                        />
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={back} className="w-full border py-2 rounded-full cursor-pointer">
                      Atrás
                    </button>
                    <button
                      onClick={next}
                      disabled={!canContinueStep2}
                      className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="w-full max-w-sm space-y-6">
                  <h2 className="text-xl font-semibold text-center">
                    Elige tus intereses
                  </h2>
                  <p className="text-sm text-gray-500 text-center">
                    Selecciona al menos 3
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat: Category) => {
                      const active = form.categories.includes(cat.id);

                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleInterest(cat.id)}
                          className={`p-3 rounded-lg border text-sm cursor-pointer ${active
                            ? "bg-black text-white border-black"
                            : "border-gray-300"
                            }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={back} className="w-full border py-2 rounded-full cursor-pointer">
                      Atrás
                    </button>
                    <button
                      onClick={handleRegister}
                      disabled={!canContinueStep3 || loading}
                      className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Registrando..." : "Finalizar"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-black font-medium hover:underline cursor-pointer"
            >
              Inicia sesión
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}