import { getBlogByTitle } from "../../data/blogs";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: { title: string };
}) {
  const blog = getBlogByTitle(params.title);

  if (!blog) {
    return (
      <div className="min-h-screen p-8">
        <main className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">ブログが見つかりません</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ブログ一覧に戻る
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
          ← ブログ一覧に戻る
        </Link>
        
        <article>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-8">{blog.date}</p>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">{blog.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
}