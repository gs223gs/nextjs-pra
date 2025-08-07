import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // リクエストURLからクエリパラメータを取得
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash"); // トークンハッシュを取得
  const type = searchParams.get("type") as EmailOtpType | null; // OTPのタイプを取得
  const next = searchParams.get("next") ?? "/"; // リダイレクト先のURLを取得、デフォルトはルート

  // トークンハッシュとタイプが存在する場合
  if (token_hash && type) {
    const supabase = await createClient(); // Supabaseクライアントを作成

    // OTPを検証
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // エラーがない場合、指定されたURLまたはルートにリダイレクト
      redirect(next);
    } else {
      // エラーがある場合、エラーメッセージを含むエラーページにリダイレクト
      redirect(`/auth/error?error=${error?.message}`);
    }
  }

  // トークンハッシュまたはタイプがない場合、エラーページにリダイレクト
  redirect(`/auth/error?error=No token hash or type`);
}
