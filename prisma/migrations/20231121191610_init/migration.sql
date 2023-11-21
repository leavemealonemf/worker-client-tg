-- CreateEnum
CREATE TYPE "Role" AS ENUM ('WORKER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WORKER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
