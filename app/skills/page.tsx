import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createSkill, deleteSkill } from "./actions";

export default async function SkillsPage() {
  const supabase = await createClient();

  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <AppShell
      title="Skills"
      description="Create reusable instructions that tell agents how to work."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">Add skill</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Skills are reusable prompts and rules that AgentDock can include in
            generated files and MCP context.
          </p>

          <form action={createSkill} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Skill name</label>
              <input
                name="name"
                required
                placeholder="Supabase Debugger"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="What should this skill help agents do?"
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Category</label>
              <select
                name="category"
                defaultValue="Development"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="Development">Development</option>
                <option value="Debugging">Debugging</option>
                <option value="Security">Security</option>
                <option value="UI">UI</option>
                <option value="Database">Database</option>
                <option value="Agent Setup">Agent Setup</option>
                <option value="Prompting">Prompting</option>
                <option value="General">General</option>
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
              <label className="text-sm text-slate-300">Instructions</label>
              <textarea
                name="instructions"
                required
                rows={7}
                placeholder="Write clear instructions that an AI agent should follow when using this skill."
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Save skill
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Saved skills</h2>
            <p className="mt-1 text-sm text-slate-400">
              {skills?.length || 0} skill
              {(skills?.length || 0) === 1 ? "" : "s"} saved
            </p>
          </div>

          {!skills || skills.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No skills yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Add your first reusable skill. Later, AgentDock will include
                these skills in generated files and MCP context.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {skill.category || "General"}
                        </span>

                        <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                          {skill.target_agent || "General"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {skill.name}
                      </h3>

                      {skill.description ? (
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {skill.description}
                        </p>
                      ) : null}

                      <div className="mt-4 premium-panel rounded-xl border p-4">
                        <p className="text-xs text-slate-500">Instructions</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {skill.instructions}
                        </p>
                      </div>
                    </div>

                    <form action={deleteSkill}>
                      <input type="hidden" name="id" value={skill.id} />
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