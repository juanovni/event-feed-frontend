import { Sidebar } from "@/components";

export default function FeedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Sidebar fija */}
      <aside className="w-64 fixed h-full border-r bg-white">
        <Sidebar />
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 ml-64 flex justify-center p-6">
        {/* Feed + sugerencias */}
        <div className="flex w-full max-w-6xl justify-center gap-10">
          {/* Feed central */}
          <div className="w-full max-w-2xl">{children}</div>

          {/* Columna de sugerencias */}
          {/* <aside className="hidden lg:block w-80">
            <div className="sticky top-6 space-y-6">
              <section className="bg-white p-4 rounded-2xl shadow-sm">
                <h2 className="font-semibold text-gray-800 mb-3">
                  Sugerencias para ti
                </h2>

                <ul className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between"
                    >
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
                          <p className="text-xs text-gray-500">
                            Te sigue
                          </p>
                        </div>
                      </div>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                        Seguir
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </aside> */}
        </div>
      </div>

    </main>
  );
}