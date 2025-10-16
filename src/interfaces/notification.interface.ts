export interface Notification {
  id: string
  userId: string
  type: "event_reminder" | "new_event" | "event_update" | "photo_approval"
  title: string
  message: string
  eventId?: string
  read: boolean
  createdAt: string
}