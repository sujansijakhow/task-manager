import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  projectId: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: string;
}

let tasks: Task[] = []; 

// Create task
export const createTask = (req: Request, res: Response) => {
  const { title, projectId, priority } = req.body;

  if (!title || !priority || !projectId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    projectId,
    priority,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Get tasks (optional filter by project or status)
export const getTasks = (req: Request, res: Response) => {
  const { projectId, status } = req.query;
  let filtered = tasks;

  if (projectId) {
    filtered = filtered.filter((t) => t.projectId === projectId);
  }

  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  res.json(filtered);
};

// Update task (title, priority, status)
export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, priority, status } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title) task.title = title;
  if (priority) task.priority = priority;
  if (status) task.status = status;

  res.json(task);
};

// Delete task
export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Task deleted" });
};