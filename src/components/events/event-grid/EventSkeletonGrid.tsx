import { EventSkeletonCard } from "@/components";

export const EventSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventSkeletonCard key={i} />
      ))}
    </div>
  );
};
