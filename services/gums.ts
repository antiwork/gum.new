import db from "@/db";
import * as schema from "@/db/schema";

export type Gum = typeof schema.gums.$inferSelect;
export type Version = typeof schema.versions.$inferSelect;

export interface CreateGumInput {
  title: string;
  version: {
    html: string;
    prompt: string;
  };
}

export interface CreateGumOutput {
  gum: Gum;
  version: Version;
}

export async function createGum(input: CreateGumInput): Promise<CreateGumOutput> {
  const [gum] = await db.insert(schema.gums).values({ title: input.title }).returning();

  if (!gum) {
    throw new Error("Failed to create gum");
  }

  const [version] = await db
    .insert(schema.versions)
    .values({
      html: input.version.html,
      prompt: input.version.prompt,
      gumId: gum.id,
    })
    .returning();

  return { gum, version };
}
