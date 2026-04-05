export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <main className="p-4"><h1 className="text-2xl font-semibold">@{username}</h1></main>;
}