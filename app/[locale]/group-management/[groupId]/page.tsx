import React, { Suspense } from 'react';
import Loading from '../../loading';
import GroupCardComponent from '@/app/ui/groups/group-card-component';

export default function GroupPage({ params }: { params: { groupId: number } }) {
    return (
        <div className="my-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <GroupCardComponent id={params.groupId} />
            </Suspense>
        </div>
    );
}
