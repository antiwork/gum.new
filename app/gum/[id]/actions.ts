import { headers } from "next/headers";
import { trackGumView } from "@/lib/analytics";

export async function trackView(gumId: string, userId?: string) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  try {
    await trackGumView(gumId, userId, ip, userAgent);
  } catch (error) {
    console.error("Failed to track view:", error);
  }
}
