import Logo from "@/app/components/Logo";
import { ImageResponse } from "next/og";

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
    },
  );
}
