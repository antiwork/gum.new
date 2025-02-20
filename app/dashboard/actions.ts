"use server";

import db from "@/db";
import { gums } from "@/db/schema";
import { sql } from "drizzle-orm";

export interface GumStat {
  date: string;
  gums: number;
  users: number;
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
