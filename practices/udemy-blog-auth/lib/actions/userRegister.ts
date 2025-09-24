"use server";

import { prisma } from "@/lib/prisma";
import { userRegisterSchema } from "@/validations/userRegister";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
//udemyでのセクションを元に自分で考えて実装したけど，このままだとテストしにくいような...
//バックエンド的な思想だとDIしたいけど，Next.jsの思想的にはどうなんだろう
//TODO 研究対象

export async function userRegister(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validatedFields = userRegisterSchema.safeParse({
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
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

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  await prisma.user.create({
    data: {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
