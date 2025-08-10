"use client";

import { formSchema, FormSchema } from "@/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitForm } from "./actions";
export default function Home() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    const result = await submitForm(data);
    console.log(result);
    if (result.success) {
      console.log("フォームが正常に送信されました");
    } else {
      console.log("フォームの送信に失敗しました");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="名前" {...field} />
              </FormControl>
              <FormDescription>これはあなたの公開表示名です。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレス" {...field} />
              </FormControl>
              <FormDescription>
                これはあなたのメールアドレスです。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メッセージ</FormLabel>
              <FormControl>
                <Textarea placeholder="メッセージ" {...field} />
              </FormControl>
              <FormDescription>これはあなたのメッセージです。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  );
}
