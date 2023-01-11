PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           TIMESTAMP,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        TIMESTAMP,
    "started_at"            TIMESTAMP NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('90175ce8-38bc-4e87-b7df-50dcffdad1c7','123f1f1cabfa3285ae79418b5fd5a2785e800da0806eb4c6005ec6c2fffc8b5d',1671291625143,'20221216211532_init',NULL,NULL,1671291624512,1);
INSERT INTO _prisma_migrations VALUES('3cec92f2-6b29-4ca6-9e68-60f8c1a5f354','ad5732f067a737844fbb20fe8ef1826b88062cc9b581c1f148c8cfefe0bd74d8',1671291625370,'20221217153832_made_tagname_unique',NULL,NULL,1671291625193,1);
CREATE TABLE IF NOT EXISTS "track" (
    "id" SERIES NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secondsDuration" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "platform" TEXT NOT NULL
);
INSERT INTO track VALUES(9,'💨 Winter Storm Ambience with Icy Howling Wind Sounds for Sleeping, Relaxing and Studying Background.','Relaxing Soundzzz','https://www.youtube.com/watch?v=sGkh1W5cbH4',NULL,1671467907790,1671467907790,'YouTube');
INSERT INTO track VALUES(10,'10 HR | HOWLING WIND sounds for sleeping & relaxation | Dark Screen | Black Screen','Very Ambient','https://www.youtube.com/watch?v=a9VLbKrsuro',NULL,1671467972198,1671467972198,'YouTube');
INSERT INTO track VALUES(11,'Rumbling Thunder & Wind Sounds For Sleeping, Relaxing ~ Thunderstorm Rain Storm Rumble Ambience','Sounds4Sleeping','https://www.youtube.com/watch?v=fkFiIhDR_nc',NULL,1671468037935,1671468037935,'YouTube');
INSERT INTO track VALUES(12,'Eternal Adagios for Orchestra','Brilliant Classics','https://youtu.be/qybUS98QpaA',NULL,1671468110750,1671468110750,'YouTube');
INSERT INTO track VALUES(13,'Tchaikovsky: Symphony no. 1 ''Winter Daydreams'' (Antal Dorati,  London Symphony Orchestra)','Ipacyz','https://www.youtube.com/watch?v=GVzPedNMr6U',NULL,1671468145256,1671468145256,'YouTube');
INSERT INTO track VALUES(14,'Intense Winter Storm at the Lake┇Howling Wind & Blowing Snow ┇Sounds for Sleep, Study & Relaxation','DOVADO','https://www.youtube.com/watch?v=TIycpvvmI1U',NULL,1671647293444,1671647293444,'YouTube');
INSERT INTO track VALUES(15,'D&D Ambience - Town Square Daytime','Sword Coast Soundscapes','https://www.youtube.com/watch?v=NeOg8iCFfTA',NULL,1671729300339,1671729300339,'YouTube');
INSERT INTO track VALUES(16,'D&D Ambience - Coastal Town','Sword Coast Soundscapes','https://www.youtube.com/watch?v=CY97XoaEjFg',NULL,1673344120955,1673344120955,'YouTube');
INSERT INTO track VALUES(17,'Medieval Harbor | Medieval Ambience | 1 Hour #dnd','Michael Ghelfi Studios','https://www.youtube.com/watch?v=t0AmfPQMs4k',NULL,1673344164652,1673344164652,'YouTube');
INSERT INTO track VALUES(18,'Harbor Sounds | Seaside Market Ambience | 1 Hour ⚓','The Guild of Ambience','https://www.youtube.com/watch?v=frEJTGfLOhM',NULL,1673344203787,1673344203787,'YouTube');
INSERT INTO track VALUES(19,'Fantasy Medieval Town Ambience | 45 minutes','The Guild of Ambience','https://www.youtube.com/watch?v=ugLwYV1GSvo',NULL,1673345105327,1673345105327,'YouTube');
INSERT INTO track VALUES(20,'10 hours | Medieval City Ambience | Backround Sounds | ASMR, Study, Fairytale','Epic Ambience','https://www.youtube.com/watch?v=ORsxCDaPtrc',NULL,1673345140806,1673345140806,'YouTube');
INSERT INTO track VALUES(21,'Bustling Town Ambience - Medieval City Music','Atmosphere Ambience','https://www.youtube.com/watch?v=eCMO-LpKsU8',NULL,1673347105224,1673347105224,'YouTube');
INSERT INTO track VALUES(22,'D&D Ambience - Evening Town','Sword Coast Soundscapes','https://www.youtube.com/watch?v=bSbYpFMNxLI',NULL,1673347170226,1673347170226,'YouTube');
INSERT INTO track VALUES(23,'Construction Site | Medieval, Workers, Citylife Ambience | 1 Hour #dnd','Michael Ghelfi Studios','https://www.youtube.com/watch?v=Ly9Ci1lTAnY',NULL,1673347238088,1673347238088,'YouTube');
INSERT INTO track VALUES(24,'D&D Ambience - Small Marketplace','Sword Coast Soundscapes','https://www.youtube.com/watch?v=x2UulCWGess',NULL,1673347282981,1673347282981,'YouTube');
INSERT INTO track VALUES(25,'D&D Ambience - Dockside Market','Sword Coast Soundscapes','https://www.youtube.com/watch?v=YZkFjWJVt6c',NULL,1673347306337,1673347306337,'YouTube');
INSERT INTO track VALUES(26,'Trading Post | Western Ambience | 1 Hour','Michael Ghelfi Studios','https://www.youtube.com/watch?v=JN8nj2-7G34',NULL,1673347344802,1673347344802,'YouTube');
INSERT INTO track VALUES(27,'D&D Ambience - [NeverWinter Series] - Docks','Sword Coast Soundscapes','https://www.youtube.com/watch?v=35H1tJ-VUQ8',NULL,1673347380511,1673347380511,'YouTube');
INSERT INTO track VALUES(28,'D&D Ambience - [PHA] - Phandalin Streets','Sword Coast Soundscapes','https://www.youtube.com/watch?v=pOPLDhKn9cg',NULL,1673347404499,1673347404499,'YouTube');
INSERT INTO track VALUES(29,'Dark Elves City | Menzoberranzan | ASMR Ambience | 1 Hour','Michael Ghelfi Studios','https://www.youtube.com/watch?v=Jtz57E2seZY',NULL,1673347472542,1673347472542,'YouTube');
INSERT INTO track VALUES(30,'Dwarf City Sounds Underground City Sounds Fantasy Ambience Sounds','Fantasy Realm','https://www.youtube.com/watch?v=XEGlUUst3ko',NULL,1673347513392,1673347513392,'YouTube');
CREATE TABLE IF NOT EXISTS "tag" (
    "id" SERIES NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);
