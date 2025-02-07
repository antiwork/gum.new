import { notFound } from "next/navigation";
import db from "@/db";

export default async function Page({ params }: { params: { id: string } }) {
  const version = await db.query.versions.findFirst({
    where: (versions, { eq }) => eq(versions.gumId, params.id),
    orderBy: (versions, { desc }) => [desc(versions.id)],
  });

  if (!version) {
    notFound();
  }

  return (
    <div
      className="w-full min-h-screen p-4 text-lg font-normal bg-[#f4f4f0] dark:bg-black dark:text-white"
      dangerouslySetInnerHTML={{ __html: version.html }}
    />
  );
}
