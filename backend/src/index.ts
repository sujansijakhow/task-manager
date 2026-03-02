import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./auth/auth.routes";
import { protect } from "./auth/auth.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

app.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: (req as any).user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));