import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from './language-switcher-component';
import DrawerComponent from './drawer-component';
import { getGroupName } from '../api/group/route';

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const groupName = await getGroupName(session?.user.assignedGroup);
    const t = await getTranslations('All');
    return (
        <header className="bg-black/90 items-center h-11 text-white flex justify-between px-4">
            {!session ? (
                <div>{t('welcome_stranger')}</div>
            ) : (
                <div>
                    {t('welcome')} {session?.user.username}!
                </div>
            )}

            <DrawerComponent assignedGroup={groupName || ''} roles={session?.user.roles} />

            <LanguageSwitcher />
        </header>
    );
}
