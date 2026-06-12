import { Sidebar } from "./Sidebar";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

type AppShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export async function AppShell({ title, description, children }: AppShellProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen text-[#17130f]">
      <div className="flex">
        <Sidebar />

        <main className="min-h-screen flex-1">
          <header className="sticky top-0 z-30 border-b border-[rgba(120,95,70,0.14)] bg-[#fffaf2]/78 px-4 py-4 backdrop-blur-xl sm:px-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-[#17130f]">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-[#756b5f]">{description}</p>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="premium-pill max-w-[260px] truncate rounded-full border px-3 py-1.5 text-xs">
                  {user?.email || "No user"}
                </div>

                <form action={logout}>
                  <button className="premium-button-secondary rounded-full border px-3 py-1.5 text-xs font-medium">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
