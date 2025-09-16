// PrismaClientクラスをインポート - データベースとの接続・操作を行うためのクライアント
import { PrismaClient } from "@prisma/client";
// bcryptライブラリをインポート - パスワードのハッシュ化（暗号化）を行うためのライブラリ
import * as bcrypt from "bcrypt";

// PrismaClientのインスタンスを作成 - このインスタンスを通じてデータベース操作を行う
const prisma = new PrismaClient();

/**
 * シードデータを投入するメイン関数
 * async関数：非同期処理を行う関数。awaitキーワードと一緒に使用することで、
 * 非同期処理の完了を待ってから次の処理に進むことができる
 *
 * この関数の役割：
 * 1. 既存のデータを削除
 * 2. テスト用のユーザーと投稿データを作成
 */
const main = async () => {
  // データベース内の全ユーザーデータを削除
  // deleteMany()：条件に一致する複数のレコードを削除するPrismaのメソッド
  // 引数なしで呼び出すと全レコードを削除
  // await：非同期処理が完了するまで待機（削除が完了してから次へ進む）
  await prisma.user.deleteMany();
  // データベース内の全投稿データを削除
  await prisma.post.deleteMany();

  // パスワードをハッシュ化（暗号化）
  // bcrypt.hash(平文パスワード, ソルトラウンド数)
  // - 第1引数："password" - ハッシュ化する元のパスワード
  // - 第2引数：10 - ハッシュ化の強度（ソルトラウンド）。数値が大きいほど安全だが処理時間も増える
  // 戻り値：Promise<string> - ハッシュ化されたパスワード文字列を返すPromise
  const hashedPassword = await bcrypt.hash("password", 10);

  // ダミーの画像URL配列
  // string[]型：文字列の配列を表す型
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
    "https://picsum.photos/seed/post3/600/400",
  ];

  // ユーザーと関連する投稿を同時に作成
  // prisma.user.create()：新しいユーザーレコードを作成するメソッド
  // dataオブジェクト：作成するレコードのデータを指定
  const users = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      password: hashedPassword,  // ハッシュ化されたパスワードを保存
      // posts：リレーション（関連）データの作成
      // createキーワード：関連するpostsテーブルに新規レコードを作成
      posts: {
        // create配列：複数の投稿を一度に作成
        // 各オブジェクトが1つの投稿レコードになる
        create: [
          {
            title: "Post 1",
            content: "This is a test post",
            topImage: dummyImages[0],  // 配列の最初の画像URL
          },
          {
            title: "Post 2",
            content: "This is a test post",
            topImage: dummyImages[1],  // 配列の2番目の画像URL
          },
          {
            title: "Post 3",
            content: "This is a test post",
            topImage: dummyImages[2],  // 配列の3番目の画像URL
          },
        ],
      },
    },
  });

  // 作成されたユーザーデータをコンソールに出力
  console.log({ users });
};

// main関数を実行
main()
  // エラーが発生した場合の処理
  // catch()：Promise（非同期処理）でエラーが発生した時に実行される
  // (e)：エラーオブジェクトを受け取る引数
  .catch((e) => {
    console.error(e);  // エラー内容をコンソールに出力
    process.exit(1);   // プロセスを異常終了（終了コード1）
  })
  // 最終的に必ず実行される処理
  // finally()：成功・失敗に関わらず必ず実行される
  // async関数：非同期処理を含むため、async宣言が必要
  .finally(async () => {
    // Prismaクライアントとデータベースの接続を切断
    // $disconnect()：データベース接続を閉じるPrismaのメソッド
    // await：接続の切断が完了するまで待機
    await prisma.$disconnect();
  });