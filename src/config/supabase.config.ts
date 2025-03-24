import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase credentials. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const STORAGE_BUCKET_NAME = "items-media"; // Create this bucket in your Supabase dashboard
