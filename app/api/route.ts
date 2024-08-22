'use server';

import connectDB from '@/lib/connectDB';
import { ITask, TaskStatuses } from '../types/client-task-models';
import { rawTypeToRealType } from '../helpers/types-switch';
import { revalidatePath } from 'next/cache';
import { Todo } from '../types/db-todo-model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getTasks(): Promise<ITask[]> {
    await connectDB();
    try {
        const tasks = await Todo.find().sort({ createdOn: -1 });
        return tasks;
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

export async function updateTask(id: number, title: string, description: string, type: 0 | 1 | 2) {
    await connectDB();
    try {
        const updatedTask = await Todo.findOneAndUpdate(
            { id: id },
            {
                title: title,
                description: description,
                type: rawTypeToRealType(type),
            },
            { new: true },
        );
        revalidatePath(`/task-management/task-list`);

        return JSON.parse(JSON.stringify(updateTask));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function postTask(title: string, description: string, type: 0 | 1 | 2) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log('no session');
        return;
    } else {
        await connectDB();

        const id = Date.now();

        const newTask = new Todo({
            userId: session.user.id,
            id: id,
            title: title,
            description: description,
            type: rawTypeToRealType(type),
            createdOn: new Date(),
            status: TaskStatuses.NotStarted,
            assigned: [],
        });
        try {
            await newTask.save();
            revalidatePath('/task-management/task-list');
        } catch (e) {
            console.log(e);
        }
    }
}

export async function updateTaskStatus(status: TaskStatuses, id: number) {
    try {
        const updatedTask = await Todo.findOneAndUpdate({ id: id }, { status: status }, { new: true });
        revalidatePath(`/task-management/task-list`);

        return JSON.parse(JSON.stringify(updateTask));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteTask(id: number) {
    try {
        await Todo.findOneAndDelete({ id: id });
    } catch (e) {
        console.log(e);
    }
}
