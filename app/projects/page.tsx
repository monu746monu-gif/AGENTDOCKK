import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export default function ProjectsPage() {
  return (
    <AppShell
      title="Projects"
      description="Create and manage project brains for your AI agents."
    >
      <EmptyState
        title="No projects yet"
        description="A project brain stores your project description, tech stack, commands, bugs, rules, and context."
        action="New project"
      />
    </AppShell>
  );
}