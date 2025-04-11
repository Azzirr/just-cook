"use server";
import { auth } from "@/auth";

export async function getCurrentUserId() {
  const session = await auth();
  return session?.user?.id;
}
