import type { NextAuthConfig } from "next-auth";
import Credenials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/authSchemas";
import { db } from "./db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credenials({
      async authorize(credentials) {
        const validationResult = loginSchema.safeParse(credentials);

        if (validationResult.success) {
          const { username, password } = validationResult.data;

          const user = await db.user.findUnique({
            where: {
              username,
            },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
