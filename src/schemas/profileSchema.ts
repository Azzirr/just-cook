import { z } from "zod";

const MAX_FILE_SIZE_MB = 1.5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ACCEPTED_IMAGE_FORMATS = ["jpeg", "jpg", "png", "webp"];

const avatarSchema = z
  .instanceof(File)
  .refine(
    (file) => file?.size <= MAX_FILE_SIZE_BYTES,
    `Max image size cannot exceed ${MAX_FILE_SIZE_MB}MB`,
  )
  .refine(
    (file) =>
      ACCEPTED_IMAGE_FORMATS.map((format) => `image/${format}`).includes(
        file?.type,
      ),
    `Only ${ACCEPTED_IMAGE_FORMATS.map((format) => `.${format}`).join(", ")} formats are supported.`,
  );

export const profileSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters",
    }),
    avatar: avatarSchema.or(z.null()).optional(),
    firstName: z.string().optional(),
  })
  .partial();
