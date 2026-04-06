"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
        {text.length > 120 && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      {text.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary text-sm font-medium mt-1 hover:underline cursor-pointer"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
}