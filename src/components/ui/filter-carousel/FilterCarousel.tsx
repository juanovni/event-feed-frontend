"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterCarousel({ options, value, onChange }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const index = options.findIndex((opt) => opt.value === value);

    if (index >= 0) {
      swiperRef.current.slideTo(index, 300); // animación suave
    }
  }, [value, options]);

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode
      spaceBetween={8}
      slidesPerView={"auto"}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="w-full"
    >
      {options.map((option) => (
        <SwiperSlide key={option.value} className="!w-auto px-1 py-1">
          <Button
            onClick={() => onChange(option.value)}
            variant={value === option.value ? "default" : "outline"}
            className={cn(
              "rounded-full text-sm px-4 py-2 px-4 py-2 whitespace-nowrap transition-all",
              value === option.value && "shadow-md scale-105"
            )}
          >
            {option.label}
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}