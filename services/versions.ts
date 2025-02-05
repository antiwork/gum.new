import db from "@/db";
import * as schema from "@/db/schema";

export type Version = typeof schema.versions.$inferSelect;

export interface CreateVersionInput {
  html: string;
  prompt: string;
  gumId: string;
  parentId: string;
}

export interface CreateVersionOutput {
  version: Version;
}

export async function createVersion(
  input: CreateVersionInput
): Promise<CreateVersionOutput> {
  const [version] = await db
    .insert(schema.versions)
    .values({
      html: input.html,
      prompt: input.prompt,
      gumId: input.gumId,
      parentId: input.parentId,
    })
    .returning();

  if (!version) {
    throw new Error("Failed to create version");
  }

  return { version };
}
