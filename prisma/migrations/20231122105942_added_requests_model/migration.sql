-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'PROGRESS', 'FAILED');

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status",
    "createdById" INTEGER NOT NULL,
    "assignedToId" INTEGER,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