INSERT INTO tag VALUES(1,'ambience',1671467907790,1671471667461);
INSERT INTO tag VALUES(2,'music',1671468110750,1671471667461);
INSERT INTO tag VALUES(3,'standalone',1671730270697,1671730277173);
INSERT INTO tag VALUES(23,'storm',1671467907790,1671467907790);
INSERT INTO tag VALUES(24,'snow',1671467907790,1671467907790);
INSERT INTO tag VALUES(25,'wind',1671467907790,1671467907790);
INSERT INTO tag VALUES(26,'over1hour',1671467907790,1671467907790);
INSERT INTO tag VALUES(27,'cold',1671467907790,1671467907790);
INSERT INTO tag VALUES(28,'thunder',1671468037935,1671468037935);
INSERT INTO tag VALUES(30,'orchestra',1671468110750,1671468110750);
INSERT INTO tag VALUES(31,'compilation',1671468110750,1671468110750);
INSERT INTO tag VALUES(32,'Tchaikovsky',1671468145256,1671468145256);
INSERT INTO tag VALUES(33,'town',1671729300339,1671729300339);
INSERT INTO tag VALUES(34,'bustling',1671729300339,1671729300339);
INSERT INTO tag VALUES(35,'coastal',1673344120955,1673344120955);
INSERT INTO tag VALUES(36,'docks',1673344120955,1673344120955);
INSERT INTO tag VALUES(37,'1hour',1673344164652,1673344164652);
INSERT INTO tag VALUES(38,'market',1673344203787,1673344203787);
INSERT INTO tag VALUES(39,'under1hour',1673345105327,1673345105327);
INSERT INTO tag VALUES(40,'city',1673347105224,1673347105224);
INSERT INTO tag VALUES(41,'night',1673347170226,1673347170226);
INSERT INTO tag VALUES(42,'slow',1673347170226,1673347170226);
INSERT INTO tag VALUES(43,'construction',1673347238088,1673347238088);
INSERT INTO tag VALUES(44,'background',1673347238088,1673347238088);
INSERT INTO tag VALUES(45,'village',1673347282981,1673347282981);
INSERT INTO tag VALUES(46,'busy',1673347282981,1673347282981);
INSERT INTO tag VALUES(47,'desert',1673347344802,1673347344802);
INSERT INTO tag VALUES(48,'western',1673347344802,1673347344802);
INSERT INTO tag VALUES(49,'streets',1673347404499,1673347404499);
INSERT INTO tag VALUES(50,'dark',1673347472542,1673347472542);
INSERT INTO tag VALUES(51,'elves',1673347472542,1673347472542);
INSERT INTO tag VALUES(52,'underground',1673347513392,1673347513392);
INSERT INTO tag VALUES(53,'dwarves',1673347513392,1673347513392);
INSERT INTO tag VALUES(54,'industry',1673347513392,1673347513392);
CREATE TABLE IF NOT EXISTS "preset" (
    "id" SERIES NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS "_tagTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_tagTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_tagTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO _tagTotrack VALUES(1,9);
INSERT INTO _tagTotrack VALUES(23,9);
INSERT INTO _tagTotrack VALUES(24,9);
INSERT INTO _tagTotrack VALUES(25,9);
INSERT INTO _tagTotrack VALUES(26,9);
INSERT INTO _tagTotrack VALUES(27,9);
INSERT INTO _tagTotrack VALUES(1,10);
INSERT INTO _tagTotrack VALUES(23,10);
INSERT INTO _tagTotrack VALUES(25,10);
INSERT INTO _tagTotrack VALUES(26,10);
INSERT INTO _tagTotrack VALUES(1,11);
INSERT INTO _tagTotrack VALUES(23,11);
INSERT INTO _tagTotrack VALUES(26,11);
INSERT INTO _tagTotrack VALUES(28,11);
INSERT INTO _tagTotrack VALUES(2,12);
INSERT INTO _tagTotrack VALUES(30,12);
INSERT INTO _tagTotrack VALUES(31,12);
INSERT INTO _tagTotrack VALUES(26,12);
INSERT INTO _tagTotrack VALUES(2,13);
INSERT INTO _tagTotrack VALUES(30,13);
INSERT INTO _tagTotrack VALUES(32,13);
INSERT INTO _tagTotrack VALUES(1,14);
INSERT INTO _tagTotrack VALUES(25,14);
INSERT INTO _tagTotrack VALUES(24,14);
INSERT INTO _tagTotrack VALUES(27,14);
INSERT INTO _tagTotrack VALUES(23,14);
INSERT INTO _tagTotrack VALUES(1,15);
INSERT INTO _tagTotrack VALUES(33,15);
INSERT INTO _tagTotrack VALUES(34,15);
INSERT INTO _tagTotrack VALUES(26,15);
INSERT INTO _tagTotrack VALUES(1,16);
INSERT INTO _tagTotrack VALUES(35,16);
INSERT INTO _tagTotrack VALUES(33,16);
INSERT INTO _tagTotrack VALUES(26,16);
INSERT INTO _tagTotrack VALUES(36,16);
INSERT INTO _tagTotrack VALUES(1,17);
INSERT INTO _tagTotrack VALUES(35,17);
INSERT INTO _tagTotrack VALUES(33,17);
INSERT INTO _tagTotrack VALUES(37,17);
INSERT INTO _tagTotrack VALUES(36,17);
INSERT INTO _tagTotrack VALUES(1,18);
INSERT INTO _tagTotrack VALUES(35,18);
INSERT INTO _tagTotrack VALUES(33,18);
INSERT INTO _tagTotrack VALUES(37,18);
INSERT INTO _tagTotrack VALUES(36,18);
INSERT INTO _tagTotrack VALUES(34,18);
INSERT INTO _tagTotrack VALUES(38,18);
INSERT INTO _tagTotrack VALUES(1,19);
INSERT INTO _tagTotrack VALUES(33,19);
INSERT INTO _tagTotrack VALUES(39,19);
INSERT INTO _tagTotrack VALUES(34,19);
INSERT INTO _tagTotrack VALUES(38,19);
INSERT INTO _tagTotrack VALUES(1,20);
INSERT INTO _tagTotrack VALUES(33,20);
INSERT INTO _tagTotrack VALUES(26,20);
INSERT INTO _tagTotrack VALUES(1,21);
INSERT INTO _tagTotrack VALUES(40,21);
INSERT INTO _tagTotrack VALUES(34,21);
INSERT INTO _tagTotrack VALUES(37,21);
INSERT INTO _tagTotrack VALUES(1,22);
INSERT INTO _tagTotrack VALUES(41,22);
INSERT INTO _tagTotrack VALUES(33,22);
INSERT INTO _tagTotrack VALUES(42,22);
INSERT INTO _tagTotrack VALUES(1,23);
INSERT INTO _tagTotrack VALUES(43,23);
INSERT INTO _tagTotrack VALUES(37,23);
INSERT INTO _tagTotrack VALUES(44,23);
INSERT INTO _tagTotrack VALUES(1,24);
INSERT INTO _tagTotrack VALUES(45,24);
INSERT INTO _tagTotrack VALUES(38,24);
INSERT INTO _tagTotrack VALUES(46,24);
INSERT INTO _tagTotrack VALUES(26,24);
INSERT INTO _tagTotrack VALUES(1,25);
INSERT INTO _tagTotrack VALUES(45,25);
INSERT INTO _tagTotrack VALUES(38,25);
INSERT INTO _tagTotrack VALUES(46,25);
INSERT INTO _tagTotrack VALUES(26,25);
INSERT INTO _tagTotrack VALUES(35,25);
INSERT INTO _tagTotrack VALUES(36,25);
INSERT INTO _tagTotrack VALUES(1,26);
INSERT INTO _tagTotrack VALUES(45,26);
INSERT INTO _tagTotrack VALUES(38,26);
INSERT INTO _tagTotrack VALUES(37,26);
INSERT INTO _tagTotrack VALUES(47,26);
INSERT INTO _tagTotrack VALUES(48,26);
INSERT INTO _tagTotrack VALUES(1,27);
INSERT INTO _tagTotrack VALUES(45,27);
INSERT INTO _tagTotrack VALUES(38,27);
INSERT INTO _tagTotrack VALUES(36,27);
INSERT INTO _tagTotrack VALUES(26,27);
INSERT INTO _tagTotrack VALUES(46,27);
INSERT INTO _tagTotrack VALUES(1,28);
INSERT INTO _tagTotrack VALUES(45,28);
INSERT INTO _tagTotrack VALUES(49,28);
INSERT INTO _tagTotrack VALUES(26,28);
INSERT INTO _tagTotrack VALUES(46,28);
INSERT INTO _tagTotrack VALUES(1,29);
INSERT INTO _tagTotrack VALUES(40,29);
INSERT INTO _tagTotrack VALUES(37,29);
INSERT INTO _tagTotrack VALUES(50,29);
INSERT INTO _tagTotrack VALUES(51,29);
INSERT INTO _tagTotrack VALUES(1,30);
INSERT INTO _tagTotrack VALUES(40,30);
INSERT INTO _tagTotrack VALUES(37,30);
INSERT INTO _tagTotrack VALUES(52,30);
INSERT INTO _tagTotrack VALUES(53,30);
INSERT INTO _tagTotrack VALUES(54,30);
CREATE TABLE IF NOT EXISTS "_presetTotrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_presetTotrack_A_fkey" FOREIGN KEY ("A") REFERENCES "preset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_presetTotrack_B_fkey" FOREIGN KEY ("B") REFERENCES "track" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('track',30);
INSERT INTO sqlite_sequence VALUES('tag',54);
CREATE UNIQUE INDEX "track_url_key" ON "track"("url");
CREATE UNIQUE INDEX "_tagTotrack_AB_unique" ON "_tagTotrack"("A", "B");
CREATE INDEX "_tagTotrack_B_index" ON "_tagTotrack"("B");
CREATE UNIQUE INDEX "_presetTotrack_AB_unique" ON "_presetTotrack"("A", "B");
CREATE INDEX "_presetTotrack_B_index" ON "_presetTotrack"("B");
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
COMMIT;
