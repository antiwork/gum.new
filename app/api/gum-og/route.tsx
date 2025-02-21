import Logo from "@/app/components/Logo";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const decodedTitle = decodeURIComponent(title || "").trim();
  const decodedDescription = decodeURIComponent(description || "")
    .trim()
    .replace(/[}]/g, "");
  console.log(decodedTitle, decodedDescription);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 36,
          backgroundColor: "#f4f4f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
          <Logo useTailwind={false} sizeMultiplier={3} />
        </div>
        <p style={{ fontSize: 64, fontFamily: "GeistBold", fontWeight: 600 }}>{decodedTitle}</p>
        <p style={{ fontSize: 36, color: "rgba(0, 0, 0, 0.5)", fontFamily: "Geist", fontWeight: 400 }}>
          {decodedDescription}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist", decodedDescription, 400),
          style: "normal",
        },
        {
          name: "GeistBold",
          data: await loadGoogleFont("Geist", decodedTitle, 600),
          style: "normal",
        },
      ],
    },
  );
}

async function loadGoogleFont(font: string, text: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
