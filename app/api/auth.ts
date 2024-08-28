'use server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/connectDB';
import { User } from '../types/db-user-model';

export const signup = async (values: { username: string; password: string }) => {
    const { password, username } = values;
    const roles = ['user'];
    try {
        await connectToDatabase();
        const userFound = await User.findOne({ username });
        if (userFound) {
            return {
                error: 'Email already exists!',
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            roles,
            password: hashedPassword,
            assignedGroup: 0,
        });
        const savedUser = await user.save();
    } catch (e) {
        console.log(e);
    }
};
