import { Request, Response } from "express";

let tasks: any[] = [];

// CREATE TASK
export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;

  const task = {
    id: Date.now().toString(),
    title,
    completed: false,
    user: req.user?.email, 
  };

  tasks.push(task);

  res.status(201).json(task);
};

// GET TASKS
export const getTasks = (req: Request, res: Response) => {
  const userTasks = tasks.filter(
    (task) => task.user === req.user?.email
  );

  res.json(userTasks);
};

// UPDATE TASK
export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = req.body.completed ?? task.completed;
  task.title = req.body.title ?? task.title;

  res.json(task);
};

// DELETE TASK
export const deleteTask = (req: Request, res: Response) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);

  res.json({ message: "Task deleted" });
};