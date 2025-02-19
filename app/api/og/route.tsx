import Logo from "@/app/components/Logo";
import { ImageResponse } from "next/og";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?text=${encodeURIComponent(text)}&family=${font}:wght@600`;
  console.log(url);
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    console.log(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Logo useTailwind={false} sizeMultiplier={3} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Arimo",
          data: await loadGoogleFont("Arimo", ".new"),
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
