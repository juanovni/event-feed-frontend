import { Sidebar } from "@/components";

export default function FeedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">

      <Sidebar />

      <div className="md:ml-64 p-0 md:p-6 transition-all">

        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>

    </main>
  );
}
