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
      <div className="flex w-full md:max-w-5xl mx-auto gap-10">
        {/* Feed central */}
        <div className="w-full max-w-xl">{children}</div>

        {/* Columna de sugerencias */}
        <aside className="hidden lg:block w-80">
          <div className="sticky top-6 space-y-6">
            <section>
              <UserSuggestions />
            </section>
          </div>
        </aside>
        
      </div>
    </>
  );
}
