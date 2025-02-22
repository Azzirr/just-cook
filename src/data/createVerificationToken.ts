import { db } from "@/db";

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const createVerificationToken = async (userId: string) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      verificationToken: true,
    },
  });

  if (user?.verificationToken) {
    const hasTokenExpired =
      new Date() > new Date(user.verificationToken.expires);

    if (hasTokenExpired) {
      await db.verificationToken.delete({
        where: { id: user.verificationToken.id },
      });
    } else {
      return user.verificationToken;
    }
  }

  return await db.verificationToken.create({
    data: {
      userId: userId,
      token: crypto.randomUUID(),
      expires: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
    },
  });
};
