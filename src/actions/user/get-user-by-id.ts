import { eventApi } from "@/api/event.api";
import { User } from "@/interfaces";

export const getUserById = async (userId: string) => {
  const { data } = await eventApi.get(`/users/${userId}`);
  return data as User;
};
