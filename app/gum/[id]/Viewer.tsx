"use client";

export default function Viewer({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
              <script src="https://cdn.tailwindcss.com"></script>
              ${html}
            `,
      }}
    />
  );
}
