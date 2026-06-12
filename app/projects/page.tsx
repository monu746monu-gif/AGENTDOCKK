import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import {
  createProject,
  deleteProject,
  importProjectFromGitHub,
} from "./actions";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <AppShell
      title="Projects"
      description="Import a GitHub repository and turn it into a shared project brain."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">
            Import from GitHub
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Paste a public GitHub repository URL. AgentDock will fetch the repo
            name, description, tech stack, scripts, and README details
            automatically.
          </p>

          <form action={importProjectFromGitHub} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">
                GitHub repository URL
              </label>
              <input
                name="repo_url"
                required
                placeholder="https://github.com/username/repo"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Fetch and save project brain
            </button>
          </form>

          <div className="mt-5 premium-panel rounded-xl border p-4">
            <p className="text-xs font-medium text-slate-400">
              What gets imported
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>• Project name and description</li>
              <li>• Repository URL</li>
              <li>• Languages and detected framework</li>
              <li>• package.json scripts as run commands</li>
              <li>• Basic next tasks for agent setup</li>
            </ul>
          </div>

          <details className="mt-5 premium-panel rounded-xl border p-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-300">
              Manual fallback
            </summary>

            <form action={createProject} className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-slate-300">Project name</label>
                <input
                  name="name"
                  required
                  placeholder="AgentDock, Vexa, StudyAI..."
                  className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="What is this project about?"
                  className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Tech stack</label>
                <input
                  name="tech_stack"
                  placeholder="Next.js, Supabase, Tailwind..."
                  className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">
                  Repository URL
                </label>
                <input
                  name="repo_url"
                  placeholder="https://github.com/..."
                  className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Run commands</label>
                <textarea
                  name="run_commands"
                  rows={3}
                  placeholder={"npm run dev\nnpm run build"}
                  className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Current tasks</label>
                <textarea
                  name="current_tasks"
                  rows={3}
                  placeholder="Build CLI, add generated files, add MCP server..."
                  className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
                />
              </div>

              <button
                type="submit"
                className="w-full premium-button-secondary rounded-xl border px-4 py-3 text-sm font-medium"
              >
                Save manually
              </button>
            </form>
          </details>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Saved projects</h2>
            <p className="mt-1 text-sm text-slate-400">
              {projects?.length || 0} project brain
              {(projects?.length || 0) === 1 ? "" : "s"} saved
            </p>
          </div>

          {!projects || projects.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No projects yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Import a GitHub repo to create your first project brain. This
                will become the base context for your connected agents.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.name}
                      </h3>

                      {project.description ? (
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {project.description}
                        </p>
                      ) : null}
                      <p className="mt-3 break-all font-mono text-xs text-slate-500">
  ID: {project.id}
</p>
                    </div>

                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <button
                        type="submit"
                        className="danger-button rounded-full border px-3 py-1.5 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {project.tech_stack ? (
                      <div className="premium-panel rounded-xl border p-3">
                        <p className="text-xs text-slate-500">Tech stack</p>
                        <p className="mt-1 text-sm text-slate-300">
                          {project.tech_stack}
                        </p>
                      </div>
                    ) : null}

                    {project.repo_url ? (
                      <div className="premium-panel rounded-xl border p-3">
                        <p className="text-xs text-slate-500">Repo</p>
                        <p className="mt-1 break-all text-sm text-slate-300">
                          {project.repo_url}
                        </p>
                      </div>
                    ) : null}

                    {project.run_commands ? (
                      <div className="premium-panel rounded-xl border p-3 md:col-span-2">
                        <p className="text-xs text-slate-500">Run commands</p>
                        <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {project.run_commands}
                        </pre>
                      </div>
                    ) : null}

                    {project.current_tasks ? (
                      <div className="premium-panel rounded-xl border p-3 md:col-span-2">
                        <p className="text-xs text-slate-500">Current tasks</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {project.current_tasks}
                        </p>
                      </div>
                    ) : null}
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