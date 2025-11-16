import { uploadEventImage } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadEventImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, formData }: { eventId: string; formData: FormData }) =>
      uploadEventImage(eventId, formData),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      queryClient.invalidateQueries({
        queryKey: ["event-images", { eventId: variables.eventId }],
      });

      toast("Imagen subida correctamente");
    },

    onError: () => toast.error("Error subiendo imagen"),
  });
};
