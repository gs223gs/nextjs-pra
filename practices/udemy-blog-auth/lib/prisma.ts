// Prismaクライアントをインポート
// PrismaClientはデータベースとの接続とクエリ実行を管理するクライアントクラス
import {PrismaClient } from "@prisma/client";

// グローバルオブジェクト（globalThis）を拡張して、Prismaインスタンスを保持できるようにする
// これはTypeScriptの型定義で、globalThisにprismaプロパティを追加している
// unknown型を経由することで、TypeScriptの型チェックを回避し、カスタムプロパティを追加可能にする
const glovalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prismaクライアントのシングルトンインスタンスをエクスポート
// すでにグローバルにインスタンスが存在する場合はそれを使用し、
// 存在しない場合は新しいPrismaClientインスタンスを作成する
// ?? はNullish coalescing演算子で、左側がnullまたはundefinedの場合に右側の値を返す
export const prisma =
  glovalForPrisma.prisma ??
  new PrismaClient()

// 開発環境（development）でのみ、作成したPrismaインスタンスをグローバルに保存
// これにより、Next.jsのホットリロード時に新しいPrismaClientインスタンスが
// 何度も作成されることを防ぎ、データベース接続数の枯渇を防ぐ
// 本番環境では、この処理は実行されず、通常のインスタンス管理が行われる
if (process.env.NODE_ENV !== "production") glovalForPrisma.prisma = prisma;