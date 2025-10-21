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
    id: '1',
    user: mockUsers[1],
    title: 'Noche de Week y Bebidas',
    description: 'Este año ha sido el año de los recuerdos, para Negroni Week, seguimos la ruta. Los 3 Negronis más queridos de nuestras 3 primeras celebraciones junto una nueva forma de armar tu propio Negroni: AL AZAR 🎲 🎲 ⭕️',
    location: 'Plaza Mayor, Centro Histórico',
    eventDate: new Date('2025-01-08T06:45:00'),
    mediaType: 'image',
    mediaUrl: 'https://scontent.cdninstagram.com/v/t51.82787-15/554396372_18063879602584200_8012309436171417339_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzcyODgwOTQ2OTc0OTg3OTg1MA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=gfaaJ9nWDg0Q7kNvwH0TJEA&_nc_oc=Adl6IV2B7-dS3LqG0EeRMNQzkBScr7CUickiwjZliTRu8kTU5TmBKuyDydJrndA3q70&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=q6u-RHV99Vh4U9yPcb08rg&oh=00_AfcPDjo8MTImrjm7rV_heeMqTDhn56WVDnC6dqsIgopGBQ&oe=68F880AE',
    likes: 234,
    isLiked: false,
    cost: 12.87,
    currency: 'USA',
    timestamp: new Date('2025-01-08T18:30:00'),
    category: "restaurant",
    attendees: 2,
    interested: 10,
    userStatus: "interested",
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
    ],
    gallery: [
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '2',
    user: mockUsers[1],
    title: 'Conferencia Tech Innovation 2025',
    description: 'Las últimas tendencias en tecnología, IA y desarrollo. Speakers internacionales y networking.',
    location: 'Centro de Convenciones Norte',
    eventDate: new Date('2025-01-08T10:45:00'),
    mediaType: 'video',
    mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 189,
    isLiked: true,
    cost: 0,
    currency: 'USA',
    timestamp: new Date('2025-01-08T16:45:00'),
    category: "art",
    attendees: 200,
    interested: 1000,
    userStatus: "attending",
    comments: [
      {
        id: '3',
        user: mockUsers[0],
        content: '¿En qué tecnologías estás trabajando?',
        timestamp: new Date('2025-01-08T17:00:00'),
        likes: 5
      }
    ],
    gallery: [
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '3',
    user: mockUsers[2],
    title: 'Festival Gastronómico Internacional',
    description: 'Degustación de cocina internacional, chefs reconocidos y talleres culinarios.',
    location: 'Parque Central, Zona Gastronómica',
    eventDate: new Date('2025-01-08T16:45:00'),
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 156,
    isLiked: false,
    cost: 100.00,
    currency: 'USA',
    timestamp: new Date('2025-01-08T14:20:00'),
    category: "cinema",
    attendees: 2000,
    interested: 1999,
    userStatus: "none",
    comments: [],
    gallery: [
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "1",
    event: mockEvents[2],
    cost: 1500,
    ticketNumber: "ROCK2025-001234",
    section: "VIP",
    seat: "A-15",
    createdAt: new Date('2025-01-08T14:20:00'),
  },
  {
    id: "2",
    event: mockEvents[2],
    cost: 850,
    ticketNumber: "ELEC2025-005678",
    section: "General",
    createdAt: new Date('2025-01-08T14:20:00'),
  },
  {
    id: "3",
    event: mockEvents[2],
    cost: 1200,
    ticketNumber: "JAZZ2025-009012",
    section: "Preferente",
    seat: "B-22",
    createdAt: new Date('2025-01-08T14:20:00'),
  },
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