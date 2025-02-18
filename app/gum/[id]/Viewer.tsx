"use client";

export default function Viewer({ html }: { html: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div dangerouslySetInnerHTML={{ __html: html }} className="min-h-screen w-full" />
    </>
  );
}
