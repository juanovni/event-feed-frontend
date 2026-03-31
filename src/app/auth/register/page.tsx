"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

const interestsList = [
  {
    id: "4a237260-82fd-4380-84dd-7c390bcc21af",
    name: "Moda",
  },
  {
    id: "1a46546a-9843-4b72-aeec-9cf73b1cb099",
    name: "Restaurantes",
  },
  {
    id: "b75ee276-affa-4f65-822e-11daba944ae6",
    name: "Tecnología",
  },
];

export default function RegisterStepper() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    birthdate: "",
    gender: "",
    interests: [] as string[],
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);

      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const canContinueStep1 =
    form.name && form.lastName && form.birthdate;

  const canContinueStep2 = form.gender !== "";

  const canContinueStep3 = form.interests.length >= 3;

  const handleRegister = async () => {
    try {
      setLoading(true);

      await register({
        name: form.name,
        lastName: form.lastName,
        /*         email: form.email,
                password: form.password, */
        email: `${form.name.toLowerCase()}.${form.lastName.toLowerCase()}@example.com`, // Temporal
        password: "Juan2229@", // Temporal
        birthdate: form.birthdate,
        gender: form.gender,
        categories: form.interests,
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
      <div className="p-6 text-xl font-semibold">Eventos</div>

      {/* CONTENIDO */}
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="w-full max-w-sm space-y-6">
              <h2 className="text-xl font-semibold text-center">
                Cuéntanos sobre ti
              </h2>

              <input
                placeholder="Nombres"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Apellidos"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
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

              <button
                onClick={next}
                disabled={!canContinueStep1}
                className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
              >
                Continuar
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
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
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-center">
                Elige tus intereses
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Selecciona al menos 3
              </p>

              <div className="grid grid-cols-2 gap-2">
                {interestsList.map(({id, name}) => {
                  const active = form.interests.includes(id);

                  return (
                    <button
                      key={id}
                      onClick={() => toggleInterest(id)}
                      className={`p-3 rounded-lg border text-sm cursor-pointer ${active
                        ? "bg-black text-white border-black"
                        : "border-gray-300"
                        }`}
                    >
                      {name}
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
            </>
          )}

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