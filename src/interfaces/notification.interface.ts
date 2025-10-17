export interface Notification {
  id: string;
  type: 'event_reminder' | 'event_update' | 'comment' | 'like';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  eventId?: string;
}