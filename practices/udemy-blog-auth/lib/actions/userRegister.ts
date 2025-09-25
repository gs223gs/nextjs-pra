"use server";

import { prisma } from "@/lib/prisma";
import { userRegisterSchema } from "@/validations/userRegister";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

//~~udemyでのセクションを元に自分で考えて実装したけど，このままだとテストしにくいような~~...
//バックエンド的な思想だとDIしたいけど，Next.jsの思想的にはどうなんだろう
//TODO 研究対象

//Udemy 通りに実装してみる

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function userRegister(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawFormDate = Object.fromEntries(
    ["name", "password", "email", "confirmPassword"].map((field) => [
      field,
      formData.get(field) as string,
    ])
  ) as Record<string, string>;
  console.log("rawdata--------", rawFormDate);
  const validatedFields = userRegisterSchema.safeParse(
    rawFormDate,
  );
  console.log("validation----------", validatedFields.error?.flatten().fieldErrors);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: rawFormDate.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      errors: {
        name: [],
        email: ["このメールアドレスは登録されています"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(rawFormDate.password, 10);

  await prisma.user.create({
    data: {
      name: rawFormDate.name,
      email: rawFormDate.email,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false,
  });

  redirect("/dashboard");
}
