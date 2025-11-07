import { Post, User, Event, Notification, Ticket } from "@/interfaces";

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    username: 'maria_photo',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Fotografía', 'Viajes', 'Arte'],
    isFollowing: false,
    role: 'user'
  },
  {
    id: '2',
    name: 'NICANOR • CASA DE BEBIDAS •',
    username: 'nicanorec',
    avatar: 'https://pbs.twimg.com/profile_images/1443429332496621572/OJ5JizFo_400x400.jpg',
    interests: ['Restaurante', 'Música'],
    isFollowing: true,
    role: 'publisher'
  },
  {
    id: '3',
    name: 'Ana Silva',
    username: 'ana_travel',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Viajes', 'Gastronomía', 'Fotografía'],
    isFollowing: false,
    role: 'promoter'
  }
];

export const mockEvents: Event[] = [
  {
    id: "5d2e1e48-ed0d-4659-a860-c853c211720b",
    user: mockUsers[1],
    title: "Hallowen",
    description: "Hallowen Rock\r\n\r\nEvent y mas cosas",
    mediaType: "image",
    mediaUrl: "https://res.cloudinary.com/dlxl5vbdk/image/upload/v1762461496/events/rllo6mei4z15clxmmo9b.jpg",
    cost: 5,
    currency: "USA",
    gallery: [],
    location: "Urdesa Central, Guayaquil Ecuador",
    eventDate: new Date('2025-01-08T16:45:00'),
    attendees: 0,
    userStatus: "none",
    isFollowing: false,
    isInterested: false,
    interested: 0,
    hasPaid: true,
    comments: [],
    timestamp: new Date('2025-01-08T16:45:00'),
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "4f822034-15d7-469a-83bb-7565b542e47e",
    subTotal: 5,
    tax: 0.75,
    total: 5.75,
    itemsInOrder: 1,
    isPaid: false,
    ticketNumber: "CCKCKC",
    paidAt: new Date('2025-01-08T16:45:00'),
    event: mockEvents[0]
  }
];


export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: '¡Capturé esta increíble puesta de sol en la montaña! 🌅 La luz dorada creaba sombras perfectas.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 234,
    isLiked: false,
    timestamp: new Date('2025-01-08T18:30:00'),
    comments: [
      {
        id: '1',
        user: mockUsers[1],
        content: '¡Wow, qué imagen más espectacular! ¿Qué cámara usaste?',
        timestamp: new Date('2025-01-08T19:00:00'),
        likes: 12
      },
      {
        id: '2',
        user: mockUsers[2],
        content: 'Me encanta la composición, muy profesional 📸',
        timestamp: new Date('2025-01-08T19:15:00'),
        likes: 8
      }
    ]
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Trabajando en mi nuevo proyecto de desarrollo. ¡La programación nunca duerme! 💻',
    mediaType: 'video',
    mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 189,
    isLiked: true,
    timestamp: new Date('2025-01-08T16:45:00'),
    comments: [
      {
        id: '3',
        user: mockUsers[0],
        content: '¿En qué tecnologías estás trabajando?',
        timestamp: new Date('2025-01-08T17:00:00'),
        likes: 5
      }
    ]
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Descubriendo sabores únicos en este mercado local. La gastronomía es arte puro 🍜',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 156,
    isLiked: false,
    timestamp: new Date('2025-01-08T14:20:00'),
    comments: []
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event_reminder',
    title: 'Recordatorio de Evento',
    message: 'El Workshop de Fotografía Nocturna comienza en 24 horas',
    timestamp: new Date('2025-01-08T19:00:00'),
    read: false,
    eventId: '1'
  },
  {
    id: '2',
    type: 'comment',
    title: 'Nuevo comentario',
    message: 'Carlos comentó en tu publicación',
    timestamp: new Date('2025-01-08T18:45:00'),
    read: false
  },
  {
    id: '3',
    type: 'like',
    title: 'Le gustó tu publicación',
    message: 'A Ana le gustó tu foto de la puesta de sol',
    timestamp: new Date('2025-01-08T18:30:00'),
    read: true
  }
];