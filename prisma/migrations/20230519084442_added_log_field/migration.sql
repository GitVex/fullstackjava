-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" TEXT[],

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
