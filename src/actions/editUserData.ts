"use server";
import { FormState } from "@/types/formState";
import { profileSchema } from "@/schemas/profileSchema";
import { currentSession } from "@/lib/currentSession";
import { db } from "@/db";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { z } from "zod";

export const editUserData = async (
  prevState: FormState,
  data: FormData | z.infer<typeof profileSchema>,
): Promise<FormState> => {
  const user = await currentSession();
  if (!user?.id) {
    return {
      message: "Unauthorized",
      isSuccess: false,
    };
  }

  const locale = await getLocale();

  const {
    data: parsedData,
    success,
    error,
  } = profileSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data,
  );

  if (!success) {
    return {
      errors: error?.errors.map((error) => error.message),
      message: "Invalid form data",
      isSuccess: false,
    };
  }

  const { username, firstName, avatar } = parsedData;

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
