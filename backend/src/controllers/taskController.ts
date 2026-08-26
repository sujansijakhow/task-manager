import { Request, Response } from "express";
import prisma from "../prisma";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, projectId, priority } = req.body;
    const userId = (req as any).user.id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        projectId: projectId || "default",
        priority: priority || "low",
        status: "pending",
        userId,
      },
    });

    res.status(201).json(newTask);
  } catch (error: any) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const userTasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(userTasks);
  } catch (error: any) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const taskId = req.params.id;
    const { title, priority, status, projectId } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
        ...(projectId !== undefined && { projectId }),
      },
    });

    res.json(updatedTask);
  } catch (error: any) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const taskId = req.params.id;

    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.json({ message: "Task deleted" });
  } catch (error: any) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};