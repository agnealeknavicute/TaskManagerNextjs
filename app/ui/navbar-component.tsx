import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import React from 'react';
import SignoutComponent from './auth/signout-component';

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <header className="bg-black/90 items-center h-11 text-white flex justify-between px-4">
            {!session ? <div>Welcome stranger!</div> : <div>Welcome {session?.user.username}!</div>}

            {session && (
                <div className="flex justify-center">
                    <a href="/task-management/task-list" className="px-4 hover:cursor-pointer">
                        Task List
                    </a>
                    {session.user.roles.includes('admin') && (
                        <Link href="/task-management/task-adding" className="px-4 hover:cursor-pointer">
                            New Task
                        </Link>
                    )}

                    <SignoutComponent />
                </div>
            )}
        </header>
    );
}
