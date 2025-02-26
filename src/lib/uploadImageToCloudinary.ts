import {
  v2 as cloudinary,
  type UploadApiResponse,
  type UploadApiErrorResponse,
} from "cloudinary";

const fileToBuffer = async (image: File) => {
  const arrayBuffer = await image.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const uploadImageToCloudinary = async (
  image: File,
): Promise<UploadApiResponse> => {
  const buffer = await fileToBuffer(image);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {},
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Upload failed: No result received"));
          return;
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};
