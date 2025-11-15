import { uploadEventImage } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadEventImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadEventImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast("Imagen subida correctamente");
    },
    onError: () => toast.error("Error subiendo imagen"),
  });
};
