"use server";
import { FormState } from "@/types/formState";
import { profileSchema } from "@/schemas/profileSchema";
import { currentSessionUser } from "@/lib/currentSessionUser";
import { db } from "@/db";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export const editUserData = async (
  prevState: FormState,
  data: FormData,
): Promise<FormState> => {
  const user = await currentSessionUser();
  if (!user?.id) {
    return {
      message: "Unauthorized",
      isSuccess: false,
    };
  }

  const locale = await getLocale();
  const formData = Object.fromEntries(data);
  const parsed = profileSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: parsed.error?.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, firstName, avatar } = parsed.data;

  //TODO: connect image hosting for assets
  const existingUsername = await db.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUsername) {
    return {
      message: "Username is already in use",
      isSuccess: false,
    };
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      username,
    },
  });

  redirect({
    href: `/user/${updatedUser.username}`,
    locale,
  });

  return {
    isSuccess: true,
  };
};
