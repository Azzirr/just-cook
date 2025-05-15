import { z } from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .min(2, { message: "Comment must be at least 2 characters long." })
    .max(300, { message: "Comment cannot exceed 300 characters." })
    .trim(),
});
