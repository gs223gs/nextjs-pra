// Supabaseのサーバークライアントを作成するための関数をインポート
import { createServerClient } from "@supabase/ssr";
// Next.jsのレスポンスとリクエストの型をインポート
import { NextResponse, type NextRequest } from "next/server";
// 環境変数が設定されているかを確認するユーティリティ関数をインポート
import { hasEnvVars } from "../utils";

// セッションを更新するための非同期関数を定義
export async function updateSession(request: NextRequest) {
  // 初期のレスポンスオブジェクトを作成し、リクエストを含める
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 環境変数が設定されていない場合、ミドルウェアのチェックをスキップ
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // Fluidコンピュートを使用する場合、グローバル変数にクライアントを置かない
  // 各リクエストごとに新しいクライアントを作成
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // SupabaseのURLを環境変数から取得
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!, // Supabaseのキーを環境変数から取得
    {
      cookies: {
        // クッキーを全て取得するメソッド
        getAll() {
          return request.cookies.getAll();
        },
        // クッキーを全て設定するメソッド
        setAll(cookiesToSet) {
          // 各クッキーをリクエストに設定
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // 新しいレスポンスオブジェクトを作成し、リクエストを含める
          supabaseResponse = NextResponse.next({
            request,
          });
          // 各クッキーをレスポンスに設定
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // createServerClientとsupabase.auth.getClaims()の間にコードを実行しない
  // ユーザーがランダムにログアウトされる問題を引き起こす可能性がある

  // 重要: getClaims()を削除すると、サーバーサイドレンダリングを使用する場合に
  // ユーザーがランダムにログアウトされる可能性がある
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // ユーザーが存在しない場合、ログインページにリダイレクトする可能性がある
  if (
    request.nextUrl.pathname !== "/" &&
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // ユーザーがいない場合、ログインページにリダイレクト
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 重要: supabaseResponseオブジェクトをそのまま返す必要がある
  // 新しいレスポンスオブジェクトを作成する場合は、リクエストを含める
  // 例: const myNewResponse = NextResponse.next({ request })
  // クッキーをコピーする: myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // myNewResponseオブジェクトを必要に応じて変更するが、クッキーは変更しない
  // 最後に: return myNewResponse
  // これを行わないと、ブラウザとサーバーが同期を失い、ユーザーのセッションが早期に終了する可能性がある

  return supabaseResponse;
}
