"use client";

export default function Viewer({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} className="min-h-screen w-full" />;
}
