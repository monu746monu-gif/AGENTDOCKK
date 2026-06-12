import { AppShell } from "@/components/AppShell";
import { accessMethods, agents } from "@/lib/constants";

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

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Agent setup map</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{agent.setup}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                Planned
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}