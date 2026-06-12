import { AppShell } from "@/components/AppShell";
import { createClient } from "@/lib/supabase/server";
import { createSecret, deleteSecret } from "./actions";

export default async function SecretsPage() {
  const supabase = await createClient();

  const [{ data: secrets, error: secretsError }, { data: projects }] =
    await Promise.all([
      supabase
        .from("secrets")
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

  if (secretsError) {
    throw new Error(secretsError.message);
  }

  return (
    <AppShell
      title="Secrets"
      description="Store safe secret references for generated files and MCP context."
    >
      <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
        AgentDock stores secret references only. Do not paste full API keys
        here. Generated files and MCP output should use safe references like{" "}
        <span className="font-mono text-amber-50">
          agentdock://secrets/OPENAI_API_KEY
        </span>
        .
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-white">
            Add secret reference
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Add a safe reference name that agents can mention without seeing the
            real secret value.
          </p>

          <form action={createSecret} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Project</label>
              <select
                name="project_id"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">General reference</option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300">Secret name</label>
              <input
                name="name"
                required
                placeholder="OPENAI_API_KEY"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
              <p className="mt-2 text-xs text-slate-500">
                This will become agentdock://secrets/YOUR_SECRET_NAME.
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-300">Provider</label>
              <input
                name="provider"
                placeholder="OpenAI, Supabase, GitHub, Resend..."
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">
                Optional masked preview
              </label>
              <input
                name="raw_value_preview"
                placeholder="sk-abc...xyz"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
              <p className="mt-2 text-xs text-slate-500">
                Paste only a small preview if needed. Do not paste the full key.
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-300">Notes</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Used by backend only. Never expose in frontend."
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-[#8d8172]"
              />
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Save reference
            </button>
          </form>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Saved references
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {secrets?.length || 0} reference
              {(secrets?.length || 0) === 1 ? "" : "s"} saved
            </p>
          </div>

          {!secrets || secrets.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-white">
                No secret references yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Add references for API keys and tokens. Agents will only see the
                safe reference, not the real value.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {secrets.map((secret) => (
                <div
                  key={secret.id}
                  className="premium-card rounded-2xl border p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {secret.provider ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {secret.provider}
                          </span>
                        ) : null}

                        {secret.projects?.name ? (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {secret.projects.name}
                          </span>
                        ) : (
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            General
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {secret.name}
                      </h3>

                      <div className="mt-4 premium-panel rounded-xl border p-4">
                        <p className="text-xs text-slate-500">
                          Safe reference
                        </p>
                        <p className="mt-2 break-all font-mono text-sm leading-6 text-slate-300">
                          {secret.reference}
                        </p>
                      </div>

                      {secret.masked_value ? (
                        <div className="mt-3 premium-panel rounded-xl border p-4">
                          <p className="text-xs text-slate-500">
                            Masked preview
                          </p>
                          <p className="mt-2 font-mono text-sm leading-6 text-slate-300">
                            {secret.masked_value}
                          </p>
                        </div>
                      ) : null}

                      {secret.notes ? (
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                          {secret.notes}
                        </p>
                      ) : null}
                    </div>

                    <form action={deleteSecret}>
                      <input type="hidden" name="id" value={secret.id} />
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