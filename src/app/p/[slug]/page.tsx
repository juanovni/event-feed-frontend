import { getEventBySlug } from "@/actions";
import { EventPageContent } from "./EventPageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const event = await getEventBySlug(slug);
    return {
      title: `${event.title} - Event Feed`,
      description: event.description || `Únete al evento ${event.title} organizado por ${event.user.name}. ${event.category} en ${event.location || 'ubicación por confirmar'}.`,
      keywords: [event.category, 'evento', 'social', event.user.name],
      openGraph: {
        title: event.title,
        description: event.description || `Evento ${event.category} organizado por ${event.user.name}.`,
        images: event.mediaUrl ? [{ url: event.mediaUrl, alt: event.title }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.title,
        description: event.description || `Únete al evento ${event.title}.`,
        images: event.mediaUrl ? [event.mediaUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Evento no encontrado - Event Feed',
      description: 'El evento que buscas no existe o ha sido eliminado.',
    };
  }
}

export default function EventPageBySlug({ params }: Props) {
  return <EventPageContent params={params} />;
}
