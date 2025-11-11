import { eventApi } from "@/api/event.api";

export const getUserSuggestions = async () => {
  try {
    const { data } = await eventApi.get(`/users/suggestions`);

    return data;

  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar el ticket");
  }

};