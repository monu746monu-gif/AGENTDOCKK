"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createAgent(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const provider = String(formData.get("provider") || "").trim();
  const accessMethod = String(
    formData.get("access_method") || "Generated Files"
  ).trim();
  const status = String(formData.get("status") || "Not configured").trim();
  const projectId = String(formData.get("project_id") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!name) {
    throw new Error("Agent name is required.");
  }

  if (!type) {
    throw new Error("Agent type is required.");
  }

  const { error } = await supabase.from("agents").insert({
    user_id: user.id,
    project_id: projectId || null,
    name,
    type,
    provider,
    access_method: accessMethod,
    status,
    notes,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/agents");
  revalidatePath("/dashboard");
}

export async function deleteAgent(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Agent id is required.");
  }

  const { error } = await supabase.from("agents").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/agents");
  revalidatePath("/dashboard");
}