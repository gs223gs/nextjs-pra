import { PostCardProps } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { togglePublish } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostCard({ post, href }: PostCardProps) {
  return (
    <Card>
      <Link href={href + post.id}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
          {post.topImage && (
            <Image
              src={post.topImage}
              alt={post.title}
              width={100}
              height={100}
            />
          )}
        </CardContent>
        <CardFooter>
          <p>{post.author.name}</p>
          <p>
            現在の公開状況{post.published ? <p>公開中</p> : <p>非公開です</p>}
          </p>
          <Button
            onClick={() => {
              togglePublish(post.id, post.published);
            }}
          ></Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
