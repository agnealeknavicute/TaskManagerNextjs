import type { NextAuthOptions } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/connectDB';
import { User } from '@/app/types/db-user-model';

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await User.findOne({
                    username: credentials?.username,
                }).select('+password');

                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                if (!user) throw new Error('Wrong Email');
                const passwordMatch = await bcrypt.compare(credentials!.password, user.password);
                if (!passwordMatch) throw new Error('Wrong Password');

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.roles = token.roles as string[];
                session.user.assignedGroup = token.assignedGroup as number;
                delete session.user?.name;
                delete session.user?.email;
                delete session.user?.image;
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.roles = user.roles;
                token.assignedGroup = user.assignedGroup;
            }

            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
};
