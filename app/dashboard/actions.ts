"use server";

import db from "@/db";
import { gums } from "@/db/schema";
import { sql } from "drizzle-orm";
import { clickhouse } from "@/lib/clickhouse";

export interface GumStat {
  date: string;
  gums: number;
  users: number;
}

export interface GumViewStat {
  date: string;
  views: number;
}

export async function getGumCreationStats(): Promise<GumStat[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const stats = await db
    .select({
      date: sql<string>`to_char(DATE("created_at"), 'Mon DD')`,
      gums: sql<number>`count(*)`,
      users: sql<number>`count(distinct "user_id")`,
    })
    .from(gums)
    .where(sql`DATE("created_at") >= ${sevenDaysAgo}`)
    .groupBy(sql`DATE("created_at")`)
    .orderBy(sql`DATE("created_at")`);

  return stats;
}

export async function getGumViewStats(): Promise<GumViewStat[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  try {
    const result = await clickhouse.query({
      query: `
        SELECT 
          formatDateTime(toDate(timestamp), '%b %d') as date,
          count(*) as views
        FROM gum_views
        WHERE toDate(timestamp) >= toDate(?)
        GROUP BY toDate(timestamp)
        ORDER BY toDate(timestamp)
      `,
      query_params: { params: [sevenDaysAgo.toISOString()] },
    });

    const rawData = await result.json();
    // Transform the raw data into the expected format
    return Array.isArray(rawData) 
      ? rawData.map((item: any) => ({ date: item.date, views: item.views }))
      : rawData.data?.map((item: any) => ({ date: item.date, views: item.views })) || [];
  } catch (error) {
    console.error("Error fetching gum view stats:", error);
    return [];
  }
}
