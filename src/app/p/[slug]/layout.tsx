'use client';

import { AuthRequiredModal } from "@/components";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full max-w-2xl mx-auto px-0 md:px-4 py-8">
      <div className="w-full max-w-2xl">
        {children}
        <AuthRequiredModal />
      </div>
    </div>
  );
}
