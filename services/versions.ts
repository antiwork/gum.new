import db from "@/db";
import * as schema from "@/db/schema";

export type Version = typeof schema.versions.$inferSelect;

export interface CreateVersionInput {
  html: string;
  prompt: string;
  gumId: string;
  parentId: string;
}

export async function createVersion(
  input: CreateVersionInput
): Promise<Version> {
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

  return version;
}

export interface GetParentVersionInput {
  versionId: string;
}

export async function getParentVersion(
  input: GetParentVersionInput
): Promise<Version | null> {
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.id, input.versionId),
  });

  if (!version?.parentId) {
    return null;
  }

  const parentVersion = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.id, version.parentId ?? ""),
  });

  return parentVersion ?? null;
}

export interface GetLatestVersionInput {
  gumId: string;
}

export async function getLatestVersion(
  input: GetLatestVersionInput
): Promise<Version | null> {
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.gumId, input.gumId),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });

  return version ?? null;
}

export interface GetLatestChildVersionInput {
  versionId: string;
}

export async function getLatestChildVersion(
  input: GetLatestChildVersionInput
): Promise<Version | null> {
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.parentId, input.versionId),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });

  return version ?? null;
}
