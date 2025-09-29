import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

import DashBoardPost from "@/components/post/DashBoardPost";

export default async function pages({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  return <DashBoardPost post={post} />;
}
