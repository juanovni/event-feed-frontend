import { ProfileByIdPageContent } from "./ProfileByIdPageContent";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProfileByIdPage({ params }: Props) {
  return <ProfileByIdPageContent params={params} />;
}
