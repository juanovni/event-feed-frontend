'use server';

import { eventApi } from "@/api/event.api";

export const markNotificationAsRead = async (id: string) => {
  try {
    const { data } = await eventApi.post(`/notifications/user/${id}/read`);
    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar los eventos");
  }

};