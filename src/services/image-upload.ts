import axios from 'axios';

export async function ImageUpload(image: File) {
  try {
    const data = new FormData();
    data.append('file', image);
    data.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_APP_CLOUD_FOLDER as string
    ); 
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_APP_CLOUD_NAME}/image/upload`, // Replace
      data
    );
    return res.data;
  } catch (err) {
    console.error('Upload error:', err);
  }
}
