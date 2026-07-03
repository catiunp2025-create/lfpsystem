/*
  Warnings:

  - The values [WAITING_ASSIGN] on the enum `OrderServiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderServiceStatus_new" AS ENUM ('AVAILABLE', 'FINISHED');
ALTER TABLE "order_service" ALTER COLUMN "status" TYPE "OrderServiceStatus_new" USING ("status"::text::"OrderServiceStatus_new");
ALTER TYPE "OrderServiceStatus" RENAME TO "OrderServiceStatus_old";
ALTER TYPE "OrderServiceStatus_new" RENAME TO "OrderServiceStatus";
DROP TYPE "OrderServiceStatus_old";
COMMIT;
