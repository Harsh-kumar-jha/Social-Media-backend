import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECREAT,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log(`File is uploaded on cloudinary `, response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(`Error occur while uploading file on cloudinary : ${error}`);
    return null;
  }
};

export { uploadOnCloudinary };
