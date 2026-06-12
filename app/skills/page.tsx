import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export default function SkillsPage() {
  return (
    <AppShell
      title="Skills"
      description="Reusable instructions that tell agents how to work."
    >
      <EmptyState
        title="No skills yet"
        description="Create skills like FastAPI Debugger, React UI Expert, Clean Code Reviewer, or Codex Prompt Writer."
        action="Add skill"
      />
    </AppShell>
  );
}