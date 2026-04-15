/*
  Warnings:

  - You are about to drop the column `postCode` on the `address` table. All the data in the column will be lost.
  - Added the required column `post_code` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "postCode",
ADD COLUMN     "post_code" TEXT NOT NULL;
