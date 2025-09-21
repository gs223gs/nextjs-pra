import { getPost } from '@/lib/posts'
export default async function pages({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author.name}</p>
    </div>
  )
}
