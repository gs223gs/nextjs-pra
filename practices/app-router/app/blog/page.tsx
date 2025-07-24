import Link from "next/link";
import { getAllBlogs } from "../data/blogs";

export default async function BlogListPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ブログ一覧</h1>
        
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="border-b pb-4">
              <Link 
                href={`/blog/${blog.id}`}
                className="block hover:bg-gray-50 p-4 rounded-lg transition-colors"
              >
                <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{blog.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}