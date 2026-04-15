"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { eventApi } from "@/api/event.api";

export const VerificationModal = ({
  email,
  onSuccess,
  onClose,
}: {
  email: string;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    setError(false);
    if (value && index < 3) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setDigits(pasted.split(""));
      inputs.current[3]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length < 4) return;
    setLoading(true);
    try {
      // Llama a tu endpoint de verificación
      const response = await eventApi.post(`/verification/verify`, { email, code });
      if (response.status === 200) {
        onSuccess();
      } else {
        throw new Error("Código incorrecto");
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error?.response?.data?.message || "Error al verificar el código");
      setDigits(["", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResent(false);
    // await resendCode({ email });
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const isFull = digits.every((d) => d !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-xl"
      >
        {/* Ícono */}
        <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </div>

        <h2 className="text-lg font-semibold mb-1">Verifica tu correo</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enviamos un código de 4 dígitos a{" "}
          <span className="text-black font-medium">{email}</span>
        </p>

        {/* Inputs */}
        <div className="flex gap-3 justify-center mb-2" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-14 h-14 text-center text-2xl font-semibold rounded-lg border focus:outline-none focus:ring-2 transition-all
                ${error
                  ? "border-red-400 bg-red-50 focus:ring-red-300"
                  : d
                    ? "border-black focus:ring-black/20"
                    : "border-gray-300 focus:ring-black/20"
                }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4">
            {errorMessage}
          </p>
        )}

        {!error && <div className="mb-4" />}

        <button
          type="button"
          onClick={handleVerify}
          disabled={!isFull || loading}
          className="w-full bg-black text-white py-2.5 rounded-full text-sm disabled:opacity-40 cursor-pointer mb-3 transition-opacity"
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>

        <p className="text-sm text-gray-500">
          ¿No recibiste el código?{" "}
          <button
            onClick={handleResend}
            className="text-black font-medium hover:underline cursor-pointer"
          >
            {resent ? "¡Enviado!" : "Reenviar"}
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          Cancelar
        </button>
      </motion.div>
    </div>
  );
}