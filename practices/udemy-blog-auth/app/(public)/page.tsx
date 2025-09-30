import Link from "next/link";

export default function page() {
  return (
    <div>
      <Link href="/posts" className="m-10 p-5 border-4">
        POSTS
      </Link>
      <Link href="/login" className="m-10 p-5 border-4">
        LOGIN
      </Link>
    </div>
  );
}
