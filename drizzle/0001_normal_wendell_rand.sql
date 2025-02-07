CREATE TABLE "versions" (
	"id" text PRIMARY KEY NOT NULL,
	"html" text NOT NULL,
	"prompt" text NOT NULL,
	"gum_id" text NOT NULL,
	"parent_id" text
);
--> statement-breakpoint
ALTER TABLE "versions" ADD CONSTRAINT "versions_gum_id_gums_id_fk" FOREIGN KEY ("gum_id") REFERENCES "public"."gums"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "versions" ADD CONSTRAINT "fk_versions_parent" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_parent_id" ON "versions" USING btree ("parent_id");