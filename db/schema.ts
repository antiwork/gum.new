import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import cuid from "cuid";

export const gums = pgTable("gums", {
  id: text().primaryKey().notNull().$defaultFn(cuid),
  title: text().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
