"use client";
import { useActionState } from "react";
import { userRegister } from "@/lib/actions/userRegister";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  // useActionStateの使い方
  // 第1引数: Server Action関数
  // 第2引数: 初期値
  const [state, formAction] = useActionState(userRegister, {
    success: false,
    errors: {},
  });

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Input type="text" name="name" placeholder="Name" required />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <Input type="email" name="email" placeholder="Email" required />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* 送信ボタン */}
        <Button type="submit" className="w-full"></Button>

        {/* 一般的なエラーメッセージ */}
        {state?.errors?.general && (
          <p className="text-red-500 text-center">
            {state.errors.name.join(",")}
          </p>
        )}
      </div>
    </form>
  );
}
