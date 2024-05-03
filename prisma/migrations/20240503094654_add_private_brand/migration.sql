-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
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
    "updatedAt" DATETIME
);
INSERT INTO "new_Brand" ("active", "id", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "tags", "text_en", "text_ua", "title_en", "title_ua", "updatedAt", "url") SELECT "active", "id", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "tags", "text_en", "text_ua", "title_en", "title_ua", "updatedAt", "url" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
CREATE UNIQUE INDEX "Brand_url_key" ON "Brand"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
