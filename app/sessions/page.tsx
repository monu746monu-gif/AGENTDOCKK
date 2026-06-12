import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createSession, deleteSession } from "./actions";

export default async function SessionsPage() {
  const supabase = await createClient();

  const [
    { data: sessions, error: sessionsError },
    { data: projects },
    { data: agents },
  ] = await Promise.all([
    supabase
      .from("sessions")
      .select(
        `
        *,
        projects (
          name
        ),
        agents (
          name,
          type
        )
      `
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("projects")
      .select("id, name")
      .order("created_at", { ascending: false }),
    supabase
      .from("agents")
      .select("id, name, type")
      .order("created_at", { ascending: false }),
  ]);

  if (sessionsError) {
    throw new Error(sessionsError.message);
  }

  return (
    <AppShell
      title="Sessions"
      description="Track agent work history, prompts, tasks, and handoffs."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">Create session</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Save a prompt, task, or handoff so agents can continue from the same
            context later.
          </p>

          <form action={createSession} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Session title</label>
              <input
                name="title"
                required
                placeholder="Build generated file engine"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Project</label>
              <select
                name="project_id"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">No project</option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Agent</label>
              <select
                name="agent_id"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">No agent</option>
                {agents?.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Target agent</label>
              <select
                name="target_agent"
                defaultValue="General"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="General">General</option>
                <option value="Codex">Codex</option>
                <option value="Claude">Claude</option>
                <option value="Cursor">Cursor</option>
                <option value="OpenClaw">OpenClaw</option>
                <option value="Cline">Cline</option>
                <option value="Custom MCP Agent">Custom MCP Agent</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Session type</label>
              <select
                name="type"
                defaultValue="Prompt"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Prompt">Prompt</option>
                <option value="Task">Task</option>
                <option value="Handoff">Handoff</option>
                <option value="Bug Fix">Bug Fix</option>
                <option value="Research">Research</option>
                <option value="Setup">Setup</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Status</label>
              <select
                name="status"
                defaultValue="Draft"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="In progress">In progress</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
                <option value="Needs review">Needs review</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Task</label>
              <textarea
                name="task"
                rows={4}
                placeholder="What should the agent do?"
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Prompt / Handoff</label>
              <textarea
                name="prompt"
                rows={7}
                placeholder="Write the prompt or handoff context here..."
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Save session
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Saved sessions
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {sessions?.length || 0} session
              {(sessions?.length || 0) === 1 ? "" : "s"} saved
            </p>
          </div>

          {!sessions || sessions.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No sessions yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Create your first session. Sessions help agents continue work
                without losing context.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {session.type || "Prompt"}
                        </span>

                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {session.status || "Draft"}
                        </span>

                        {session.target_agent ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {session.target_agent}
                          </span>
                        ) : null}

                        {session.projects?.name ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {session.projects.name}
                          </span>
                        ) : null}

                        {session.agents?.name ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {session.agents.name}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {session.title}
                      </h3>

                      {session.task ? (
                        <div className="mt-4 premium-panel rounded-xl border p-4">
                          <p className="text-xs text-slate-500">Task</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                            {session.task}
                          </p>
                        </div>
                      ) : null}

                      {session.prompt ? (
                        <div className="mt-3 premium-panel rounded-xl border p-4">
                          <p className="text-xs text-slate-500">
                            Prompt / Handoff
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                            {session.prompt}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <form action={deleteSession}>
                      <input type="hidden" name="id" value={session.id} />
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