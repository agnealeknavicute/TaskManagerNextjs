import { getGroups } from '@/app/api/group/route';
import { getUsers } from '@/app/api/user/route';
import TaskFormComponent from '@/app/ui/tasks/task-form-component';
import React from 'react';

export default async function TaskAddingPage() {
    const users = await getUsers();
    const groups = await getGroups();

    return (
        <>
            <TaskFormComponent groups={groups} users={users} modal={false} />
        </>
    );
}
