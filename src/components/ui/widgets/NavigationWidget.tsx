import { Navigation } from "lucide-react";

interface Props {
  distanceKm: number;
}

export const NavigationWidget = ({ distanceKm }: Props) => {
  return (
    <>
      {distanceKm !== null && distanceKm <= 5 && (
        <div className="mt-3 p-3 rounded-xl bg-purple-200 border border-purple-200 flex items-center gap-3 animate-pulse-slow">
          <Navigation className="text-black h-5 w-5" />
          <div>
            <p className="text-sm font-medium text-black">
              ¡Este evento está muy cerca de ti!
            </p>
            <p className="text-xs text-black">
              A solo {distanceKm.toFixed(1)} km de tu ubicación actual.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
