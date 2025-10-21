CREATE TABLE "gum_views" (
	"id" text PRIMARY KEY NOT NULL,
	"gum_id" text NOT NULL,
	"user_id" text,
	"timestamp" timestamp(3) DEFAULT now() NOT NULL,
	"ip" text,
	"user_agent" text
);
--> statement-breakpoint
ALTER TABLE "gum_views" ADD CONSTRAINT "gum_views_gum_id_gums_id_fk" FOREIGN KEY ("gum_id") REFERENCES "public"."gums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gum_views" ADD CONSTRAINT "gum_views_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_gum_views_gum_id" ON "gum_views" USING btree ("gum_id");--> statement-breakpoint
CREATE INDEX "idx_gum_views_timestamp" ON "gum_views" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_gum_views_user_id" ON "gum_views" USING btree ("user_id");
