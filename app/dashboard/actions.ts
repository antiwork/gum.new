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

export interface WeeklyGumStat {
  week: string;
  gums: number;
  users: number;
}

export interface WeeklyGumViewStat {
  week: string;
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
    // Modified to match the working weekly view stats query structure
    // Removed query_params and directly embedded the date in the query
    const result = await clickhouse.query({
      query: `
        SELECT 
          formatDateTime(toDate(timestamp), '%b %d') as date,
          count(*) as views
        FROM gum_views
        WHERE toDate(timestamp) >= toDate('${sevenDaysAgo.toISOString()}')
        GROUP BY toDate(timestamp)
        ORDER BY toDate(timestamp)
      `,
    });

    const rawData = await result.json();
    console.log("Daily view stats raw data:", JSON.stringify(rawData, null, 2));

    // Define proper types for the data structure
    type RawViewItem = { date: string; views: number };

    // Transform the raw data into the expected format
    if (Array.isArray(rawData)) {
      return rawData.map((item: RawViewItem) => ({
        date: item.date,
        views: item.views,
      }));
    } else if (rawData.data && Array.isArray(rawData.data)) {
      return rawData.data.map((item: unknown) => {
        const viewItem = item as RawViewItem;
        return {
          date: viewItem.date,
          views: viewItem.views,
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching gum view stats:", error);
    return [];
  }
}

export async function getWeeklyGumCreationStats(): Promise<WeeklyGumStat[]> {
  try {
    const stats = await db
      .select({
        week: sql<string>`to_char(date_trunc('week', "created_at"), 'Mon DD') || ' - ' || to_char(date_trunc('week', "created_at") + interval '6 days', 'Mon DD')`,
        gums: sql<number>`count(*)`,
        users: sql<number>`count(distinct "user_id")`,
      })
      .from(gums)
      .groupBy(sql`date_trunc('week', "created_at")`)
      .orderBy(sql`date_trunc('week', "created_at")`);

    return stats;
  } catch (error) {
    console.error("Error fetching weekly gum creation stats:", error);
    return [];
  }
}

export async function getWeeklyGumViewStats(): Promise<WeeklyGumViewStat[]> {
  try {
    const result = await clickhouse.query({
      query: `
        SELECT 
          concat(formatDateTime(toStartOfWeek(timestamp), '%b %d'), ' - ', formatDateTime(toStartOfWeek(timestamp) + interval 6 day, '%b %d')) as week,
          count(*) as views
        FROM gum_views
        GROUP BY toStartOfWeek(timestamp)
        ORDER BY toStartOfWeek(timestamp)
      `,
    });

    const rawData = await result.json();
    console.log("Weekly view stats raw data:", JSON.stringify(rawData, null, 2));

    // Define proper types for the data structure
    type RawWeeklyViewItem = { week: string; views: number };

    // Transform the raw data into the expected format
    if (Array.isArray(rawData)) {
      return rawData.map((item: RawWeeklyViewItem) => ({
        week: item.week,
        views: item.views,
      }));
    } else if (rawData.data && Array.isArray(rawData.data)) {
      return rawData.data.map((item: unknown) => {
        const viewItem = item as RawWeeklyViewItem;
        return {
          week: viewItem.week,
          views: viewItem.views,
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching weekly gum view stats:", error);
    return [];
  }
}
