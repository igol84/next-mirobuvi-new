/*
  Warnings:

  - Made the column `test` on table `Brand` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ua" TEXT NOT NULL,
    "meta_desc_en" TEXT NOT NULL,
    "meta_desc_ua" TEXT NOT NULL,
    "text_ua" TEXT NOT NULL,
    "text_en" TEXT NOT NULL,
    "test" TEXT NOT NULL
);
INSERT INTO "new_Brand" ("active", "id", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "tags", "test", "text_en", "text_ua", "title_en", "title_ua", "url") SELECT "active", "id", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "tags", "test", "text_en", "text_ua", "title_en", "title_ua", "url" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
