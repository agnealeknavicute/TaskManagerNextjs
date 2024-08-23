import { getUsers } from '@/app/api/route';
import TaskFormComponent from '@/app/ui/tasks/task-form-component';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import React from 'react';

export default async function TaskAddingPage() {
    const users = await getUsers();

    return (
        <>
            <TaskFormComponent users={users} modal={false} />
        </>
    );
}
