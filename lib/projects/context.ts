import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function getProjectContextResponse(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const [
    { data: project, error: projectError },
    { data: memories, error: memoriesError },
    { data: skills, error: skillsError },
    { data: secrets, error: secretsError },
    { data: agents, error: agentsError },
    { data: sessions, error: sessionsError },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),

    supabase
      .from("memories")
      .select("*")
      .or(`project_id.eq.${id},project_id.is.null`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("skills")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("secrets")
      .select("*")
      .or(`project_id.eq.${id},project_id.is.null`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("agents")
      .select("*")
      .or(`project_id.eq.${id},project_id.is.null`)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("sessions")
      .select("*")
      .eq("project_id", id)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (projectError || !project) {
    return NextResponse.json(
      {
        error: "Project not found",
      },
      {
        status: 404,
      }
    );
  }

  const errors = [
    memoriesError,
    skillsError,
    secretsError,
    agentsError,
    sessionsError,
  ].filter(Boolean);

  if (errors.length > 0) {
    return NextResponse.json(
      {
        error: "Could not fetch full project context",
        details: errors.map((error) => error?.message),
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    project,
    memories: memories || [],
    skills: skills || [],
    secrets: (secrets || []).map((secret) => ({
      id: secret.id,
      name: secret.name,
      provider: secret.provider,
      reference: secret.reference,
      notes: secret.notes,
      created_at: secret.created_at,
    })),
    agents: agents || [],
    sessions: sessions || [],
  });
}
