import Link from "next/link";

export default function dashboard() {
  return (
    <div>
      page
      <Link href={"/dashboard/post"}>post</Link>
    </div>
  );
}
