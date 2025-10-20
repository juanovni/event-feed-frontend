import { Sidebar } from "@/components";

export default function FeedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">

      <Sidebar />

      <div className="ml-64 p-6">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>

    </main>
  );
}