"use server";
// Prismaクライアントのインスタンスをインポート
// @/lib/prisma は tsconfig.json で設定されたエイリアス（@はプロジェクトルートを指す）
import { prisma } from "@/lib/prisma";
import { Post } from "@/types/post";
import { redirect } from "next/navigation";
import {
  postRegisterSchema,
  PostRegisterSchema,
  updatePostSchema,
} from "@/validations/posts";
import { auth } from "@/auth";

/**
 * 公開済みの投稿一覧を取得する関数
 *
 * async関数の特徴：
 * - 非同期処理を同期的に書ける（awaitと組み合わせて使用）
 * - 戻り値は自動的にPromiseでラップされる
 * - この関数の戻り値の型: Promise<Post[]>（Postの配列を返すPromise）
 */
export const getPosts = async (): Promise<Post[]> => {
  // prisma.post.findMany()：postsテーブルから複数のレコードを取得
  // awaitで非同期処理の完了を待つ（データベースからデータが返ってくるまで待機）
  const posts = await prisma.post.findMany({
    // where句：検索条件を指定
    where: {
      // publishedカラムがtrueのレコードのみ取得
      // これにより下書き（published: false）は除外される
      published: true,
    },
    // orderBy句：並び替え条件を指定
    orderBy: {
      // createdAtカラムで降順（desc）ソート
      // "desc" = descending（降順）：新しい投稿が先頭に来る
      // "asc" = ascending（昇順）：古い投稿が先頭に来る
      createdAt: "desc",
    },
    // include句：リレーション（関連）データを含める
    include: {
      // authorフィールド（Userテーブルとのリレーション）を含める
      author: {
        // select句：取得するカラムを限定
        // nameカラムのみ取得（パスワードなど不要な情報は取得しない）
        select: { name: true },
      },
    },
  });

  // 取得した投稿データを返す
  return posts;
};

/**
 * 指定IDの投稿を単一取得し、著者名も一緒に返す。
 * Prismaは未取得時にnullを返すため、呼び出し側で存在チェックが必要。
 */
export const getPost = async (id: string): Promise<Post> => {
  if (!id) {
    throw new Error("ID is required");
  }
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });
  return post as Post;
};

/**
 * フリーワード検索を行い、タイトル・本文の両方を対象にAND条件で絞り込む。
 * 複数スペースや全角スペースを正規化してから条件配列を生成する点がポイント。
 */
export const searchPosts = async (query: string): Promise<Post[]> => {
  const decodedQuery = decodeURIComponent(query);

  const normalizedQuery = decodedQuery.replace(/[\s　]+/g, " ").trim();
  const serchWords = normalizedQuery.split(" ").filter(Boolean);
  const filters = serchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  return await prisma.post.findMany({
    where: {
      published: true, // ✅ 公開済みのみ
      AND: filters,
    },
    // orderBy句：並び替え条件を指定
    orderBy: {
      // createdAtカラムで降順（desc）ソート
      // "desc" = descending（降順）：新しい投稿が先頭に来る
      // "asc" = ascending（昇順）：古い投稿が先頭に来る
      createdAt: "desc",
    },
    // include句：リレーション（関連）データを含める
    include: {
      // authorフィールド（Userテーブルとのリレーション）を含める
      author: {
        // select句：取得するカラムを限定
        // nameカラムのみ取得（パスワードなど不要な情報は取得しない）
        select: { name: true },
      },
    },
  });
};

type ActionState = {
  success: boolean;
  errors: Errors;
};

type Errors = {
  title?: string[] | undefined;
  content?: string[] | undefined;
  publish?: string[] | undefined;
  auth?: string[];
  server?: string[];
};

/**
 * 既存投稿を更新するサーバーアクション。
 * バリデーション・認可チェックを通過したデータのみDBに反映し、その後ダッシュボードへ遷移させる。
 */
export const updatePost = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  //form取得
  const rawFormData = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    published: formData.get("published") === "true", // boolean変換
  };
  //validation
  const validatedFields = updatePostSchema.safeParse(rawFormData);
  console.log(validatedFields.success);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  //user どうする？
  const session = await auth();
  console.log("userid----------------", session?.user?.id);
  if (!session?.user?.id) {
    return {
      success: false,
      errors: { auth: ["auth error"] },
    };
  }
  console.log("publish-----------", validatedFields.data.published);
  //db登録
  await prisma.post.update({
    data: {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      topImage: "",
      published: validatedFields.data.published as boolean,
      authorId: session.user.id,
    },
    where: { id: validatedFields.data.id },
  });

  //redirect
  console.log("success!!!!!!!!!!!!!!!!!!");
  redirect("/dashboard");
};

/**
 * 新規投稿を作成するサーバーアクション。
 * フォーム値の検証とログイン確認を行い、保存成功時は呼び出し側でUI更新できるよう成功フラグを返す。
 */
