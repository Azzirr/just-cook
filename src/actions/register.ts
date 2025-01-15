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
      errors: parsed.error?.errors.map((error) => error.message),
      fields: extractFieldsFromFormData(data),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });
  const existingUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (existingEmail) {
    return {
      fields: extractFieldsFromFormData(data),
      message: "Email is already in use",
      isSuccess: false,
    };
  }

  if (existingUsername) {
    return {
      fields: extractFieldsFromFormData(data),
      message: "Username is already in use",
      isSuccess: false,
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
    isSuccess: true,
  };
}
