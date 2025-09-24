import { z } from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().min(1, "名前は必須です"),
    email: z.string({ required_error: "mailは必須です" }).email(),
    password: z
      .string()
      .min(8, "パスワードは8文字以上である必要があります")
      .max(100, "パスワードは100文字以内である必要があります"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
