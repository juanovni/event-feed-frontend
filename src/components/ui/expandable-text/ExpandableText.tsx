"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Props {
  text: string;
  maxLines?: number;
}

export default function ExpandableText({ text, maxLines = 3 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      if (expanded) {
        setMaxHeight(textRef.current.scrollHeight);
      } else {
        const lineHeight = parseFloat(
          getComputedStyle(textRef.current).lineHeight
        );
        setMaxHeight(lineHeight * maxLines);
      }
    }
  }, [expanded, maxLines]);

  const shouldShow = text.length > 120;

  return (
    <div>
      <div className="relative">
        <p
          ref={textRef}
          style={{ maxHeight }}
          className={cn(
            "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-pre-line text-sm text-gray-700"
          )}
        >
          {text}
        </p>

        {/* Fade */}
        {shouldShow && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      {/* SOLO mostrar cuando está colapsado */}
      {shouldShow && !expanded && (
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setExpanded(true)}
            className="group relative flex items-center justify-center cursor-pointer"
          >
            {/* Tooltip */}
            <span className="absolute -top-7 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Expandir
            </span>

            {/* Icono animado */}
            <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
}