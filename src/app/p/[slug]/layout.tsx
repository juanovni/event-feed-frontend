'use client';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full max-w-2xl mx-auto px-4 py-8">
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}
