import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/Statcard";
import { EmptyState } from "@/components/EmptyState";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: projects },
    { count: memories },
    { count: skills },
    { count: agents },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("memories").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("agents").select("*", { count: "exact", head: true }),
  ]);

  return (
    <AppShell
      title="Dashboard"
      description="Overview of your shared AI agent workspace."
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Projects"
          value={String(projects || 0)}
          description="Project brains"
        />
        <StatCard
          label="Memories"
          value={String(memories || 0)}
          description="Saved context"
        />
        <StatCard
          label="Skills"
          value={String(skills || 0)}
          description="Reusable prompts"
        />
        <StatCard
          label="Agents"
          value={String(agents || 0)}
          description="Connected agents"
        />
      </div>

      <div className="mt-8">
        <EmptyState
          title="Create your first project brain"
          description="Add project details, run commands, memory, skills, and agent setup so AI tools can use the same context."
          action="Go to projects"
          actionHref="/projects"
        />
      </div>
    </AppShell>
  );
}
