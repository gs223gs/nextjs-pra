"use client";
import { Post } from "@/types/post";
import { useState } from "react";
import PostEditCard from "./PostEditCard";
import PostCard from "./PostCard";
import { Button } from "../ui/button";

export default function DashBoardPost({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log(isEditing);
  return (
    <>
      {isEditing ? (
        <PostEditCard
          post={post}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        ></PostEditCard>
      ) : (
        <div>
          <PostCard post={post} href="" />
          <Button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            編集
          </Button>
        </div>
      )}
    </>
  );
}
