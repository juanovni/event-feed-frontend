import { getUserSuggestions } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useUserSuggestions = () => {
  return useQuery({
    queryKey: ["user-suggestions"],
    queryFn: getUserSuggestions,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  });
};
