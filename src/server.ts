import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import { checkSupabaseConnection } from "./config/supabase.config";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

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
