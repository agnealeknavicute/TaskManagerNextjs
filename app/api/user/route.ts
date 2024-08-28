'use server';

import { IUser } from '@/app/types/client-user-model';
import { User } from '@/app/types/db-user-model';
import connectDB from '@/lib/connectDB';

export async function getUsers(): Promise<IUser[]> {
    await connectDB();
    try {
        const users = await User.find({});
        return JSON.parse(JSON.stringify(users));
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getUser(id: string): Promise<IUser | null> {
    await connectDB();
    try {
        const user = await User.findOne({ _id: id });
        return JSON.parse(JSON.stringify(user));
    } catch (e) {
        console.log(e);
        return null;
    }
}
