"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createMemory(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const content = String(formData.get("content") || "").trim();
  const projectId = String(formData.get("project_id") || "").trim();
  const importance = String(formData.get("importance") || "Medium").trim();
  const tagsInput = String(formData.get("tags") || "").trim();

  if (!content) {
    throw new Error("Memory content is required.");
  }

  const tags = tagsInput
    ? tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const { error } = await supabase.from("memories").insert({
    user_id: user.id,
    project_id: projectId || null,
    content,
    importance,
    tags,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/memory");
  revalidatePath("/dashboard");
}

export async function deleteMemory(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Memory id is required.");
  }

  const { error } = await supabase.from("memories").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/memory");
  revalidatePath("/dashboard");
}