/*
  Warnings:

  - You are about to drop the column `vehicle_user_id` on the `order_service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_service" DROP CONSTRAINT "order_service_vehicle_user_id_fkey";

-- AlterTable
ALTER TABLE "order_service" DROP COLUMN "vehicle_user_id";

-- CreateTable
CREATE TABLE "vehicle_user_order_service" (
    "id" UUID NOT NULL,
    "vehicle_user_id" UUID NOT NULL,
    "order_service_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_user_order_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicle_user_order_service" ADD CONSTRAINT "vehicle_user_order_service_vehicle_user_id_fkey" FOREIGN KEY ("vehicle_user_id") REFERENCES "vehicle_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_user_order_service" ADD CONSTRAINT "vehicle_user_order_service_order_service_id_fkey" FOREIGN KEY ("order_service_id") REFERENCES "order_service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
