-- CreateTable
CREATE TABLE "webpages" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "thumbnailUrl" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webpages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webpages_url_key" ON "webpages"("url");

-- CreateIndex
CREATE INDEX "webpages_title_idx" ON "webpages"("title");

-- CreateIndex
CREATE INDEX "webpages_url_idx" ON "webpages"("url");

-- CreateIndex
CREATE INDEX "webpages_description_idx" ON "webpages"("description");
