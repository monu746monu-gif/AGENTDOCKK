import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export default function SecretsPage() {
  return (
    <AppShell
      title="Secrets"
      description="Manage safe secret references for agents."
    >
      <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
        AgentDock should only expose secret references like{" "}
        <span className="font-mono">agentdock://secrets/OPENAI_API_KEY</span>.
        Raw secret values should never appear in generated files or MCP output.
      </div>

      <EmptyState
        title="No secret references yet"
        description="Add safe references for API keys without exposing raw values to agents."
        action="Add reference"
      />
    </AppShell>
  );
}