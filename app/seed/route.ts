"use server";

import { Todo } from "@/app/types/todoModel";
import connectDB from "@/lib/connectDB";
import { ITask } from "../types/models";
import { randomBytes } from "crypto";

export async function getTasks(): Promise<ITask[]> {
  await connectDB();
  try {
    const tasks = await Todo.find().sort({ createdOn: -1 });
    return JSON.parse(JSON.stringify(tasks));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getTask(id: string): Promise<ITask | null> {
  await connectDB();
  try {
    const task = await Todo.findOne({ id: id });
    return JSON.parse(JSON.stringify(task));
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function postTask(task: ITask) {
  await connectDB();
  const updatedTask = await Todo.findOneAndUpdate(
    { id: task.id },
    {
      title: task.title,
      description: task.description,
      type: task.type,
    },
    { new: true }
  );
  if (updatedTask) {
    return JSON.parse(JSON.stringify(updatedTask));
  } else {
    const userId = Date.now() + 5;
    const createdOnDate = new Date(task.createdOn);

    const newTask = new Todo({
      userId: userId,
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type,
      createdOn: createdOnDate,
      status: task.status,
      assigned: [],
    });
    try {
      await newTask.save();
    } catch (e) {
      console.log(e);
    }
  }
}
