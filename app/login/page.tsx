import Link from "next/link";
import Image from "next/image";
import { login } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 text-white sm:px-6">
      <div className="premium-card w-full max-w-md rounded-2xl border p-6">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
            alt="AgentDock logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover shadow-[0_12px_26px_rgba(92,69,42,0.14)]"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="mt-1 text-sm text-[#756b5f]">
              Access your AgentDock workspace.
            </p>
          </div>
        </div>

        {params.error ? (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
            {params.error}
          </div>
        ) : null}

        <form action={login} className="mt-6 space-y-3">
          <input type="hidden" name="next" value={params.next || "/dashboard"} />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8a7e70]"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            required
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8a7e70]"
          />
          <button
            type="submit"
            className="premium-button block w-full rounded-xl px-4 py-3 text-center text-sm font-medium"
          >
            Continue
          </button>
        </form>

        <p className="mt-5 text-sm text-[#756b5f]">
          No account?{" "}
          <Link
            href={
              params.next
                ? `/signup?next=${encodeURIComponent(params.next)}`
                : "/signup"
            }
            className="font-medium text-[#9a681d]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
