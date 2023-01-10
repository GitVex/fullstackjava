-- CreateTable
CREATE TABLE "track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secondsDuration" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "platform" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "preset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_tagTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_tagTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_tagTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_presetTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_presetTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "preset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_presetTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "track_url_key" ON "track"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_tagTotrack_AB_unique" ON "_tagTotrack"("A", "B");

-- CreateIndex
CREATE INDEX "_tagTotrack_B_index" ON "_tagTotrack"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_presetTotrack_AB_unique" ON "_presetTotrack"("A", "B");

-- CreateIndex
CREATE INDEX "_presetTotrack_B_index" ON "_presetTotrack"("B");
