import React, { Suspense } from 'react';
import Loading from '../../loading';
import GroupListComponent from '@/app/ui/groups/group-list-component';

export default function GroupListPage() {
    return (
        <div className="my-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <GroupListComponent />
            </Suspense>
        </div>
    );
}
