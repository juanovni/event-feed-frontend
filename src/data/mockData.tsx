import { Post, User, Event } from "@/interfaces";

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    username: 'maria_photo',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Fotografía', 'Viajes', 'Arte'],
    role: 'user'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    username: 'carlos_dev',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Tecnología', 'Gaming', 'Música'],
    role: 'publisher'
  },
  {
    id: '3',
    name: 'Ana Silva',
    username: 'ana_travel',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Viajes', 'Gastronomía', 'Fotografía'],
    role: 'promoter'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    user: mockUsers[0],
    title: 'Workshop de Fotografía Nocturna',
    description: 'Aprende técnicas avanzadas para capturar la ciudad de noche. Incluye equipo profesional y guía experto.',
    location: 'Plaza Mayor, Centro Histórico',
    eventDate: new Date('2025-01-08T06:45:00'),
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
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

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    title: 'Exposición de Arte Contemporáneo',
    content: '¡Capturé esta increíble puesta de sol en la montaña! 🌅 La luz dorada creaba sombras perfectas.',
    //mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 234,
    isLiked: false,
    cost: 100.00,
    currency: 'USA',
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T06:45:00'),
    timestamp: new Date('2025-01-08T18:30:00'),
    //category: "restaurant",
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
    title: 'Maratón Benéfico 10K',
    content: 'Trabajando en mi nuevo proyecto de desarrollo. ¡La programación nunca duerme! 💻',
    //mediaType: 'video',
    mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 189,
    isLiked: true,
    cost: 0,
    currency: 'USA',
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T10:45:00'),
    timestamp: new Date('2025-01-08T16:45:00'),
    //category: "art",
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
    title: 'Maratón Benéfico 10K',
    content: 'Descubriendo sabores únicos en este mercado local. La gastronomía es arte puro 🍜',
    //mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 156,
    isLiked: false,
    cost: 25.78,
    currency: 'USA',
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T16:45:00'),
    timestamp: new Date('2025-01-08T14:20:00'),
    //category: "cinema",
    comments: [],
    gallery: [
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];
