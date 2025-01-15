/*
  Warnings:

  - You are about to drop the column `created_by` on the `Category` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_created_by_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "created_by",
ADD COLUMN     "creator_id" CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
