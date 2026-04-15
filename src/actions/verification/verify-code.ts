'use server';

import { eventApi } from "@/api/event.api";

export const verifyCode = async (email: string, code: string) => {
  try {
    const { data } = await eventApi.post(`/verification/verify`, { email, code });
    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo verificar el código");
  }

};