CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "full_name" varchar,
  "email" varchar UNIQUE,
  "banking_token" varchar,
  "session_token" varchar,
  "totalSaved" int,
  "transfer_schedule" enum,
  "games" int,
  "created_at" date
);

CREATE TABLE "goals" (
  "id" int PRIMARY KEY,
  "id_user" int,
  "vice" enum,
  "streak_days" int,
  "goal_name" varchar,
  "goal_cost" int,
  "amount_saved" int,
  "relapse_count" int,
  "relapse_costTotal" int,
  "vice_freq" varchar,
  "vice_price" int
);

CREATE TABLE "vices" (
  "id" int PRIMARY KEY,
  "vice" varchar
);

CREATE TABLE "relapses" (
  "id" int PRIMARY KEY,
  "id_user" int,
  "id_goal" int,
  "day" date,
  "cost" int
);

CREATE TABLE "transactions" (
  "id" int PRIMARY KEY,
  "status" enum,
  "id_user" int,
  "name" varchar,
  "amount" int,
  "day" date
);

CREATE TABLE "games" (
  "id" int PRIMARY KEY,
  "game" varchar
);

CREATE TABLE "users_games" (
  "id" int PRIMARY KEY,
  "id_user" int,
  "id_game" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "users_games" ("id_user");

ALTER TABLE "games" ADD FOREIGN KEY ("id") REFERENCES "users_games" ("id_game");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "transactions" ("id_user");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "goals" ("id_user");

ALTER TABLE "vices" ADD FOREIGN KEY ("vice") REFERENCES "goals" ("vice");

ALTER TABLE "relapses" ADD FOREIGN KEY ("id_goal") REFERENCES "goals" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "relapses" ("id_user");