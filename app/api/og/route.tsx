import { ImageResponse } from "next/og";
import { join } from "path";
import { readFileSync } from "fs";

export async function GET() {
  const imageData = readFileSync(join(process.cwd(), "public", "logo.png"));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "40px",
          backgroundColor: "#F4F4EF",
        }}
      >
        <img
          src={`data:image/png;base64,${imageData.toString("base64")}`}
          alt="Logo"
          style={{
            width: "33%",
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
