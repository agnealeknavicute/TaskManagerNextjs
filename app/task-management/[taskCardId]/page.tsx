import TaskCardComponent from '@/app/ui/tasks/task-card-component';
import React, { Suspense } from 'react';
import Loading from '../loading';

export default function TaskCardPage({ params }: { params: { taskCardId: string } }) {
    return (
        <div className="my-12">
            <Suspense fallback={<Loading skelNum={1} />}>
                <TaskCardComponent id={params.taskCardId} />
            </Suspense>
        </div>
    );
}
