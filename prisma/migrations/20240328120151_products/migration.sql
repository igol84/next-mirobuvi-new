/*
  Warnings:

  - Added the required column `is_available` to the `Shoes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_available" BOOLEAN NOT NULL,
    "size" REAL NOT NULL,
    "length" REAL NOT NULL,
    "price" REAL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Shoes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Shoes" ("id", "length", "price", "product_id", "size") SELECT "id", "length", "price", "product_id", "size" FROM "Shoes";
DROP TABLE "Shoes";
ALTER TABLE "new_Shoes" RENAME TO "Shoes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
