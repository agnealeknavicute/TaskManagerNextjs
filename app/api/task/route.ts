'use server';

import connectDB from '@/lib/connectDB';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ITask, TaskStatuses } from '@/app/types/client-task-models';
import { Todo } from '@/app/types/db-todo-model';
import { IAssignedUsers } from '@/app/types/client-group-model';
import { User } from '@/app/types/db-user-model';
import { Group } from '@/app/types/db-group-model';
import { Lang } from '@/app/types/db-lang-model';
import { rawTypeToRealType } from '@/app/helpers/types-switch';

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

function hasAssignedUsers(obj: any): obj is { assignedUsers: string[] } {
    return obj && Array.isArray(obj.assignedUsers);
}

export async function getUserIds(usernames: string[]): Promise<string[]> {
    const users = await User.find({ username: { $in: usernames } }).select('_id');
    return users.map((user) => user._id.toString());
}

async function getGroupId(groupTitle: string): Promise<string | undefined> {
    const group = await Group.findOne({ title: groupTitle }).select('id');
    return group?.id;
}

export async function getAssignedUsernames(taskOrGroup: IAssignedUsers | null) {
    if (!taskOrGroup || !hasAssignedUsers(taskOrGroup)) {
        return null;
    }
    try {
        let assignedUsersNames = await Promise.all(
            taskOrGroup.assignedUsers.map(async (user: string) => {
                const fullUser = await User.findOne({ _id: user });
                return JSON.parse(JSON.stringify(fullUser.username));
            }),
        );
        return assignedUsersNames;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function updateTask(
    id: number,
    title: string,
    description: string,
    type: 0 | 1 | 2,
    newAssignedUsers: string[],
    newAssignedGroup: string,
) {
    await connectDB();
    try {
        let newAssignedUsersId = await getUserIds(newAssignedUsers);
        let newAssignedGroupId = await getGroupId(newAssignedGroup);

        const updatedTask = await Todo.findOneAndUpdate(
            { id: id },
            {
                title: title,
                description: description,
                type: rawTypeToRealType(type),
                assignedUsers: newAssignedUsersId,
                assignedGroup: newAssignedGroupId,
            },
            { new: true },
        );
        revalidatePath(`/task-management/task-list`);

        return JSON.parse(JSON.stringify(updatedTask));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function postTask(
    title: string,
    assignedGroup: string,
    description: string,
    type: 0 | 1 | 2,
    newAssignedUsers: string[],
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log('no session');
        return;
    } else {
        await connectDB();

        let newAssignedUsersId: string[] | [] = [];
        if (newAssignedUsers) {
            newAssignedUsersId = await getUserIds(newAssignedUsers);
        }

        let assignedGroupId = await getGroupId(assignedGroup);

        const id = Date.now();

        const newTask = new Todo({
            userId: session.user.id,
            id: id,
            title: title,
            description: description,
            type: rawTypeToRealType(type),
            createdOn: new Date(),
            status: TaskStatuses.NotStarted,
            assignedUsers: newAssignedUsersId,
            assignedGroup: assignedGroupId,
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

        return JSON.parse(JSON.stringify(updatedTask));
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function updateAssignedUsers(taskId: number, assignedUsers: string[]) {
    await connectDB();
    try {
        let newAssignedUsersId: string[] = await getUserIds(assignedUsers);
        const task = await Todo.findOneAndUpdate({ id: taskId }, { assignedUsers: newAssignedUsersId }, { new: true });
        revalidatePath(`/task-management/task-list`);
        return JSON.parse(JSON.stringify(task));
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function updateAssignedGroup(taskId: number, assignedGroup: string) {
    await connectDB();
    try {
        const fullAssignedGroup = await Group.findOne({ title: assignedGroup });
        const newTask = await Todo.findOneAndUpdate(
            { id: taskId },
            { assignedGroup: fullAssignedGroup.id },
            { new: true },
        );
        revalidatePath(`/task-management/task-list`);
        return JSON.parse(JSON.stringify(newTask));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteTask(id: number) {
    await connectDB();

    try {
        await Todo.findOneAndDelete({ id: id });
        await User.updateMany({ assignedGroup: id }, { assignedGroup: 0 });
    } catch (e) {
        console.log(e);
    }
}

export async function getTranslation(locale: string) {
    await connectDB();
    try {
        const tran = await Lang.findOne({ locale: locale });
        return JSON.parse(JSON.stringify(tran.translations));
    } catch (e) {
        console.log(e);
    }
}
