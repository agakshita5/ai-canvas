import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function uploadGeneratedImage(imageBase64: string) {
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      resource_type: 'image',
    }
  );

  return {
    imageUrl: result.secure_url,
    publicId: result.public_id,
  };
}