import { Sidebar } from "./Sidebar";

type AppShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-h-screen flex-1">
          <header className="border-b border-white/10 bg-[#08090d]/80 px-6 py-5 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-slate-400">{description}</p>
              </div>

              <div className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 sm:block">
                MVP v1
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}