import db from "@/db";
import * as schema from "@/db/schema";

export type Gum = typeof schema.gums.$inferSelect;
export type Version = typeof schema.versions.$inferSelect;

export interface CreateGumInput {
  title: string;
  version?: {
    html: string;
    prompt: string;
  };
}

export interface CreateGumOutput {
  gum: Gum;
  version?: Version;
}

export async function createGum(
  input: CreateGumInput
): Promise<CreateGumOutput> {
  const [gum] = await db
    .insert(schema.gums)
    .values({ title: input.title })
    .returning();

  if (!gum) {
    throw new Error("Failed to create gum");
  }

  let version;
  if (input.version) {
    const { html, prompt } = input.version;
    const [createdVersion] = await db
      .insert(schema.versions)
      .values({
        html,
        prompt,
        gumId: gum.id,
      })
      .returning();

    if (!createdVersion) {
      throw new Error("Failed to create gum version");
    }
    version = createdVersion;
  }

  return { gum, version };
}
