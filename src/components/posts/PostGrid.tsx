import { Event, Post } from "@/interfaces";
import PostGridItem from "./PostGridItem";

interface Props {
  posts: Post[];
}

export const PostGrid = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10">
      {posts.map(post => (
        <PostGridItem key={post.id} post={post} />
      ))}
    </div>
  )
}
