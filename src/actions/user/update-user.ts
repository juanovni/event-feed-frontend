import { eventApi } from "@/api/event.api";

export const updateUser = async (payload: any) => {
  try {
    const { data } = await eventApi.put("/users/me", payload);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo actualizar el usuario");
  }
};