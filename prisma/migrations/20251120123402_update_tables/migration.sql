/*
  Warnings:

  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `agreedPrice` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "agreedPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
