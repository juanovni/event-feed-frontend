import { eventApi } from "@/api/event.api";

export const getUserNotifications = async (userId: string) => {
  try {
    const { data } = await eventApi.get(`/notifications/user/${userId}`);

    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar los eventos");
  }

};