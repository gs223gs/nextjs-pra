'use server'
import { FormSchema, formSchema } from "@/validations/form";
import { z } from "zod";

export async function submitForm(formData: FormSchema) {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
    };
  }

  return {
    success: true,
  };
}