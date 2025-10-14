
import { mockPosts } from "@/data/mockData";
import { FeedGrid, Title } from "@/components";

export default function FeedsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        
        <Title className="text-gray-900" title="Tu Fed" />

        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
            Para ti
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 font-medium">
            Siguiendo
          </button>
        </div>
      </div>

      <FeedGrid posts={mockPosts} />

    </div>
  )
}
