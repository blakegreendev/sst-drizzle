CREATE TABLE IF NOT EXISTS "tblcounter" (
	"counter" text PRIMARY KEY DEFAULT 'hits' NOT NULL,
	"tally" integer DEFAULT 0
);
