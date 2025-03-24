import { supabase, STORAGE_BUCKET_NAME } from "../config/supabase.config";

export class StorageService {
  /**
   * Uploads a file to Supabase storage
   * @param file - The file to upload
   * @param itemId - The ID of the item this file belongs to
   * @returns Promise<string> - The public URL of the uploaded file
   */
  async uploadFile(file: Express.Multer.File, itemId: number): Promise<string> {
    try {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `${itemId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      await supabase.storage
        .from(STORAGE_BUCKET_NAME)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      const {
        data: { publicUrl },
      } = supabase.storage.from(STORAGE_BUCKET_NAME).getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Deletes a file from Supabase storage
   * @param fileUrl - The public URL of the file to delete
   * @returns Promise<void>
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const filePath = fileUrl.split("/").pop();
      if (!filePath) {
        throw new Error("Invalid file URL");
      }

      await supabase.storage.from(STORAGE_BUCKET_NAME).remove([filePath]);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  }
}
