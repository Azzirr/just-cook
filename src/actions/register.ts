"use server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { Role } from "@prisma/client";
import { registerSchema } from "@/schemas/authSchemas";
import { FormState } from "@/types/formState";
import { extractFieldsFromFormData } from "@/utils/extractFieldsFromFormData";

export async function register(prevState: FormState, data: FormData) {
  const formData = Object.fromEntries(data);

  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
      fields: extractFieldsFromFormData(data),
      message: "Invalid form data",
      success: false,
    };
  }

  const { username, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      fields: extractFieldsFromFormData(data),
      message: "Email is already in use",
      success: false,
    };
  }

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      isActive: true,
      role: Role.USER,
    },
  });

  return {
    success: true,
  };
}
