import { eventApi } from "@/api/event.api";

export const getCategories = async () => {
  try {
    const { data } = await eventApi.get("/categories");
    return data;
  } catch (error) {
    console.log(error)

    throw new Error("No se pudo consultar las categorias");
  }

};