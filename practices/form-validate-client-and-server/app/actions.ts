"use server";
import { FormSchema, formSchema } from "@/validations/form";
import { z } from "zod";

export async function submitForm(formData: FormSchema) {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
    };
  }

  // バリデーション成功後、DB保存処理をシミュレート
  // ここでわざとエラーを発生させる
  try {
    // DB保存処理（仮）
    throw new Error("データベース接続に失敗しました");

    // 本来ならここでDB保存処理
    // await saveToDatabase(validatedFields.data);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
}
