import { useState, useCallback } from "react";

const LOCATION_COUNTRY_CODE = (process.env.NEXT_PUBLIC_LOCATION_COUNTRY_CODE ?? "ec").toLowerCase();

export interface LocationSuggestion {
  id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export function useLocationSearch() {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = useCallback(async (query: string): Promise<void> => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=${encodeURIComponent(LOCATION_COUNTRY_CODE)}`,
        {
          headers: {
            "Accept-Language": "es",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar ubicaciones");
      }

      const data = await response.json();
      setSuggestions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    error,
    searchLocations,
    clearSuggestions,
  };
}
