import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="m-10">
      フォームが正常に送信されました。
      <Link href="/" className="text-blue-500">
        戻る
      </Link>
    </div>
  );
}
