import Link from "next/link";
import { accessMethods, agents, product } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
            AD
          </div>
          <span className="font-semibold">{product.name}</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-slate-400 hover:text-white sm:block"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-slate-200"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
            CLI + Generated Files + MCP
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
            {product.tagline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-slate-200"
            >
              Open workspace
            </Link>
            <Link
              href="/integrations"
              className="rounded-full border border-white/10 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/[0.05]"
            >
              View integrations
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {accessMethods.map((method) => (
            <div
              key={method.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-medium text-white">{method.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-400">Problem</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Every AI agent starts blank.
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Developers repeat the same project context, commands, bugs,
              decisions, and rules every time they switch between AI tools.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">Solution</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Save the project brain once.
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              AgentDock keeps project details, memory, skills, sessions, and
              secret references in one workspace that agents can access.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-slate-400">Supported agents</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Connect through the method each agent supports.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-medium">{agent.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{agent.setup}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}