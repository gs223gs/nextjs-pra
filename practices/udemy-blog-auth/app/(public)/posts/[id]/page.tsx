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

export default async function pages({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
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
    </Card>
  );
}
