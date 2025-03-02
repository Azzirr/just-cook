import { z } from "zod";
import { imageSchema } from "@/schemas/imageSchema";

export const profileSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters",
    }),
    avatar: imageSchema.or(z.null()).optional(),
    firstName: z.string().optional(),
  })
  .partial();
