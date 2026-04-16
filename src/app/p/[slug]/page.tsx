import type { Metadata } from "next";
import { getEventBySlug } from "@/actions";
import { EventPageContent } from "./EventPageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_NAME = "QueBuenPlan!";
const DEFAULT_TITLE = "Evento no encontrado";
const DEFAULT_DESCRIPTION = "El evento que buscas no existe o ya no está disponible en QueBuenPlan!.";

const buildEventDescription = (event: Awaited<ReturnType<typeof getEventBySlug>>) => {
  const pieces = [
    event.description?.trim(),
    event.category ? `Categoría: ${event.category}.` : null,
    event.location ? `Lugar: ${event.location}.` : null,
    `Organiza: ${event.user.name}.`,
  ].filter(Boolean);

  return pieces.join(" ").slice(0, 160);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event = await getEventBySlug(slug);
    const description = buildEventDescription(event);
    const keywords = [
      event.title,
      event.category,
      event.location,
      event.user.name,
      "eventos",
      "planes",
      "QueBuenPlan",
    ].filter(Boolean) as string[];

    return {
      title: event.title,
      description,
      keywords,
      category: event.category,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      openGraph: {
        title: `${event.title} | ${SITE_NAME}`,
        description,
        siteName: SITE_NAME,
        images: event.mediaUrl ? [{ url: event.mediaUrl, alt: event.title }] : [],
        type: "article",
        locale: "es_CO",
      },
      twitter: {
        card: "summary_large_image",
        title: `${event.title} | ${SITE_NAME}`,
        description,
        images: event.mediaUrl ? [event.mediaUrl] : [],
      },
    };
  } catch {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function EventPageBySlug({ params }: Props) {
  return <EventPageContent params={params} />;
}
