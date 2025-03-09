"use server";

import { signOut } from "@/auth";
import type { FormState } from "@/types/formState";

export async function logOut(): Promise<FormState> {
  try {
    await signOut({ redirect: false });
    return {
      isSuccess: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Failed to log out. Please try again.",
    };
  }
}
