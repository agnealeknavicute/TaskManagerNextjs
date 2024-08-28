'use server';

import connectDB from '@/lib/connectDB';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { HasAssignedUsers, IGroup } from '@/app/types/client-group-model';
import { User } from '@/app/types/db-user-model';
import { Group } from '@/app/types/db-group-model';
import { getUserIds } from '../task/route';

export async function getGroups(): Promise<IGroup[]> {
    await connectDB();
    try {
        const groups = await Group.find().sort({ createdOn: -1 });
        return JSON.parse(JSON.stringify(groups));
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getGroup(id: number): Promise<IGroup | null> {
    await connectDB();
    try {
        const group = await Group.findOne({ id: id });

        return JSON.parse(JSON.stringify(group));
    } catch (e) {
        console.log(e);
        return null;
    }
}
function hasAssignedUsers(obj: any): obj is { assignedUsers: string[] } {
    return obj && Array.isArray(obj.assignedUsers);
}
export async function getAssignedUsernames(taskOrGroup: HasAssignedUsers | null) {
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

export async function createGroup(title: string, assignedUsers: string[]) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log('no session');
        return;
    } else {
        await connectDB();
        const id = Date.now();
        let newAssignedUsersId: string[] = await getUserIds(assignedUsers);
        const newGroup = new Group({
            id: id,
            title: title,
            assignedUsers: newAssignedUsersId,
        });
        try {
            await newGroup.save();
            revalidatePath('/group-management/group-list');
        } catch (e) {
            console.log(e);
        }
    }
}

export async function getGroupName(id: number): Promise<string | null> {
    try {
        const groupName = await Group.findOne({ id: id });

        return JSON.parse(JSON.stringify(groupName.title));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function updateGroupAssignedUsers(groupId: number, assignedUsers: string[]) {
    await connectDB();
    try {
        const oldGroup = await Group.findOne({ id: groupId });

        let newAssignedUsersId: string[] = await getUserIds(assignedUsers);
        const deletedUsers = oldGroup.assignedUsers.filter((user: string) => !newAssignedUsersId.includes(user));
        await deletedUsers.forEach(async (user: string) => {
            await User.findOneAndUpdate({ _id: user }, { assignedGroup: 0 });
        });
        const group = await Group.findOneAndUpdate(
            { id: groupId },
            { assignedUsers: newAssignedUsersId },
            { new: true },
        );
        revalidatePath(`/group-management/group-list`);
        return JSON.parse(JSON.stringify(group));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteGroup(id: number) {
    await connectDB();

    try {
        await Group.findOneAndDelete({ id: id });
    } catch (e) {
        console.log(e);
    }
}
