import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

interface Task {
  id: string;
  title: string;
  projectId: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: string;
  userId: string; 
}

const filePath = path.join(__dirname, "../data/tasks.json");


const readTasks = (): Task[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = (tasks: Task[]) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

export const createTask = (req: Request, res: Response) => {
  const { title, projectId, priority } = req.body;
  const userId = (req as any).user.id; 

  if (!title || !priority || !projectId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const tasks = readTasks();

  const newTask: Task = {
    id: uuidv4(),
    title,
    projectId,
    priority,
    status: "pending",
    createdAt: new Date().toISOString(),
    userId,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
};

export const getTasks = (req: Request, res: Response) => {
  const tasks = readTasks();
  const userId = (req as any).user.id;

  const userTasks = tasks.filter(t => t.userId === userId);

  res.json(userTasks);
};

export const updateTask = (req: Request, res: Response) => {
  const tasks = readTasks();
  const userId = (req as any).user.id;

  const task = tasks.find(t => t.id === req.params.id && t.userId === userId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  const { title, priority, status } = req.body;
  if (title) task.title = title;
  if (priority) task.priority = priority;
  if (status) task.status = status;

  writeTasks(tasks);
  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const tasks = readTasks();
  const userId = (req as any).user.id;

  const filteredTasks = tasks.filter(t => !(t.id === req.params.id && t.userId === userId));

  writeTasks(filteredTasks);
  res.json({ message: "Task deleted" });
};