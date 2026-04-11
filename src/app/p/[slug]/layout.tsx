'use client';

import { AuthRequiredModal } from "@/components";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full max-w-6xl mx-auto px-0 py-8">
      <div className="w-full max-w-6xl">
        {children}
        <AuthRequiredModal />
      </div>
    </div>
  );
}
