import { getPosts, searchPosts } from "@/lib/posts";
import { Post } from "@/types/post";
import PostCard from "@/components/post/PostCard";

export default async function pages({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const posts = query ? await searchPosts(query) : await getPosts();
  return (
    <div>
      <h1>Posts</h1>
      <ul className="space-y-4 p-4">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} href="/posts/" />
        ))}
      </ul>
    </div>
  );
}
