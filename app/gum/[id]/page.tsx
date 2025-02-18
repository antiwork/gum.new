"use server";

import { notFound } from "next/navigation";
import db from "@/db";
import Editor from "./Editor";
import Viewer from "./Viewer";
import { auth } from "@/auth";
import { Metadata } from "next";

// Helper function to extract metadata from HTML
function extractMetadata(html: string) {
  // More flexible regex that handles nested tags and whitespace
  const titleMatch = html.match(/<h1[^>]*>\s*(.*?)\s*<\/h1>/i);

  const title = titleMatch
    ? titleMatch[1]
        .replace(/<[^>]*>/g, "") // Remove any nested HTML tags
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim()
    : "Gum.new";

  // Try multiple approaches to find description text
  let description = "A Gum.new page";

  // Try to find text content after removing HTML tags
  const textContent = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "") // Remove styles
    .replace(/<[^>]+>/g, " ") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  if (textContent) {
    // Remove the title from the description
    description = textContent.replace(title, "").trim();
    description = description.slice(0, 200);
    if (description.length === 200) {
      description += "...";
    }
  }

  // Try to find first image
  const imgMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
  const image = imgMatch ? imgMatch[1] : "/thumb.png";

  return { title, description, image };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
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
      images: [
        {
          url: metadata.image,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image],
    },
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const session = await auth();
  const userId = session?.user.id;
  const { id } = await props.params;
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
