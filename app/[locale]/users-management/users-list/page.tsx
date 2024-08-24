import UserListComponent from '@/app/ui/users/user-list-component';
import React, { Suspense } from 'react';
import Loading from '../../loading';

export default function UsersListPage() {
    return (
        <div className="py-12">
            <Suspense fallback={<Loading skelNum={10} />}>
                <UserListComponent />
            </Suspense>
        </div>
    );
}
