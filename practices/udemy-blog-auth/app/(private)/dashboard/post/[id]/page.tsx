import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function pages({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      {post.topImage && (
        <Image src={post.topImage} alt={post.title} width={100} height={100} />
      )}
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <p>{post.author.name}</p>
      </CardFooter>
      <Button>編集</Button>
      <Button>削除</Button>
    </Card>
  );
}
