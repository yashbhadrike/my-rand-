import { listTemplates } from "@/lib/store";

export const revalidate = 300;

/** Public read-only catalogue (published templates only). */
export async function GET() {
  return Response.json({ templates: await listTemplates() });
}
