import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export default function SessionsPage() {
  return (
    <AppShell
      title="Sessions"
      description="Track agent work history and handoffs."
    >
      <EmptyState
        title="No sessions yet"
        description="Sessions will store prompts, generated context, handoffs, and agent work history."
        action="Create session"
      />
    </AppShell>
  );
}