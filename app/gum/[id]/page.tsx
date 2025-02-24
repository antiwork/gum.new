"use server";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import db from "@/db";
import Editor from "./Editor";
import Viewer from "./Viewer";
import { auth } from "@/auth";
import { trackView } from "./actions";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const gum = await db.query.gums.findFirst({
    where: (gums, { eq }) => eq(gums.id, id),
  });

  if (!gum) {
    return {
      title: "Not Found",
      description: "Gum could not be found",
    };
  }

  const title = gum.title || "Untitled Gum";
  const description = gum.description || null;
  const coverUrl = gum.coverUrl || null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gum.new/gum/${gum.id}`,
      siteName: "gum.new",
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = session?.user.id;
  const { id } = await params;
  const gum = await db.query.gums.findFirst({
    where: (gums, { eq }) => eq(gums.id, id),
  });
  if (!gum) {
    notFound();
  }
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.gumId, id),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });
  if (!version) {
    notFound();
  }

  // Track the view
  await trackView(id, userId);

  const isOwner = gum.userId === userId;
  return isOwner ? <Editor initialHtml={version.html} gumId={id} /> : <Viewer html={version.html} />;
}
