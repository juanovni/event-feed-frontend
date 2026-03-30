"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const interestsList = [
  "Conciertos",
  "Bares",
  "Deportes",
  "Teatro",
  "Comida",
  "Networking",
  "Tecnología",
  "Arte",
];

export default function RegisterStepper() {
  const router = useRouter();
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
                {interestsList.map((interest) => {
                  const active = form.interests.includes(interest);

                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-lg border text-sm cursor-pointer ${active
                        ? "bg-black text-white border-black"
                        : "border-gray-300"
                        }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button onClick={back} className="w-full border py-2 rounded-full cursor-pointer">
                  Atrás
                </button>
                <button
                  disabled={!canContinueStep3}
                  className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                >
                  Finalizar
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