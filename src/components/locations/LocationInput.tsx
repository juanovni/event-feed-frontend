"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useLocationSearch, LocationSuggestion } from "@/hooks/location/use-location-search";
import { Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: { name: string; lat: string; lon: string }) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LocationInput({ value, onChange, onLocationSelect, placeholder, disabled }: LocationInputProps) {
  const { suggestions, loading, searchLocations, clearSuggestions } = useLocationSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce para búsqueda
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (inputValue.length >= 2) {
        searchLocations(inputValue);
        setIsOpen(true);
      } else {
        clearSuggestions();
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimerRef.current);
  }, [inputValue, searchLocations, clearSuggestions]);

  // Sincronizar inputValue con value prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelect = (suggestion: LocationSuggestion) => {
    const locationName = suggestion.display_name;
    setInputValue(locationName);
    onChange(locationName);
    onLocationSelect?.({
      name: locationName,
      lat: suggestion.lat,
      lon: suggestion.lon,
    });
    setIsOpen(false);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onChange(text);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => inputValue.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          className="pr-10"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Dropdown de sugerencias */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className={cn(
                "w-full text-left px-3 py-2 hover:bg-gray-100 flex items-start gap-2 border-b last:border-b-0 transition-colors",
              )}
              type="button"
            >
              <MapPin className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{suggestion.display_name.split(",")[0]}</p>
                <p className="text-xs text-gray-500 truncate">{suggestion.display_name}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {isOpen && inputValue.length >= 2 && !loading && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 px-3 py-2 text-sm text-gray-500">
          No se encontraron ubicaciones
        </div>
      )}
    </div>
  );
}
