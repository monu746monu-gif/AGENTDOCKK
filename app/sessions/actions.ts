"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createSession(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const title = String(formData.get("title") || "").trim();
  const projectId = String(formData.get("project_id") || "").trim();
  const agentId = String(formData.get("agent_id") || "").trim();
  const task = String(formData.get("task") || "").trim();
  const prompt = String(formData.get("prompt") || "").trim();
  const targetAgent = String(formData.get("target_agent") || "").trim();
  const type = String(formData.get("type") || "Prompt").trim();
  const status = String(formData.get("status") || "Draft").trim();

  if (!title) {
    throw new Error("Session title is required.");
  }

  const { error } = await supabase.from("sessions").insert({
    user_id: user.id,
    project_id: projectId || null,
    agent_id: agentId || null,
    title,
    task,
    prompt,
    target_agent: targetAgent,
    type,
    status,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/sessions");
}

export async function deleteSession(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Session id is required.");
  }

  const { error } = await supabase.from("sessions").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/sessions");
}