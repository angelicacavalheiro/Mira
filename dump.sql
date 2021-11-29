CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"adress" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "galeries" (
	"id" serial NOT NULL,
	"galery_name" varchar(255) NOT NULL,
	"adress" TEXT NOT NULL,
	"phone_number" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "galeries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "artists" (
	"id" serial NOT NULL,
	"artist_name" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"photo" TEXT NOT NULL,
	CONSTRAINT "artists_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "arts" (
	"id" serial NOT NULL,
	"art_name" varchar(255) NOT NULL,
	"artist_id" integer NOT NULL,
	"art_category_id" integer NOT NULL,
	"size" TEXT NOT NULL,
	CONSTRAINT "arts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "art_category" (
	"id" serial NOT NULL,
	"category_name" varchar(255) NOT NULL,
	CONSTRAINT "art_category_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stock" (
	"id" serial NOT NULL,
	"art_id" integer NOT NULL,
	"galery_id" integer NOT NULL,
	"price" DECIMAL NOT NULL,
	"quantity" integer NOT NULL,
	"update_date" DATE NOT NULL,
	"art_photo" TEXT NOT NULL,
	CONSTRAINT "stock_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transactions" (
	"id" serial NOT NULL,
	"art_stock_id" integer NOT NULL,
	"carrier_quantity" integer NOT NULL,
	"user_id" integer,
	"status_id" integer NOT NULL,
	"upadate_status_date" DATE NOT NULL,
	CONSTRAINT "transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "status" (
	"id" serial NOT NULL,
	"status_name" varchar(255) NOT NULL,
	CONSTRAINT "status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");



ALTER TABLE "arts" ADD CONSTRAINT "arts_fk0" FOREIGN KEY ("artist_id") REFERENCES "artists"("id");
ALTER TABLE "arts" ADD CONSTRAINT "arts_fk1" FOREIGN KEY ("art_category_id") REFERENCES "art_category"("id");


ALTER TABLE "stock" ADD CONSTRAINT "stock_fk0" FOREIGN KEY ("art_id") REFERENCES "arts"("id");
ALTER TABLE "stock" ADD CONSTRAINT "stock_fk1" FOREIGN KEY ("galery_id") REFERENCES "galeries"("id");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("art_stock_id") REFERENCES "stock"("id");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk2" FOREIGN KEY ("status_id") REFERENCES "status"("id");