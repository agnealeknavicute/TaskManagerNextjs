import React, { Suspense } from 'react';
import UserCardComponent from '@/app/ui/users/user-card-component';
import Loading from '../../loading';

export default function UserCardPage({ params }: { params: { userCardId: string } }) {
    return (
        <div className="my-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <UserCardComponent id={params.userCardId} />
            </Suspense>
        </div>
    );
}
