import { getPosts } from "@/lib/posts";

export default async function pages() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>
      <ul className="space-y-4 p-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md m-2">
            <li>title: {post.title}</li>
            <li>name:{post.author.name}</li>
            <li>content:{post.content}</li>
            <li>published:{post.published}</li>
            <li>authorId:{post.authorId}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
