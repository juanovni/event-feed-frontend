'use client';

import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface Props {
  isOwner: boolean;
}

export const PublisherBadge = ({ isOwner }: Props) => {
  if (!isOwner) return null;

  return (
    <Badge variant="default" className="gap-1">
      <Crown className="h-3 w-3" />
      <span className="text-xs">Tú organizas</span>
    </Badge>
  );
}
