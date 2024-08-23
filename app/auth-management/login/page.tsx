import Loading from '@/app/loading';
import LoginComponent from '@/app/ui/auth/login-component';
import React, { Suspense } from 'react';

export default function TaskListPage() {
    return (
        <div className="py-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <LoginComponent />
            </Suspense>
        </div>
    );
}
