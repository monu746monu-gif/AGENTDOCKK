"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(formData: FormData) {
  const next = String(formData.get("next") || "");

  if (!next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }

  return next;
}

function getAuthErrorPath(
  pathname: "/login" | "/signup",
  message: string,
  nextPath: string
) {
  const params = new URLSearchParams({ error: message });

  if (nextPath !== "/dashboard") {
    params.set("next", nextPath);
  }

  return `${pathname}?${params.toString()}`;
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const nextPath = getSafeNextPath(formData);

  if (!email || !password) {
    redirect(
      getAuthErrorPath("/signup", "Email and password are required", nextPath)
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(getAuthErrorPath("/signup", error.message, nextPath));
  }

  redirect(nextPath);
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const nextPath = getSafeNextPath(formData);

  if (!email || !password) {
    redirect(
      getAuthErrorPath("/login", "Email and password are required", nextPath)
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(getAuthErrorPath("/login", error.message, nextPath));
  }

  redirect(nextPath);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
