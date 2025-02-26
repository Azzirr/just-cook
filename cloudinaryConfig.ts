import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true, // Always use HTTPS
});

export default cloudinary;
