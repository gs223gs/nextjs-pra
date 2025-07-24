export default async function ItemPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">アイテムページ</h1>
        <p className="text-lg">アイテムスラッグ: {params.slug}</p>
      </main>
    </div>
  );
}