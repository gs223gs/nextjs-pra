export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">ユーザーページ</h1>
        <p className="text-lg">ユーザーID: {params.id}</p>
      </main>
    </div>
  );
}