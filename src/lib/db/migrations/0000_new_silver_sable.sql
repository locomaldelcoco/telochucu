CREATE TABLE "establishments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"phone" varchar(20),
	"price_per_hour" numeric(8, 2),
	"services" jsonb DEFAULT '[]'::jsonb,
	"rating" numeric(3, 2) DEFAULT '0',
	"image_url" text,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
