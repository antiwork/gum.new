"use server";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import db from "@/db";
import Editor from "./Editor";
import Viewer from "./Viewer";
import { auth } from "@/auth";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const gum = await db.query.gums.findFirst({
    where: (gums, { eq }) => eq(gums.id, id),
  });

  if (!gum) {
    return {
      title: "Not Found",
      description: "This gum page could not be found",
    };
  }

  // TODO: Make gum.title and gum.description useful
  const title = "Example Title";
  const description = "Example Description about this gum";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gum.new/gum/${gum.id}`,
      siteName: "gum.new",
      locale: "en_US",
      type: "website",
      images: [`/api/gum-og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@gumroad",
      images: [`/api/gum-og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}}`],
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
