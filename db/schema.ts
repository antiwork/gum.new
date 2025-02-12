import { pgTable, text, timestamp, index, foreignKey } from "drizzle-orm/pg-core";
import cuid from "cuid";

export const gums = pgTable("gums", {
  id: text().primaryKey().notNull().$defaultFn(cuid),
  title: text().notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const versions = pgTable(
  "versions",
  {
    id: text().primaryKey().notNull().$defaultFn(cuid),
    html: text().notNull(),
    prompt: text().notNull(),
    gumId: text("gum_id")
      .notNull()
      .references(() => gums.id),
    parentId: text("parent_id"),
  },
  (table) => [
    index("idx_parent_id").on(table.parentId),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "fk_versions_parent",
    }),
  ],
);
