"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store";
import { useCategories } from "@/hooks";
import { Logo } from "@/components/ui/logo/Logo";
import { Category } from "@/interfaces";
import { VerificationModal } from "@/components";
import { buildPhoneNumber, DEFAULT_PHONE_COUNTRY_CODE, getSafeRedirectPath, PHONE_COUNTRY_CODES } from "@/utils";

export default function RegisterStepper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, preRegister } = useAuthStore();
  const { data: categories } = useCategories();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [step, setStep] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState(DEFAULT_PHONE_COUNTRY_CODE);
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
  const [isLoading, setIsLoading] = useState(false);

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

  const passwordLength = [...form.password].length;
  const passwordBytes = new TextEncoder().encode(form.password).length;
  const passwordRules = [
    { label: `Al menos 15 caracteres (${Math.min(passwordLength, 15)}/15)`, valid: passwordLength >= 15 },
    { label: "Al menos 1 número", valid: /[0-9]/.test(form.password) },
    { label: "Al menos 1 letra minúscula", valid: /\p{Ll}/u.test(form.password) },
    { label: "Al menos 1 letra mayúscula", valid: /\p{Lu}/u.test(form.password) },
  ];
  const passwordValid = passwordRules.every((rule) => rule.valid) && passwordBytes <= 72;
  const canContinueStep0 = form.email && passwordValid;
  const canContinueStep1 = form.name && form.birthdate;
  const canContinueStep2 = form.gender !== "";
  const canContinueStep3 = form.categories.length >= 3;

  const handleStep0Continue = async () => {
    // Aquí llamas a tu endpoint para enviar el código
    try {
      setIsLoading(true);
      await preRegister(
        {
          email: form.email,
          password: form.password
        }
      );
      setShowVerification(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setShowVerification(false);
    next(); // avanza al step 1
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      await register({
        name: form.name,
        lastName: '',
        email: form.email,
        phone: buildPhoneNumber(phoneCountryCode, form.phone),
        password: form.password,
        birthdate: form.birthdate,
        gender: form.gender,
        categories: form.categories,
      });

      router.push(redirectTo);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HEADER */}
      <Logo className="top-12 md:top-4 left-0 md:left-4 justify-center md:justify-start" />

      {/* Modal de verificación */}
      <AnimatePresence>
        {showVerification && (
          <VerificationModal
            email={form.email}
            onSuccess={handleVerificationSuccess}
            onClose={() => setShowVerification(false)}
          />
        )}
      </AnimatePresence>

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

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Correo electrónico
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        autoComplete="new-password"
                        className="w-full border rounded-md px-3 py-2 pr-11 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                      </button>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600" aria-live="polite">
                      <p className="font-medium text-gray-700">Requisitos de la contraseña:</p>
                      {passwordRules.map((rule) => (
                        <p key={rule.label} className={`flex items-center gap-2 ${rule.valid ? "text-green-700" : "text-gray-600"}`}>
                          {rule.valid ? <CheckCircle2 size={16} aria-hidden="true" /> : <Circle size={16} aria-hidden="true" />}
                          <span>{rule.label} <span className="sr-only">{rule.valid ? "cumplido" : "pendiente"}</span></span>
                        </p>
                      ))}
                      <p>Puedes usar una frase con espacios, números o símbolos.</p>
                      {passwordBytes > 72 && <p role="alert" className="text-red-600">La contraseña es demasiado larga. Prueba una más corta.</p>}
                    </div>
                  </div>
                  <button
                    onClick={handleStep0Continue}
                    disabled={!canContinueStep0 || isLoading}
                    className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? "Enviando código..." : "Continuar"}
                  </button>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="w-full max-w-sm space-y-6">
                  <h2 className="text-xl font-semibold text-center">
                    Cuéntanos sobre ti
                  </h2>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Nombres completos
                    </label>
                    <div className="flex gap-2">
                      <input
                        placeholder="Nombres Completos"
                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Celular (opcional)
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                        className="w-36 border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        {PHONE_COUNTRY_CODES.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label} {country.code}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="987654321"
                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Fecha de nacimiento
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={form.birthdate}
                        onChange={(e) =>
                          setForm({ ...form, birthdate: e.target.value })
                        }
                      />
                    </div>
                  </div>

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
                      disabled={!canContinueStep3 || isLoading}
                      className="w-full bg-black text-white py-2 rounded-full disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? "Registrando..." : "Finalizar"}
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
              onClick={() => router.push(`/auth/login?redirect=${encodeURIComponent(redirectTo)}`)}
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
