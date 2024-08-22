'use client';
import { MenuItem } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/app/seed/route';

interface CardDeleteComponentProps {
    id: number;
}

export default function CardDeleteComponent(props: CardDeleteComponentProps) {
    const router = useRouter();

    return (
        <MenuItem
            onClick={() => {
                deleteTask(props.id);
                router.push('/task-management/task-list');
            }}
        >
            Delete
        </MenuItem>
    );
}
