import Loading from '@/app/loading';
import UserListComponent from '@/app/ui/users/user-list-component';
import React, { Suspense } from 'react';

export default function TaskListPage() {
    return (
        <div className="py-12">
            <Suspense fallback={<Loading skelNum={10} />}>
                <UserListComponent />
            </Suspense>
        </div>
    );
}
