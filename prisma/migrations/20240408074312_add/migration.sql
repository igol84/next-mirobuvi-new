-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "private" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "is_available" BOOLEAN,
    "tags" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ua" TEXT NOT NULL,
    "meta_desc_en" TEXT NOT NULL,
    "meta_desc_ua" TEXT NOT NULL,
    "text_ua" TEXT NOT NULL DEFAULT '',
    "text_en" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "old_price" REAL NOT NULL,
    "prom_active" BOOLEAN NOT NULL,
    "prom_add_to_id" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "brand_id", "color", "date", "id", "is_available", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "old_price", "price", "private", "prom_active", "prom_add_to_id", "season", "tags", "title_en", "title_ua", "type", "url") SELECT "active", "brand_id", "color", "date", "id", "is_available", "meta_desc_en", "meta_desc_ua", "name_en", "name_ua", "old_price", "price", "private", "prom_active", "prom_add_to_id", "season", "tags", "title_en", "title_ua", "type", "url" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
