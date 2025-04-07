import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_ANON_KEY environment variable");
}

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Since this is a backend service, we don't need to persist sessions
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "x-my-custom-header": "my-app-name",
    },
  },
});

// Storage bucket configuration
export const bucketName: string = process.env.SUPABASE_BUCKET as string;

// Helper function to check Supabase connection
export const checkSupabaseConnection = async () => {
  try {
    // First, try to list buckets to check connection
    const { data: existingBuckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }

    // Check if our bucket exists
    const bucketExists = existingBuckets.some(
      (bucket) => bucket.name === bucketName
    );

    if (!bucketExists) {
      console.log(
        `Storage bucket "${bucketName}" not found. Please create it in the Supabase dashboard.`
      );
      console.log("1. Go to your Supabase project dashboard");
      console.log("2. Navigate to Storage in the left sidebar");
      console.log("3. Click 'Create a new bucket'");
      console.log(`4. Name it "${bucketName}"`);
      console.log("5. Set it as public");
      return false;
    }

    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return false;
  }
};
