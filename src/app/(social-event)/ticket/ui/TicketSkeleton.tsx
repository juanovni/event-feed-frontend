import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TicketSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header Skeleton */}
      <div className="relative h-64 w-full overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            disabled
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-12 pb-8 space-y-4">
        {/* QR Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-40 h-40 rounded-xl" />
        </div>

        {/* Details Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>

        {/* Instructions Skeleton */}
        <div className="space-y-2 pt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  )
}
