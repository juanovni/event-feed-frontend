import { User } from "./user.interface"

export interface PendingPhoto {
  id: string
  eventId: string
  uploadedBy: string
  uploader: User
  photoUrl: string
  approved: boolean
  createdAt: string
}