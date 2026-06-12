import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/Statcard";
import { EmptyState } from "@/components/EmptyState";

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="Overview of your shared AI agent workspace."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Projects" value="0" description="Project brains" />
        <StatCard label="Memories" value="0" description="Saved context" />
        <StatCard label="Skills" value="0" description="Reusable prompts" />
        <StatCard label="Agents" value="0" description="Connected agents" />
      </div>

      <div className="mt-8">
        <EmptyState
          title="Create your first project brain"
          description="Add project details, run commands, memory, skills, and agent setup so AI tools can use the same context."
          action="Create project"
        />
      </div>
    </AppShell>
  );
}