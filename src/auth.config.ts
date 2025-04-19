import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "./db";
import { loginSchema } from "./schemas/authSchemas";

export default {
  providers: [
    Credentials({
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
