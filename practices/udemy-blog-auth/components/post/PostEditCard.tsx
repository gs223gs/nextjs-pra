import { useActionState, useState } from "react";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { updatePost } from "@/lib/posts";
type EditingProps = {
  post: Post;
  onClick: () => void;
};
export default function PostEditCard({ post, onClick }: EditingProps) {
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });
  const [editingPost, setEditingPost] = useState<Post>(post);
  return (
    <form action={formAction}>
      <Input type="hiddun" value={post.id} name="id"></Input>
      title:
      <Input
        type="text"
        name="title"
        value={editingPost.title}
        onChange={(e) => {
          setEditingPost({ ...editingPost, title: e.target.value });
        }}
      />
      content:
      <Input
        type="text"
        name="content"
        value={editingPost.content}
        onChange={(e) => {
          setEditingPost({ ...editingPost, content: e.target.value });
        }}
      />
      <Input
        type="radio"
        name="published"
        value="true"
        onChange={() => {
          setEditingPost({
            ...editingPost,
            published: true,
          });
        }}
      />
      true
      <Input
        type="radio"
        name="published"
        value="false"
        onChange={() => {
          setEditingPost({
            ...editingPost,
            published: false,
          });
        }}
      />
      false
      <Button type="submit">送信</Button>
      {state.success ? <p>true</p> : <p>false</p>}
      {state.errors ? <p>{state.errors.auth}</p> : <p>error なし</p>}
      <Button onClick={onClick}>キャンセル</Button>
      <Button>削除</Button>
    </form>
  );
}
