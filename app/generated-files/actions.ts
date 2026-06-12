"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateAgentFile, getFileName } from "@/lib/agentdock/generate";

export async function createGeneratedFile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const projectId = String(formData.get("project_id") || "").trim();
  const fileType = String(formData.get("file_type") || "AGENTS.md").trim();

  if (!projectId) {
    throw new Error("Project is required.");
  }

  const [
    { data: project, error: projectError },
    { data: memories },
    { data: skills },
    { data: secrets },
    { data: agents },
    { data: sessions },
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("id", projectId).single(),

    supabase
      .from("memories")
      .select("*")
      .or(`project_id.eq.${projectId},project_id.is.null`)
      .order("created_at", { ascending: false }),

    supabase.from("skills").select("*").order("created_at", { ascending: false }),

    supabase
      .from("secrets")
      .select("*")
      .or(`project_id.eq.${projectId},project_id.is.null`)
      .order("created_at", { ascending: false }),

    supabase
      .from("agents")
      .select("*")
      .or(`project_id.eq.${projectId},project_id.is.null`)
      .order("created_at", { ascending: false }),

    supabase
      .from("sessions")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (projectError || !project) {
    throw new Error(projectError?.message || "Project not found.");
  }

  const fileName = getFileName(fileType);

  const content = generateAgentFile({
    fileType,
    project,
    memories: memories || [],
    skills: skills || [],
    secrets: secrets || [],
    agents: agents || [],
    sessions: sessions || [],
  });

  const { data: existingFile } = await supabase
    .from("generated_files")
    .select("id")
    .eq("user_id", user.id)
    .eq("project_id", projectId)
    .eq("file_type", fileType)
    .maybeSingle();

  if (existingFile) {
    const { error } = await supabase
      .from("generated_files")
      .update({
        file_name: fileName,
        content,
        created_at: new Date().toISOString(),
      })
      .eq("id", existingFile.id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("generated_files").insert({
      user_id: user.id,
      project_id: projectId,
      file_type: fileType,
      file_name: fileName,
      content,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath("/generated-files");
}

export async function deleteGeneratedFile(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Generated file id is required.");
  }

  const { error } = await supabase
    .from("generated_files")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/generated-files");
}