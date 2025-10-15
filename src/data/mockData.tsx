import { Post, User } from "@/interfaces";

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    username: 'maria_photo',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Fotografía', 'Viajes', 'Arte']
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    username: 'carlos_dev',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Tecnología', 'Gaming', 'Música']
  },
  {
    id: '3',
    name: 'Ana Silva',
    username: 'ana_travel',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    interests: ['Viajes', 'Gastronomía', 'Fotografía']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    title: 'Exposición de Arte Contemporáneo',
    content: '¡Capturé esta increíble puesta de sol en la montaña! 🌅 La luz dorada creaba sombras perfectas.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 234,
    isLiked: false,
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T16:45:00'),
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
    mediaType: 'video',
    mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    likes: 189,
    isLiked: true,
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T16:45:00'),
    timestamp: new Date('2025-01-08T16:45:00'),
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
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 156,
    isLiked: false,
    location: 'Avenida Reforma, Ciudad de México',
    eventDate: new Date('2025-01-08T16:45:00'),
    timestamp: new Date('2025-01-08T14:20:00'),
    comments: [],
    gallery: [
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];
