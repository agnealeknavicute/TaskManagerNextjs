'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { useTranslations } from 'use-intl';

export default function SignoutComponent() {
    const t = useTranslations('All');

    async function signOutHandler() {
        await signOut({ callbackUrl: '/auth-management/login' });
    }
    return (
        <div className="px-4 hover:cursor-pointer" onClick={signOutHandler}>
            {t('sign_out')}
        </div>
    );
}
