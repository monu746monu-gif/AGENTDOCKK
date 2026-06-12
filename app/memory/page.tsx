import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";

export default function MemoryPage() {
  return (
    <AppShell
      title="Memory"
      description="Save important project facts that agents should remember."
    >
      <EmptyState
        title="No memories yet"
        description="Add project notes, decisions, bug history, commands, and context that agents can reuse."
        action="Add memory"
      />
    </AppShell>
  );
}