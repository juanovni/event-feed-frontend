import EditProfileForm from "@/components/profile/EditProfileForm";
import { Title } from "@/components/ui/title/Title";

export default function EditProfilePage() {

  return (
    <div className="space-y-6">
      <Title title="Editar perfil">{""}</Title>

      <EditProfileForm />
    </div>
  );
}