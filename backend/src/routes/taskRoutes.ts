import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../auth/auth.middleware";

const router = express.Router();

// All routes protected by JWT
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;