import { Camera, Edit2, MapPin, Link, Calendar, Heart, MessageSquare, Users } from "lucide-react";

export default function ProfilePage() {

  const currentUser = {
    id: 'current',
    name: 'Juan Jose Constantine',
    username: 'juanconstantine',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Creativo digital apasionado por la fotografía, el diseño y las experiencias únicas. Siempre buscando la próxima aventura.',
    location: 'Madrid, España',
    website: 'tuportfolio.com',
    joinDate: new Date('2023-03-15'),
    followers: 1234,
    following: 567,
    posts: 89,
    interests: ['Fotografía', 'Viajes', 'Tecnología', 'Arte', 'Gastronomía']
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Photo */}
        {/* <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative">
          <button className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-all duration-200">
            <Camera className="w-5 h-5" />
          </button>
        </div> */}

        {/* Profile Info */}
        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            {/* Avatar */}
            <div className="relative -mt-20 mb-4 sm:mb-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
                  <p className="text-gray-600">@{currentUser.username}</p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <Edit2 className="w-4 h-4" />
                  <span>Editar perfil</span>
                </button>
              </div>

              <p className="text-gray-800 mb-4 leading-relaxed">{currentUser.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link className="w-4 h-4" />
                  <a href={`https://${currentUser.website}`} className="text-blue-600 hover:underline">
                    {currentUser.website}
                  </a>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Se unió en {formatJoinDate(currentUser.joinDate)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{currentUser.posts}</div>
                  <div className="text-sm text-gray-600">Publicaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{currentUser.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{currentUser.following}</div>
                  <div className="text-sm text-gray-600">Siguiendo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Intereses</h2>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            >
              {interest}
            </span>
          ))}
          <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm font-medium hover:border-gray-400 hover:text-gray-600 transition-colors duration-200">
            + Agregar interés
          </button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2.8K</div>
              <div className="text-sm text-gray-600">Likes recibidos</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">+12% este mes</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">456</div>
              <div className="text-sm text-gray-600">Comentarios</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">+8% este mes</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Eventos creados</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">5 este mes</div>
        </div>
      </div>
    </div>
  );
}