import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes";
import mediaRoutes from "./routes/media.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", itemRoutes);
app.use("/api", mediaRoutes);

export default app;
