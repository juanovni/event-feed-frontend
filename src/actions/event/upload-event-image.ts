import { eventApi } from "@/api/event.api";

export const uploadEventImage = async (eventId: string, formData: FormData) => {
  try {
    const { data } = await eventApi.post(`/events/${eventId}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  } catch (error) {
    console.log(error)

    throw new Error("No se pudo crear el evento");
  }

};
