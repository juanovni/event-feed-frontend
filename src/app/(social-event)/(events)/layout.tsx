'use client';

import { Button } from "@/components/ui/button";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Contenido principal */}
      <div className="flex w-full max-w-6xl justify-center gap-x-10">
        {/* Feed central */}
        <div className="w-full max-w-1/2">{children}</div>

        {/* Columna de sugerencias */}
        <aside className="hidden lg:block w-80">
          <h2 className="px-1 py-2 font-semibold text-gray-800 mb-4">
            Sugerencias para ti
          </h2>
          <div className="sticky top-6 space-y-6">
            <section className="bg-white p-4 rounded-2xl shadow-sm">
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i + 5}`}
                        alt=""
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          usuario_{i + 1}
                        </p>
                        <p className="text-xs text-gray-500">Te sigue</p>
                      </div>
                    </div>
                    <Button size={"sm"} variant={"default"}>
                      Seguir
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </>
  );
}
