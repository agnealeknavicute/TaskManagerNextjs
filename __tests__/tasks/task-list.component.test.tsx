import { render, screen } from '@testing-library/react';
import { getTasks } from '@/app/api/task/route';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import TaskListComponent from '@/app/ui/tasks/task-list-component';
const { expect, describe, it } = require('@jest/globals');
import '@testing-library/jest-dom';

jest.mock('@/app/api/task/route', () => ({
    getTasks: jest.fn(),
}));

jest.mock('next-auth', () => ({
    getServerSession: jest.fn(),
}));

jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn(),
}));

describe('TaskListComponent', () => {
    it('shows only tasks assigned to user group', async () => {
        const tasks = [
            {
                id: 1,
                title: 'Task 1',
                description: 'Description 1',
                status: 'In progress',
                type: 'High Urgency',
                assignedGroup: 1901,
                assignedUsers: [],
                createdOn: new Date(),
            },
            {
                id: 2,
                title: 'Task 2',
                description: 'Description 2',
                status: 'Done',
                type: 'Low Urgency',
                assignedGroup: 69,
                assignedUsers: [],
                createdOn: new Date(),
            },
        ];

        const session = {
            user: {
                roles: ['user'],
                assignedGroup: 192,
            },
        };

        (getTasks as jest.Mock).mockResolvedValue(tasks);
        (getServerSession as jest.Mock).mockResolvedValue(session);
        (getTranslations as jest.Mock).mockResolvedValue((key: string) => key);

        render(await TaskListComponent());

        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
});

const testTaskListComponent = async (role: string, expectedTasks: string[]) => {
    const tasks = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description 1',
            status: 'In progress',
            type: 'High Urgency',
            assignedGroup: 192,
            assignedUsers: [],
            createdOn: new Date(),
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description 2',
            status: 'Done',
            type: 'Low Urgency',
            assignedGroup: 69,
            assignedUsers: [],
            createdOn: new Date(),
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description 3',
            status: 'Done',
            type: 'Low Urgency',
            assignedGroup: 1990,
            assignedUsers: [],
            createdOn: new Date(),
        },
    ];

    const session = {
        user: {
            roles: [role],
            assignedGroup: 69,
        },
    };

    (getTasks as jest.Mock).mockResolvedValue(tasks);
    (getServerSession as jest.Mock).mockResolvedValue(session);
    (getTranslations as jest.Mock).mockResolvedValue((key: string) => key);

    render(await TaskListComponent());

    expectedTasks.forEach((taskTitle) => {
        expect(screen.getByText(taskTitle)).toBeInTheDocument();
    });

    tasks.forEach((task) => {
        if (!expectedTasks.includes(task.title)) {
            expect(screen.queryByText(task.title)).not.toBeInTheDocument();
        }
    });
};

describe('TaskListComponent', () => {
    it('shows all tasks to manager', async () => {
        await testTaskListComponent('manager', ['Task 1', 'Task 2', 'Task 3']);
    });

    it('shows all tasks to admin', async () => {
        await testTaskListComponent('admin', ['Task 1', 'Task 2', 'Task 3']);
    });
    it('shows only assigned tasks to user', async () => {
        await testTaskListComponent('user', ['Task 2']);
    });
});
