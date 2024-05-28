-- CreateTable
CREATE TABLE "Article" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ua" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ua" TEXT NOT NULL,
    "text_en" TEXT NOT NULL,
    "text_ua" TEXT NOT NULL,
    "img" TEXT NOT NULL
);
