import { notFound } from "next/navigation";
import db from "@/db";
import Editor from "./Editor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.gumId, id),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });

  if (!version) {
    notFound();
  }

  return <Editor initialHtml={version.html} />;
}
