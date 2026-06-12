"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function createSecretReference(name: string) {
  const cleanName = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_")
    .replace(/_+/g, "_");

  return `agentdock://secrets/${cleanName}`;
}

function maskValue(value: string) {
  if (!value) return "";

  if (value.length <= 6) {
    return "••••••";
  }

  return `${value.slice(0, 3)}••••••${value.slice(-3)}`;
}

export async function createSecret(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const name = String(formData.get("name") || "").trim();
  const provider = String(formData.get("provider") || "").trim();
  const rawValuePreview = String(formData.get("raw_value_preview") || "").trim();
  const projectId = String(formData.get("project_id") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!name) {
    throw new Error("Secret name is required.");
  }

  const reference = createSecretReference(name);
  const maskedValue = maskValue(rawValuePreview);

  const { error } = await supabase.from("secrets").insert({
    user_id: user.id,
    project_id: projectId || null,
    name,
    provider,
    masked_value: maskedValue,
    reference,
    notes,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/secrets");
}

export async function deleteSecret(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Secret id is required.");
  }

  const { error } = await supabase.from("secrets").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/secrets");
}