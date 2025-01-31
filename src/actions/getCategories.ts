"use server";

import { db } from "@/db";

export async function getCategories() {
  return await db.recipeCategory.findMany();
}
