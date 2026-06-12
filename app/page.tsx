import Link from "next/link";
import Image from "next/image";
import { accessMethods, agents, product } from "@/lib/constants";

const workflow = [
  "GitHub repo",
  "Project brain",
  "Memory + Skills",
  "Generated files",
  "Agents",
];

const howItWorks = [
  {
    title: "Import a repo",
    description:
      "Start from a GitHub repository and capture the details agents usually need before they can work well.",
  },
  {
    title: "Build shared context",
    description:
      "Add memory, skills, secret references, agents, sessions, and project decisions in one calm workspace.",
  },
  {
    title: "Generate setup files",
    description:
      "Create AGENTS.md, CLAUDE.md, Cursor rules, OPENCLAW.md, CLINE.md, and shared context from the same source.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-[#17130f]">
      <section className="relative min-h-[760px] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/backgorund.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.78)_0%,rgba(255,250,242,0.68)_46%,#f8f3ea_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#f8f3ea]" />

        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" className="group flex items-center gap-3 rounded-2xl">
            <Image
              src="/Claude%20Sonnet%204_5%20_%20MyShell.jpeg"
              alt="AgentDock logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover shadow-[0_14px_32px_rgba(23,19,15,0.16)] transition group-hover:-translate-y-0.5"
            />
            <span className="font-semibold text-[#17130f]">{product.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-[#756b5f] hover:text-[#17130f] sm:block"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="premium-button rounded-full px-4 py-2 text-sm font-medium"
            >
              Start building
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
          <div className="premium-pill mb-6 inline-flex rounded-full border px-3 py-1 text-sm font-medium">
            CLI + generated files + MCP
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[#17130f] md:text-7xl">
            One{" "}
            <span className="rounded-2xl bg-[#D97757]/18 px-1 text-[#D97757] shadow-[inset_0_-0.18em_0_rgba(217,119,87,0.28)]">
              workspace
            </span>
            . All AI agents. One shared{" "}
            <span className="rounded-2xl bg-[#D97757]/18 px-1 text-[#D97757] shadow-[inset_0_-0.18em_0_rgba(217,119,87,0.28)]">
              project brain
            </span>
            .
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#756b5f] md:text-xl">
            AgentDock helps developers turn a GitHub repo into a shared project
            brain for Codex, Claude, Cursor, OpenClaw, Cline, and custom agents
            through CLI, generated files, and MCP.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/dashboard"
              className="premium-button rounded-full px-6 py-3 text-center text-sm font-medium"
            >
              Start building
            </Link>
            <Link
              href="/integrations"
              className="premium-button-secondary rounded-full border px-6 py-3 text-center text-sm font-medium"
            >
              View integrations
            </Link>
          </div>

          <div className="premium-surface mt-14 w-full max-w-4xl rounded-[2rem] p-4 text-left">
            <div className="rounded-[1.5rem] border border-[rgba(120,95,70,0.12)] bg-white/70 p-5">
              <div className="flex flex-col justify-between gap-4 border-b border-[rgba(120,95,70,0.12)] pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#17130f]">
                    AgentDock workflow
                  </p>
                  <p className="mt-1 text-sm text-[#756b5f]">
                    Repo context becomes setup files every agent can use.
                  </p>
                </div>
                <span className="premium-pill w-fit rounded-full border px-3 py-1 text-xs font-medium">
                  Shared context
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {workflow.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-[rgba(120,95,70,0.14)] bg-[#fffaf2]/78 p-4 shadow-[0_12px_28px_rgba(92,69,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(171,119,43,0.3)]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17130f] text-xs font-semibold text-[#fffaf2]">
                      {index + 1}
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#17130f]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[rgba(120,95,70,0.12)] bg-[#f8f3ea]/78 p-4">
                <div className="flex flex-wrap gap-2">
                  {["AGENTS.md", "CLAUDE.md", "Cursor rules", "OPENCLAW.md", "CLINE.md"].map(
                    (file) => (
                      <span
                        key={file}
                        className="rounded-full border border-[rgba(120,95,70,0.14)] bg-white/70 px-3 py-1 text-xs font-medium text-[#756b5f]"
                      >
                        {file}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="premium-card rounded-3xl border p-7">
          <p className="text-sm font-semibold text-[#9a681d]">Problem</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
            Every AI agent starts without your project context.
          </h2>
          <p className="mt-4 leading-7 text-[#756b5f]">
            Developers repeat setup notes, commands, constraints, decisions,
            and handoffs every time they move between AI tools.
          </p>
        </div>

        <div className="premium-card rounded-3xl border p-7">
          <p className="text-sm font-semibold text-[#9a681d]">Solution</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
            Keep one project brain that every agent can share.
          </h2>
          <p className="mt-4 leading-7 text-[#756b5f]">
            AgentDock brings repo context, memory, skills, sessions, secret
            references, and agent setup files into one clean workspace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#9a681d]">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
            From repository to agent-ready context.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.title} className="premium-card rounded-3xl border p-6">
              <h3 className="font-semibold text-[#17130f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#756b5f]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#9a681d]">Access methods</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
            Use the route each agent already supports.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {accessMethods.map((method) => (
            <div
              key={method.title}
              className="premium-card rounded-3xl border p-6"
            >
              <h3 className="font-semibold text-[#17130f]">{method.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#756b5f]">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 pb-24 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#9a681d]">Supported agents</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17130f]">
            Connect through generated files, CLI, and shared context.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="premium-card rounded-3xl border p-6"
            >
              <h3 className="font-semibold text-[#17130f]">{agent.name}</h3>
              <p className="mt-2 text-sm text-[#756b5f]">{agent.setup}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
