import { createClient } from "@clickhouse/client";

// Initialize ClickHouse client
export const clickhouse = createClient({
  url: process.env.CLICKHOUSE_URL || "https://bk200nw1zh.eastus2.azure.clickhouse.cloud:8443",
  username: process.env.CLICKHOUSE_USERNAME || "default",
  password: process.env.CLICKHOUSE_PASSWORD || "",
});

// Track a view for a gum
export async function trackGumView(gumId: string, userId?: string, ip?: string, userAgent?: string) {
  try {
    await clickhouse.insert({
      table: "gum_views",
      values: [
        {
          gum_id: gumId,
          user_id: userId || null,
          timestamp: new Date(),
          ip: ip || null,
          user_agent: userAgent || null,
        },
      ],
      format: "JSONEachRow",
    });
  } catch (error) {
    console.error("Error tracking gum view:", error);
  }
}
