-- CreateTable
CREATE TABLE "TagUrl" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "parent" TEXT NOT NULL,
    "order_number" REAL NOT NULL,
    "search_en" TEXT NOT NULL,
    "search_ua" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ua" TEXT NOT NULL,
    "text_en" TEXT NOT NULL,
    "text_ua" TEXT NOT NULL
);
