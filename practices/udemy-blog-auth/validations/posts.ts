import { z } from "zod";

export const postRegisterSchema = z.object({
  title: z.string().min(1, "titleは必須").max(100, "100文字以内"),
  content: z.string().min(1, "titleは必須").max(100, "100文字以内"),
  published: z.boolean(),
});

export const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "titleは必須").max(100, "100文字以内"),
  content: z.string().min(1, "titleは必須").max(100, "100文字以内"),
  published: z.boolean(),
});

export const deletePostSchema = z.object({
  id: z.string(),
});

export const togglePublishSchema = z.object({
  id: z.string(),
  publish: z.boolean(),
});

export type PostRegisterSchema = z.infer<typeof postRegisterSchema>;

export type PostFormErrors = z.inferFlattenedErrors<typeof postRegisterSchema>;
