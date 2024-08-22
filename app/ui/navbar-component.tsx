import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
    return (
        <header className="bg-black/90 items-center h-11 text-white flex justify-between px-4">
            <div>Welcome!</div>
            <div className="flex justify-center">
                <a href="/task-management/task-list" className="px-4 hover:cursor-pointer">
                    Task List
                </a>
                <Link href="/task-management/task-adding" className="px-4 hover:cursor-pointer">
                    New Task
                </Link>
            </div>
        </header>
    );
};
