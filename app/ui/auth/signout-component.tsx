'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SignoutComponent() {
    async function signOutHandler() {
        await signOut({ callbackUrl: '/auth-management/login' });
    }
    return (
        <div className="px-4 hover:cursor-pointer" onClick={signOutHandler}>
            Sign out
        </div>
    );
}
