import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">動的ルートのデモ</h1>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">ユーザーページ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/user/1" className="text-blue-600 hover:underline">
                  ユーザー 1
                </Link>
              </li>
              <li>
                <Link href="/user/2" className="text-blue-600 hover:underline">
                  ユーザー 2
                </Link>
              </li>
              <li>
                <Link href="/user/3" className="text-blue-600 hover:underline">
                  ユーザー 3
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">アイテムページ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/item/apple" className="text-blue-600 hover:underline">
                  Apple
                </Link>
              </li>
              <li>
                <Link href="/item/banana" className="text-blue-600 hover:underline">
                  Banana
                </Link>
              </li>
              <li>
                <Link href="/item/orange" className="text-blue-600 hover:underline">
                  Orange
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}