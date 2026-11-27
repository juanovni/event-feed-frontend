"use client";

import { Sidebar } from "@/components";
import { usePathname } from "next/navigation";

export default function FeedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isNearbyPage = usePathname() === "/nearby";
  return (
    <main className="min-h-screen bg-gray-50">

      <Sidebar />

      <div className="md:ml-64 p-2 md:p-6 transition-all">

        <div className={isNearbyPage ? "w-full" : "max-w-5xl mx-auto"}>
          {children}
        </div>
      </div>

    </main>
  );
}
