"use client";
import { Button } from "@/components/ui/button";
import { togglePublish } from "@/lib/posts";
import { ReactNode } from "react";

type Props = {
  postId: string;
  publish: boolean;
  children?: ReactNode;
};
export default function PublishToggleButton({
  postId,
  publish,
  children,
}: Props) {
  return (
    <Button
      onClick={() => {
        togglePublish(postId, publish);
      }}
    >
      {children}
    </Button>
  );
}
