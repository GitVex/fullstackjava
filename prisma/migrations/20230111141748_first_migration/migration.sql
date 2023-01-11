-- CreateTable
CREATE TABLE "track" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secondsDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platform" TEXT NOT NULL,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_tagTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_presetTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "track_url_key" ON "track"("url");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_tagTotrack_AB_unique" ON "_tagTotrack"("A", "B");

-- CreateIndex
CREATE INDEX "_tagTotrack_B_index" ON "_tagTotrack"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_presetTotrack_AB_unique" ON "_presetTotrack"("A", "B");

-- CreateIndex
CREATE INDEX "_presetTotrack_B_index" ON "_presetTotrack"("B");

-- AddForeignKey
ALTER TABLE "_tagTotrack" ADD CONSTRAINT "_tagTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tagTotrack" ADD CONSTRAINT "_tagTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_presetTotrack" ADD CONSTRAINT "_presetTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "preset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_presetTotrack" ADD CONSTRAINT "_presetTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
