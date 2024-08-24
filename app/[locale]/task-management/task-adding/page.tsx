import { getUsers } from '@/app/api/route';
import TaskFormComponent from '@/app/ui/tasks/task-form-component';
import React from 'react';

export default async function TaskAddingPage() {
    const users = await getUsers();

    return (
        <>
            <TaskFormComponent users={users} modal={false} />
        </>
    );
}
