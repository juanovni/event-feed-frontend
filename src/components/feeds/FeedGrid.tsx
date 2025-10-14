import { Post } from "@/interfaces";
import { FeedGridItem } from "./FeedGridItem";

interface Props {
  posts: Post[];
}

export const FeedGrid = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10">
      {posts.map(post => (
        <FeedGridItem post={post} />
      ))}
    </div>
  )
}
