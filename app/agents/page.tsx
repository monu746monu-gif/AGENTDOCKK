import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { agents } from "@/lib/constants";

export default function AgentsPage() {
  return (
    <AppShell
      title="Agents"
      description="Connect AI agents to your shared project brain."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h3 className="font-medium text-white">{agent.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{agent.setup}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <EmptyState
          title="No custom agents connected"
          description="Add a project-specific agent and choose whether it connects through CLI, generated files, or MCP."
          action="Connect agent"
        />
      </div>
    </AppShell>
  );
}