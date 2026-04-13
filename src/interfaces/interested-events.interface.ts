export interface InterestedEventItem {
  eventId: string;
  imageUrl: string;
  interestedAt: string;
}

export interface InterestedEventsResponse {
  items: InterestedEventItem[];
  pagination: {
    skip: number;
    take: number;
    hasMore: boolean;
  };
}
