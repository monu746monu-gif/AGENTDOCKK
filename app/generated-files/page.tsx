import { AppShell } from "@/components/AppShell";
import { CopyButton } from "@/components/CopyButton";
import { DownloadFileButton } from "@/components/DownloadFileButton";
import { createClient } from "@/lib/supabase/server";
import {
  formatNumber,
  getCharacterCount,
  getLineCount,
} from "@/lib/utils/text";
import { createGeneratedFile, deleteGeneratedFile } from "./actions";

export default async function GeneratedFilesPage() {
  const supabase = await createClient();

  const [{ data: generatedFiles, error: filesError }, { data: projects }] =
    await Promise.all([
      supabase
        .from("generated_files")
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

  if (filesError) {
    throw new Error(filesError.message);
  }

  return (
    <AppShell
      title="Generated Files"
      description="Generate agent setup files from your project brain."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="premium-card rounded-2xl border p-5">
          <h2 className="text-lg font-semibold text-[#17130f]">
            Generate file
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#756b5f]">
            Pick a project and file type. AgentDock will combine project brain,
            memories, skills, secret references, agents, and sessions into one
            agent-ready file.
          </p>

          <form action={createGeneratedFile} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-[#5f554b]">
                Project
              </label>
              <select
                name="project_id"
                required
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="">Select project</option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#5f554b]">
                File type
              </label>
              <select
                name="file_type"
                defaultValue="AGENTS.md"
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              >
                <option value="AGENTS.md">AGENTS.md - Codex</option>
                <option value="CLAUDE.md">CLAUDE.md - Claude</option>
                <option value="Cursor Rules">
                  .cursor/rules/project.md - Cursor
                </option>
                <option value="OPENCLAW.md">OPENCLAW.md - OpenClaw</option>
                <option value="CLINE.md">CLINE.md - Cline</option>
                <option value="Shared Context">
                  .agentdock/context.md - Shared
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="premium-button w-full rounded-xl px-4 py-3 text-sm font-medium"
            >
              Generate file
            </button>
          </form>

          <div className="premium-panel mt-5 rounded-xl border p-4">
            <p className="text-xs font-medium text-[#5f554b]">
              Generated content includes
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#756b5f]">
              <li>Project details and run commands</li>
              <li>Important memories</li>
              <li>Relevant skills</li>
              <li>Safe secret references</li>
              <li>Connected agents</li>
              <li>Recent sessions and handoffs</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#17130f]">
              Saved generated files
            </h2>
            <p className="mt-1 text-sm text-[#756b5f]">
              {generatedFiles?.length || 0} file
              {(generatedFiles?.length || 0) === 1 ? "" : "s"} generated
            </p>
          </div>

          {!generatedFiles || generatedFiles.length === 0 ? (
            <div className="premium-card rounded-2xl border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium text-[#17130f]">
                No generated files yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756b5f]">
                Generate your first file. Later, the AgentDock CLI will write
                these files directly into your local repo.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {generatedFiles.map((file) => (
                <div
                  key={file.id}
                  className="premium-card overflow-hidden rounded-2xl border"
                >
                  <div className="border-b border-[rgba(120,95,70,0.14)] p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {file.file_type}
                          </span>

                          {file.projects?.name ? (
                            <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                              {file.projects.name}
                            </span>
                          ) : null}

                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {formatNumber(getLineCount(file.content))} lines
                          </span>

                          <span className="premium-pill rounded-full border px-3 py-1 text-xs">
                            {formatNumber(getCharacterCount(file.content))}{" "}
                            chars
                          </span>
                        </div>

                        <h3 className="mt-4 break-all font-mono text-lg font-semibold text-[#17130f]">
                          {file.file_name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#756b5f]">
                          Generated from your project brain, memories, skills,
                          secret references, agents, and recent sessions.
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 xl:justify-end">
                        <CopyButton text={file.content} />

                        <DownloadFileButton
                          fileName={file.file_name}
                          content={file.content}
                        />

                        <form action={deleteGeneratedFile}>
                          <input type="hidden" name="id" value={file.id} />
                          <button
                            type="submit"
                            className="danger-button rounded-full border px-3 py-1.5 text-xs font-medium"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a7e70]">
                        Preview
                      </p>
                      <p className="text-xs text-[#8a7e70]">Markdown</p>
                    </div>

                    <pre className="max-h-[420px] overflow-auto rounded-2xl border border-[rgba(120,95,70,0.14)] bg-[#fffaf2]/85 p-4 text-xs leading-6 text-[#5f554b] shadow-inner">
                      {file.content}
                    </pre>
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
