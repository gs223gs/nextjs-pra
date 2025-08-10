import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }),
  email: z.email("メールアドレスが無効です"),
  message: z.string().min(1, { message: "メッセージは必須です" }),
});

// フォームのスキーマを定義
export type FormSchema = z.infer<typeof formSchema>;