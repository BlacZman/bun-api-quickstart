CREATE SCHEMA "bun";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bun"."countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bun"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"country_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "countries_name_idx" ON "bun"."countries" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_name_idx" ON "bun"."users" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bun"."users" ADD CONSTRAINT "users_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "bun"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
