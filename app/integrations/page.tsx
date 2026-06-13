import { AppShell } from "@/components/AppShell";
import { accessMethods, agents } from "@/lib/constants";

const cliCommands = [
  {
    title: "Install AgentDock CLI",
    command: "npm link",
    description:
      "For local development, link the AgentDock CLI globally from this project.",
  },
  {
    title: "Initialize inside any project",
    command: "agentdock init",
    description:
      "Creates .agentdock/config.json and detects basic project information.",
  },
  {
    title: "Check project status",
    command: "agentdock status",
    description:
      "Shows current AgentDock project name, tech stack, and config path.",
  },
  {
    title: "View generated file status",
    command: "agentdock files",
    description:
      "Shows which agent context files are already created or missing.",
  },
  {
    title: "Generate all files",
    command: "agentdock generate",
    description:
      "Generates AGENTS.md, CLAUDE.md, Cursor rules, OPENCLAW.md, CLINE.md, and shared context.",
  },
];

const generatedTargets = [
  {
    command: "agentdock generate agents",
    file: "AGENTS.md",
    agent: "Codex",
  },
  {
    command: "agentdock generate claude",
    file: "CLAUDE.md",
    agent: "Claude",
  },
  {
    command: "agentdock generate cursor",
    file: ".cursor/rules/project.md",
    agent: "Cursor",
  },
  {
    command: "agentdock generate openclaw",
    file: "OPENCLAW.md",
    agent: "OpenClaw",
  },
  {
    command: "agentdock generate cline",
    file: "CLINE.md",
    agent: "Cline",
  },
  {
    command: "agentdock generate context",
    file: ".agentdock/context.md",
    agent: "Shared context",
  },
];

export default function IntegrationsPage() {
  return (
    <AppShell
      title="Integrations"
      description="Set up CLI, generated files, and MCP access for your agents."
    >
      <div className="grid gap-4 md:grid-cols-3">
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

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-slate-400">CLI setup</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Connect your local project with AgentDock CLI
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              The CLI creates local AgentDock config and generates agent-ready
              files directly inside your repository.
            </p>
          </div>

          <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
            Working locally
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {cliCommands.map((item, index) => (
            <div
              key={item.command}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  <pre className="mt-3 overflow-auto rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-300">
                    {item.command}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold text-white">
            Generated file targets
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Generate all files together, or generate only the file needed for a
            specific agent.
          </p>

          <div className="mt-5 space-y-3">
            {generatedTargets.map((target) => (
              <div
                key={target.command}
                className="rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-white">
                      {target.file}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {target.agent}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    CLI
                  </span>
                </div>

                <pre className="mt-3 overflow-auto rounded-xl bg-black/40 px-4 py-3 text-xs text-slate-300">
                  {target.command}
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold text-white">Agent setup map</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Each agent gets the connection method and file format it works best
            with.
          </p>

          <div className="mt-5 space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <div>
                  <h3 className="font-medium text-white">{agent.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{agent.setup}</p>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  v1
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-slate-400">MCP access</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              MCP server is planned next
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              MCP will let compatible agents fetch project context, memory,
              skills, secret references, and sessions live from AgentDock.
            </p>
          </div>

          <span className="w-fit rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
            Planned
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "get_project_context",
            "search_memory",
            "list_skills",
            "list_secret_references",
            "get_agent_setup",
            "create_session",
          ].map((tool) => (
            <div
              key={tool}
              className="rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-slate-300"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}