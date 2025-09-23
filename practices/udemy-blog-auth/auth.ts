// NextAuth.js（Auth.js）のコアライブラリをインポート
// 認証機能を提供するメインのライブラリ
import NextAuth from "next-auth";

// 認証設定ファイル（ページやコールバックの設定）をインポート
import { authConfig } from "./auth.config";

// Credentialsプロバイダー：メール/パスワード認証を実装するためのプロバイダー
import Credentials from "next-auth/providers/credentials";

// zodライブラリ：データのバリデーション（検証）を行うライブラリ
import { z } from "zod";

// Prismaクライアント：データベース操作を行うためのインスタンス
import { prisma } from "@/lib/prisma";

// bcryptライブラリ：パスワードの比較（ハッシュ化されたパスワードとの照合）を行う
import bcrypt from "bcrypt";

/**
 * Userの型定義
 * データベースから取得したユーザー情報の構造を定義
 * TypeScriptで型安全性を保証するために必要
 */
type User = {
  name: string | null;  // ユーザー名（nullの可能性あり）
  id: string;          // ユーザーID（一意の識別子）
  email: string;       // メールアドレス
  password: string;    // ハッシュ化されたパスワード
  createdAt: Date;     // アカウント作成日時
  updatedAt: Date;     // 最終更新日時
};

/**
 * メールアドレスからユーザー情報を取得する関数
 *
 * @param email - 検索するメールアドレス
 * @returns Promise<User | undefined> - ユーザー情報またはundefined
 *
 * async関数：非同期処理を行う関数
 * データベースアクセスは時間がかかるため非同期で実行
 */
async function getUser(email: string): Promise<User | undefined> {
  // Prismaを使ってデータベースから該当メールアドレスのユーザーを検索
  // findUnique：一意の値（この場合email）で1件のレコードを検索
  const user = await prisma.user.findUnique({
    where: { email },  // 検索条件：emailフィールドが一致するもの
  });

  // ユーザーが見つからなかった場合はundefinedを返す
  if (!user) return undefined;

  // ユーザー情報を返す
  return user;
}

/**
 * NextAuthの初期化と設定
 *
 * エクスポートされる要素：
 * - auth: 現在の認証状態を取得する関数
 * - signIn: ログイン処理を実行する関数
 * - signOut: ログアウト処理を実行する関数
 * - handlers: APIルートハンドラー（GET/POST対応）
 */
export const { auth, signIn, signOut, handlers } = NextAuth({
  // authConfigの設定を展開（スプレッド構文）
  // pages, callbacksなどの基本設定を含む
  ...authConfig,

  // 認証プロバイダーの設定
  providers: [
    // Credentialsプロバイダー：メール/パスワード認証
    Credentials({
      /**
       * authorize関数：ログイン時の認証ロジック
       *
       * @param credentials - ユーザーが入力した認証情報（email, password）
       * @returns 認証成功時はユーザー情報、失敗時はnull
       *
       * この関数の処理フロー：
       * 1. 入力値のバリデーション
       * 2. ユーザーの存在確認
       * 3. パスワードの照合
       * 4. 認証結果の返却
       */
      async authorize(credentials) {
        // zodを使った入力値のバリデーション
        // z.object()：オブジェクトの構造を定義
        // z.string().email()：文字列かつメール形式であることを検証
        // z.string().min(8)：文字列かつ8文字以上であることを検証
        const parsedCredentials = z
          .object({
            email: z.string().email(),     // メール形式チェック
            password: z.string().min(8)     // 最低8文字チェック
          })
          .safeParse(credentials);  // safeParse：エラーを投げずに結果を返す

        // バリデーション成功時の処理
        if (parsedCredentials.success) {
          // バリデーション済みのデータを取得
          const { email, password } = parsedCredentials.data;

          // データベースからユーザー情報を取得
          const user = await getUser(email);

          // ユーザーが存在しない場合は認証失敗
          if (!user) return null;

          // bcrypt.compare()：入力されたパスワードとハッシュ化されたパスワードを比較
          // 第1引数：平文のパスワード（ユーザー入力）
          // 第2引数：ハッシュ化されたパスワード（DB保存値）
          // 戻り値：一致すればtrue、不一致ならfalse
          const passwordMatch = await bcrypt.compare(password, user.password);

          // パスワードが一致した場合はユーザー情報を返す（認証成功）
          if (passwordMatch) return user;
        }

        // バリデーション失敗またはパスワード不一致の場合は認証失敗
        return null;
      },
    }),
  ],
});

/**
 * ========================================
 * このファイルの重要ポイント（初心者向け）
 * ========================================
 *
 * 1. NextAuth（Auth.js）の役割
 *    - ユーザー認証機能を簡単に実装できるライブラリ
 *    - セッション管理、JWT、プロバイダー認証などをサポート
 *
 * 2. Credentialsプロバイダー
 *    - 従来のメール/パスワード認証を実装
 *    - カスタムロジックを記述可能
 *
 * 3. セキュリティのポイント
 *    - パスワードは必ずハッシュ化して保存（bcrypt使用）
 *    - 入力値は必ずバリデーション（zod使用）
 *    - 認証失敗時は詳細なエラーを返さない（セキュリティ対策）
 *
 * 4. 非同期処理（async/await）
 *    - データベースアクセスは時間がかかるため非同期で実行
 *    - awaitで処理の完了を待つ
 *
 * 5. 型安全性
 *    - TypeScriptで型を定義することでエラーを防ぐ
 *    - 開発時にミスを早期発見できる
 */