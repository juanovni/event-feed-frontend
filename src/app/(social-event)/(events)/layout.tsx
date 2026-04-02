'use client';

import { UserSuggestions } from "@/components";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Contenido principal */}
      <div className="flex w-full max-w-5xl mx-auto gap-10">
        {/* Feed central */}
        <div className="w-full max-w-xl">{children}</div>

        {/* Columna de sugerencias */}
        <aside className="hidden lg:block w-80">
          <h2 className="px-1 py-2 font-semibold text-gray-800 mb-4">
            Sugerencias para ti
          </h2>
          <div className="sticky top-6 space-y-6">
            <section className="bg-white p-4 rounded-2xl shadow-sm">
              <UserSuggestions />
            </section>
          </div>
        </aside>
        
      </div>
    </>
  );
}
