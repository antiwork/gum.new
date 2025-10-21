"use server";

import db from "@/db";
import { gums, gumViews } from "@/db/schema";
import { sql } from "drizzle-orm";

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
    const stats = await db
      .select({
        date: sql<string>`to_char(DATE("timestamp"), 'Mon DD')`,
        views: sql<number>`count(*)`,
      })
      .from(gumViews)
      .where(sql`DATE("timestamp") >= ${sevenDaysAgo}`)
      .groupBy(sql`DATE("timestamp")`)
      .orderBy(sql`DATE("timestamp")`);

    return stats;
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
    const stats = await db
      .select({
        week: sql<string>`to_char(date_trunc('week', "timestamp"), 'Mon DD') || ' - ' || to_char(date_trunc('week', "timestamp") + interval '6 days', 'Mon DD')`,
        views: sql<number>`count(*)`,
      })
      .from(gumViews)
      .groupBy(sql`date_trunc('week', "timestamp")`)
      .orderBy(sql`date_trunc('week', "timestamp")`);

    return stats;
  } catch (error) {
    console.error("Error fetching weekly gum view stats:", error);
    return [];
  }
}
