import DashBoardPostCard from "@/components/post/DashBoardPostCard";
import { getOwnPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Dashboard() {
  const posts = await getOwnPosts();
  return (
    <div>
      page
      <Link href={"/dashboard/post"}>post</Link>
      {posts.map((post) => {
        return (
          <DashBoardPostCard
            key={post.id}
            post={post}
            href="/dashboard/post/"
          ></DashBoardPostCard>
        );
      })}
    </div>
  );
}
