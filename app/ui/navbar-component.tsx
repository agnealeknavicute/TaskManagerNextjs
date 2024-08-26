import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import React from 'react';
import SignoutComponent from './auth/signout-component';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from './language-switcher-component';

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const t = await getTranslations('All');
    return (
        <header className="bg-black/90 items-center h-11 text-white flex justify-between px-4">
            {!session ? (
                <div>{t('Welcome stranger!')}</div>
            ) : (
                <div>
                    {t('Welcome')} {session?.user.username}!
                </div>
            )}

            {session && (
                <div className="flex justify-center">
                    <a href="/users-management/users-list" className="px-4 hover:cursor-pointer">
                        {t('User List')}
                    </a>
                    <a href="/task-management/task-list" className="px-4 hover:cursor-pointer">
                        {t('Task List')}
                    </a>
                    {session.user.roles.includes('admin') && (
                        <Link href="/task-management/task-adding" className="px-4 hover:cursor-pointer">
                            {t('New Task')}
                        </Link>
                    )}

                    <SignoutComponent />
                </div>
            )}
            <LanguageSwitcher />
        </header>
    );
}
