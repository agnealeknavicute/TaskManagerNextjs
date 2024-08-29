'use client';
import { MenuItem } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/app/api/task/route';
import { useTranslations } from 'use-intl';

interface CardDeleteComponentProps {
    id: number;
}

export default function CardDeleteComponent(props: CardDeleteComponentProps) {
    const t = useTranslations('All');
    const router = useRouter();

    return (
        <MenuItem
            onClick={() => {
                deleteTask(props.id);
                router.push('/task-management/task-list');
            }}
        >
            {t('delete')}
        </MenuItem>
    );
}
