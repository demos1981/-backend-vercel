import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { checkSupabaseConnection } from "./config/supabase.config";
import app from "./app";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

const PORT = process.env.SUPABASE_PORT || 5000;

// Initialize database and start server
AppDataSource.initialize()
  .then(async () => {
    // Check Supabase connection
    const isSupabaseConnected = await checkSupabaseConnection();
    if (!isSupabaseConnected) {
      console.error("Failed to connect to Supabase");
      process.exit(1);
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });
