/*
  Warnings:

  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantity` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAM', 'MILLIGRAM', 'KILOGRAM', 'POUND', 'OUNCE', 'MILLILITER', 'LITER', 'CUP', 'TEASPOON', 'TABLESPOON', 'PIECE');

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "unit" "Unit" NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;
