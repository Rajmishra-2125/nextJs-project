type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: PageProps) {
  const { id } = await params; // ✅ THIS IS THE KEY LINE

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <hr />
      <p className="text-4xl">Profile:</p>
      <span className="p-2 rounded bg-orange-500 text-black">{id}</span>
    </div>
  );
}