export const createPost = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  //form取得
  const rawFormData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    published: formData.get("published") === "true", // boolean変換
  };
  //validation
  const validatedFields = postRegisterSchema.safeParse(rawFormData);
  console.log(validatedFields.success);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  //user どうする？
  const session = await auth();
  console.log("userid----------------", session?.user?.id);
  if (!session?.user?.id) {
    return {
      success: false,
      errors: { auth: ["auth error"] },
    };
  }
  console.log("publish-----------", validatedFields.data.published);
  //db登録
  await prisma.post.create({
    data: {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      topImage: "",
      published: validatedFields.data.published as boolean,
      authorId: session.user.id,
    },
  });

  //redirect
  console.log("success!!!!!!!!!!!!!!!!!!");
  return { success: true, errors: {} };
};

/**
 * ログイン中ユーザー自身の投稿のみを取得する。
 * 未ログイン時は公開一覧へリダイレクトし、author名を含む形で返却する。
 */
export const getOwnPosts = async (): Promise<Post[]> => {
  // userid 取得
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/posts");
  }
  //db から取得
  return await prisma.post.findMany({
    where: {
      authorId: session.user.id,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  // return
};
/**
 * ========================================
 * コードレビュー：良い点・悪い点・改善案
 * ========================================
 *
 * 【良い点】
 * 1. シンプルで理解しやすい
 *    - 関数が1つの責務（公開済み投稿の取得）に特化している
 *    - 関数名が明確で何をするか分かりやすい
 *
 * 2. セキュリティ考慮
 *    - selectで必要なフィールドのみ取得（authorのnameのみ）
 *    - パスワードなどの機密情報を含まない
 *
 * 3. 適切なフィルタリング
 *    - published: trueで公開済みのみ取得
 *    - 下書きが誤って表示されることを防ぐ
 *
 * 【改善が必要な点・アンチパターン】
 *
 * 1. エラーハンドリングの欠如（重要）
 *    現状：エラーが発生すると呼び出し元に伝播するだけ
 *    改善案：
 *    ```typescript
 *    export const getPosts = async () => {
 *      try {
 *        const posts = await prisma.post.findMany({...});
 *        return { success: true, data: posts };
 *      } catch (error) {
 *        console.error('投稿の取得に失敗:', error);
 *        return { success: false, error: 'データの取得に失敗しました' };
 *      }
 *    };
 *    ```
 *
 * 2. 型定義の不足
 *    現状：戻り値の型が暗黙的
 *    改善案：
 *    ```typescript
 *    import { Post, User } from '@prisma/client';
 *
 *    type PostWithAuthor = Post & {
 *      author: Pick<User, 'name'>;
 *    };
 *
 *    export const getPosts = async (): Promise<PostWithAuthor[]> => {
 *      // ...
 *    };
 *    ```
 *
 * 3. ページネーションの欠如（スケーラビリティの問題）
 *    現状：全件取得するため、投稿が増えるとパフォーマンス問題が発生
 *    改善案：
 *    ```typescript
 *    export const getPosts = async (page = 1, limit = 10) => {
 *      const posts = await prisma.post.findMany({
 *        where: { published: true },
 *        orderBy: { createdAt: "desc" },
 *        skip: (page - 1) * limit,  // オフセット
 *        take: limit,                // 取得件数
 *        include: { author: { select: { name: true } } },
 *      });
 *
 *      const totalCount = await prisma.post.count({
 *        where: { published: true }
 *      });
 *
 *      return {
 *        posts,
 *        totalPages: Math.ceil(totalCount / limit),
 *        currentPage: page
 *      };
 *    };
 *    ```
 *
 * 4. キャッシュの欠如
 *    現状：毎回データベースにアクセス
 *    現場での対応：
 *    - Redis等のキャッシュサーバーを使用
 *    - Next.jsのキャッシュ機能を活用（unstable_cache等）
 *    - React QueryやSWRなどのクライアントサイドキャッシュ
 *
 * 【現場でのベストプラクティス】
 *
 * 1. Repository パターンの採用
 *    ```typescript
 *    // repositories/PostRepository.ts
 *    class PostRepository {
 *      async findPublishedPosts(options?: FindOptions) {
 *        // データアクセスロジック
 *      }
 *
 *      async findById(id: string) {
 *        // 単一投稿取得
 *      }
 *    }
 *    ```
 *
 * 2. DTOパターンでレスポンス整形
 *    ```typescript
 *    // dto/PostDto.ts
 *    class PostDto {
 *      static fromEntity(post: PostEntity): PostResponse {
 *        return {
 *          id: post.id,
 *          title: post.title,
 *          authorName: post.author.name,
 *          // 必要なフィールドのみ
 *        };
 *      }
 *    }
 *    ```
 *
 * 3. トランザクション管理
 *    複数のデータ操作を行う場合はトランザクションで囲む
 *    ```typescript
 *    await prisma.$transaction(async (tx) => {
 *      // 複数の操作をトランザクション内で実行
 *    });
 *    ```
 *
 * 4. 監視とログ
 *    - データベースクエリの実行時間を監視
 *    - エラーログを適切に記録（Sentry, DataDog等）
 *    - パフォーマンスメトリクスの収集
 *
 * 5. テストの実装
 *    ```typescript
 *    describe('getPosts', () => {
 *      it('公開済みの投稿のみを返す', async () => {
 *        const posts = await getPosts();
 *        expect(posts.every(p => p.published)).toBe(true);
 *      });
 *    });
 *    ```
 */
