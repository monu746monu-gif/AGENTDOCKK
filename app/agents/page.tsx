import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createAgent, deleteAgent } from "./actions";

export default async function AgentsPage() {
  const supabase = await createClient();

  const [{ data: savedAgents, error: agentsError }, { data: projects }] =
    await Promise.all([
      supabase
        .from("agents")
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

  if (agentsError) {
    throw new Error(agentsError.message);
  }

  return (
    <AppShell
      title="Agents"
      description="Connect AI agents to your shared project brain."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">Connect agent</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Add agents that will access your project brain through CLI,
            generated files, or MCP.
          </p>

          <form action={createAgent} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Project</label>
              <select
                name="project_id"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">General agent</option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Agent name</label>
              <input
                name="name"
                required
                placeholder="Codex for AgentDock"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Agent type</label>
              <select
                name="type"
                required
                defaultValue="Codex"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Codex">Codex</option>
                <option value="Claude">Claude</option>
                <option value="Cursor">Cursor</option>
                <option value="OpenClaw">OpenClaw</option>
                <option value="Cline">Cline</option>
                <option value="Custom MCP Agent">Custom MCP Agent</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Provider</label>
              <input
                name="provider"
                placeholder="OpenAI, Anthropic, Cursor, Custom..."
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Access method</label>
              <select
                name="access_method"
                defaultValue="Generated Files"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="CLI">CLI</option>
                <option value="Generated Files">Generated Files</option>
                <option value="MCP">MCP</option>
                <option value="CLI + Generated Files">CLI + Generated Files</option>
                <option value="Generated Files + MCP">Generated Files + MCP</option>
                <option value="CLI + MCP">CLI + MCP</option>
                <option value="CLI + Generated Files + MCP">
                  CLI + Generated Files + MCP
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Status</label>
              <select
                name="status"
                defaultValue="Not configured"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Not configured">Not configured</option>
                <option value="Setup ready">Setup ready</option>
                <option value="Connected">Connected</option>
                <option value="Needs review">Needs review</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Notes</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Example: This agent should use AGENTS.md and MCP context for the AgentDock repo."
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Save agent
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Connected agents
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {savedAgents?.length || 0} agent
              {(savedAgents?.length || 0) === 1 ? "" : "s"} saved
            </p>
          </div>

          {!savedAgents || savedAgents.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No agents connected yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Add your first agent. Later, AgentDock will use this setup to
                generate agent files and MCP context.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {agent.type}
                        </span>

                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {agent.access_method}
                        </span>

                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {agent.status}
                        </span>

                        {agent.projects?.name ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {agent.projects.name}
                          </span>
                        ) : (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            General
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {agent.name}
                      </h3>

                      {agent.provider ? (
                        <p className="mt-2 text-sm text-slate-400">
                          Provider: {agent.provider}
                        </p>
                      ) : null}

                      {agent.notes ? (
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                          {agent.notes}
                        </p>
                      ) : null}
                    </div>

                    <form action={deleteAgent}>
                      <input type="hidden" name="id" value={agent.id} />
                      <button
                        type="submit"
                        className="danger-button rounded-full border px-3 py-1.5 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}