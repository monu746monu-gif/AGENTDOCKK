import { getProjectContextResponse } from "@/lib/projects/context";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return getProjectContextResponse(id);
}
