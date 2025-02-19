"use server";

import { notFound } from "next/navigation";
import db from "@/db";
import Editor from "./Editor";
import Viewer from "./Viewer";
import { auth } from "@/auth";
import { Metadata } from "next";

function extractMetadata(html: string) {
  // Get the first h1 tag
  const h1Match = html.match(/<h1[^>]*>\s*(.*?)\s*<\/h1>/i);
  const title = h1Match ? h1Match[1] : "Untitled Gum";

  // Get the first p, h2, or h3 tag
  const pMatch = html.match(/<p[^>]*>\s*(.*?)\s*<\/p>/i);
  const h2Match = html.match(/<h2[^>]*>\s*(.*?)\s*<\/h2>/i);
  const h3Match = html.match(/<h3[^>]*>\s*(.*?)\s*<\/h3>/i);
  const description = h2Match ? h2Match[1] : h3Match ? h3Match[1] : pMatch ? pMatch[1] : "A gum page";

  const imgMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
  const image = imgMatch ? imgMatch[1] : null;

  return { title, description, image };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.gumId, id),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });

  if (!version) {
    return {
      title: "Not Found",
      description: "This gum page could not be found",
    };
  }

  const metadata = extractMetadata(version.html);

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [{ url: metadata.image }] : ["/api/og"],
    },
    twitter: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [metadata.image] : ["/api/og"],
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
  const isOwner = gum.userId === userId;
  return isOwner ? <Editor initialHtml={version.html} gumId={id} /> : <Viewer html={version.html} />;
}
