import { z } from "zod";

const MAX_FILE_SIZE = 150000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const avatarSchema = z
  .instanceof(File)
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 1.5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported.",
  );

export const profileSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  avatar: avatarSchema.or(z.null()),
  firstName: z.string().optional(),
});
