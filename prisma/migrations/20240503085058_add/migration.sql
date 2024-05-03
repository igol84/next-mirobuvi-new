-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TagUrl" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "parent" TEXT NOT NULL,
    "order_number" REAL NOT NULL,
    "search_en" TEXT NOT NULL,
    "search_ua" TEXT NOT NULL,
    "title_en" TEXT NOT NULL DEFAULT '',
    "title_ua" TEXT NOT NULL DEFAULT '',
    "desc_en" TEXT NOT NULL,
    "desc_ua" TEXT NOT NULL,
    "text_en" TEXT NOT NULL,
    "text_ua" TEXT NOT NULL
);
INSERT INTO "new_TagUrl" ("desc_en", "desc_ua", "order_number", "parent", "search_en", "search_ua", "text_en", "text_ua", "title_en", "title_ua", "url") SELECT "desc_en", "desc_ua", "order_number", "parent", "search_en", "search_ua", "text_en", "text_ua", coalesce("title_en", '') AS "title_en", coalesce("title_ua", '') AS "title_ua", "url" FROM "TagUrl";
DROP TABLE "TagUrl";
ALTER TABLE "new_TagUrl" RENAME TO "TagUrl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
