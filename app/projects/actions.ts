"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { fetchGitHubProjectBrain } from "@/lib/github/repo";

export async function importProjectFromGitHub(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const repoUrl = String(formData.get("repo_url") || "").trim();

  if (!repoUrl) {
    throw new Error("GitHub repository URL is required.");
  }

  const brain = await fetchGitHubProjectBrain(repoUrl);

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name: brain.name,
    description: brain.description,
    tech_stack: brain.tech_stack,
    repo_url: brain.repo_url,
    run_commands: brain.run_commands,
    current_tasks: brain.current_tasks,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const techStack = String(formData.get("tech_stack") || "").trim();
  const repoUrl = String(formData.get("repo_url") || "").trim();
  const runCommands = String(formData.get("run_commands") || "").trim();
  const currentTasks = String(formData.get("current_tasks") || "").trim();

  if (!name) {
    throw new Error("Project name is required.");
  }

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name,
    description,
    tech_stack: techStack,
    repo_url: repoUrl,
    run_commands: runCommands,
    current_tasks: currentTasks,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Project id is required.");
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}