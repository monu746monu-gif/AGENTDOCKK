import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createMemory, deleteMemory } from "./actions";

export default async function MemoryPage() {
  const supabase = await createClient();

  const [{ data: memories, error: memoriesError }, { data: projects }] =
    await Promise.all([
      supabase
        .from("memories")
        .select(
          `
          *,
          projects (
            name
          )
        `
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("projects")
        .select("id, name")
        .order("created_at", { ascending: false }),
    ]);

  if (memoriesError) {
    throw new Error(memoriesError.message);
  }

  return (
    <AppShell
      title="Memory"
      description="Save important project context that agents should remember."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">Add memory</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Save facts, decisions, commands, bugs, and rules that your connected
            agents should reuse.
          </p>

          <form action={createMemory} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Project</label>
              <select
                name="project_id"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">General memory</option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Memory</label>
              <textarea
                name="content"
                required
                rows={5}
                placeholder="Example: This project uses Supabase RLS, so all queries must include user_id policies."
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Tags</label>
              <input
                name="tags"
                placeholder="auth, supabase, bug, setup"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
              <p className="mt-2 text-xs text-slate-500">
                Separate tags with commas.
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-300">Importance</label>
              <select
                name="importance"
                defaultValue="Medium"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Save memory
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Saved memories
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {memories?.length || 0} memor
              {(memories?.length || 0) === 1 ? "y" : "ies"} saved
            </p>
          </div>

          {!memories || memories.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No memories yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Add your first memory. These notes will become reusable context
                for generated files, CLI, and MCP.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {memory.importance || "Medium"}
                        </span>

                        {memory.projects?.name ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {memory.projects.name}
                          </span>
                        ) : (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            General
                          </span>
                        )}
                      </div>

                      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {memory.content}
                      </p>
                    </div>

                    <form action={deleteMemory}>
                      <input type="hidden" name="id" value={memory.id} />
                      <button
                        type="submit"
                        className="danger-button rounded-full border px-3 py-1.5 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </div>

                  {memory.tags && memory.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {memory.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}