"use client";

export default function Viewer({ html }: { html: string }) {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div dangerouslySetInnerHTML={{ __html: html }} className="min-h-screen w-full" />
    </>
  );
}
