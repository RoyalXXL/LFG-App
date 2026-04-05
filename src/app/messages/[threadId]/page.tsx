export default async function MessageThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  return <main className="p-4"><h1 className="text-2xl font-semibold">Thread {threadId}</h1></main>;
}