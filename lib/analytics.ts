import db from "@/db";
import { gumViews } from "@/db/schema";

// Track a view for a gum
export async function trackGumView(gumId: string, userId?: string, ip?: string, userAgent?: string) {
  try {
    await db.insert(gumViews).values({
      gumId: gumId,
      userId: userId || null,
      timestamp: new Date(),
      ip: ip || null,
      userAgent: userAgent || null,
    });
  } catch (error) {
    console.error("Error tracking gum view:", error);
  }
}
