export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <hr className="border-gray-300" />
        <h3 className="text-2xl font-bold text-gray-900">
          Profile Page{" "}
          <span className="p-2 ml-2 rounded bg-orange-500 text-black font-bold">
            {id}
          </span>
        </h3>
      </div>
    </div>
  );
}