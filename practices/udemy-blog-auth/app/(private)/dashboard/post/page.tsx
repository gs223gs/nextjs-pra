"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createPost } from "@/lib/posts";

export default function Page() {
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  return (
    <form action={formAction}>
      title:
      <Input type="text" name="title" />
      content:
      <Input type="text" name="content" />
      <Input type="radio" name="published" value="true" />
      true
      <Input type="radio" name="published" value="false" />
      false
      <Button type="submit">送信</Button>
      {state.success ? <p>true</p> : <p>false</p>}
      {state.errors ? <p>{state.errors.auth}</p> : <p>error なし</p>}
    </form>
  );
}
