import React, { Suspense } from 'react';
import Loading from '../../loading';
import UserCardComponent from '@/app/ui/users/user-card-component';

export default function TaskCardPage({ params }: { params: { userCardId: string } }) {
    return (
        <div className="my-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <UserCardComponent id={params.userCardId} />
            </Suspense>
        </div>
    );
}
