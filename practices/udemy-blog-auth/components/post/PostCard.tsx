import { PostCardProps } from "@/types/post";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        <Image
          src={post.topImage || ""}
          alt={post.title}
          width={100}
          height={100}
        />
      </CardContent>
      <CardFooter>
        <p>{post.author.name}</p>
      </CardFooter>
    </Card>
  );
}
