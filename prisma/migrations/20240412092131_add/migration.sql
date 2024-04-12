/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brand_url_key" ON "Brand"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Product_url_key" ON "Product"("url");
