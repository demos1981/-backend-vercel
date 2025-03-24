import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

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
export const STORAGE_BUCKET_NAME = "items-media";

// Helper function to check Supabase connection
export const checkSupabaseConnection = async () => {
  try {
    // Test the connection by checking if we can access the storage bucket
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Supabase storage connection error:", error);
      return false;
    }

    // Check if our required bucket exists
    const hasRequiredBucket = buckets.some(
      (bucket) => bucket.name === STORAGE_BUCKET_NAME
    );
    if (!hasRequiredBucket) {
      console.error(
        `Required storage bucket "${STORAGE_BUCKET_NAME}" not found`
      );
      return false;
    }

    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return false;
  }
};
