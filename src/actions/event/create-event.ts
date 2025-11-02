import { eventApi } from "@/api/event.api";

/* export interface CreateEventPayload {
  title: string;
  description: string;
  location?: string;
  eventDate: string;
  mediaType?: string;
  mediaUrl?: string;
  cost?: string;
  currency?: string;
  attendees?: string;
  userStatus?: string;
  categoryId?: string;
} */

export const createEvent = async (formData: FormData) => {
  try {
    const { data } = await eventApi.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  } catch (error) {
    console.log(error)

    throw new Error("No se pudo crear el evento");
  }

};
