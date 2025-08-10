'use server'
import { FormSchema, formSchema } from "@/validations/form";
import { z } from "zod";

export async function submitForm(formData: FormSchema) {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
    };
  }

  return {
    success: true,
  };
}