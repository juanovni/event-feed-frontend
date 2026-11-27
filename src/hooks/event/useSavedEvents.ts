import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventApi } from "@/api/event.api";
import { useAuthStore } from "@/store";
import { toast } from "sonner";

export type SavedEvent = { eventId: string; eventSlug: string; eventTitle: string; eventDate: string; imageUrl: string; savedAt: string };
export function useSavedEvents(enabled = true) {
  const userId = useAuthStore(state => state.user?.id);
  const queryClient = useQueryClient();
  const key = ["saved-events", userId];
  const query = useQuery({ queryKey: key, queryFn: async () => (await eventApi.get<{ items: SavedEvent[] }>("/events/me/saved")).data.items, enabled: enabled && !!userId });
  const mutation = useMutation({ mutationFn: async ({ eventId, saved }: { eventId: string; saved: boolean }) => { const path = `/events/${encodeURIComponent(eventId)}/saved`; if (saved) await eventApi.put(path); else await eventApi.delete(path); }, onSuccess: () => queryClient.invalidateQueries({ queryKey: key }), onError: () => toast.error("No se pudo actualizar el evento guardado. Inténtalo de nuevo.") });
  return { ...query, setSaved: mutation.mutate, isUpdating: mutation.isPending };
}
