import { eventApi } from "@/api/event.api";

export const updateUser = async (payload: any) => {
  try {
    const formData = new FormData();

    // campos normales
    Object.entries(payload).forEach(([key, value]) => {
      if (key === "categories") {
        (value as number[]).forEach((id: number) => {
          formData.append("categories[]", id.toString());
        });
      } else if (key !== "avatarFile") {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      }
    });

    // archivo
    if (payload.avatarFile) {
      formData.append("avatar", payload.avatarFile);
    }

    const { data } = await eventApi.put("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo actualizar el usuario");
  }
};