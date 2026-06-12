"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createSkill(formData: FormData) {
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
  const instructions = String(formData.get("instructions") || "").trim();
  const targetAgent = String(formData.get("target_agent") || "General").trim();
  const category = String(formData.get("category") || "General").trim();

  if (!name) {
    throw new Error("Skill name is required.");
  }

  if (!instructions) {
    throw new Error("Skill instructions are required.");
  }

  const { error } = await supabase.from("skills").insert({
    user_id: user.id,
    name,
    description,
    instructions,
    target_agent: targetAgent,
    category,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/skills");
  revalidatePath("/dashboard");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Skill id is required.");
  }

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/skills");
  revalidatePath("/dashboard");
}