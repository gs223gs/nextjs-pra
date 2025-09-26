import PostCard from "@/components/post/PostCard";
import { getOwnPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Dashboard() {
  const posts = await getOwnPosts();
  return (
    <div>
      page
      <Link href={"/dashboard/post"}>post</Link>
      {posts.map((post) => {
        return <PostCard key={post.id} post={post}></PostCard>;
      })}
    </div>
  );
}
