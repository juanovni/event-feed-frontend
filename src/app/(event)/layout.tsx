import { Sidebar } from "@/components";

export default function FeedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">

      <Sidebar activeSection="false" notificationCount={10} />

      <div className="px-0 sm:px-10">
        {children}
      </div>

    </main>
  );
}