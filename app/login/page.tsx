import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-slate-400">
          Supabase auth will be added in the next step.
        </p>

        <div className="mt-6 space-y-3">
          <input
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
          />
          <Link
            href="/dashboard"
            className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
          >
            Continue
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          No account?{" "}
          <Link href="/signup" className="text-white">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}