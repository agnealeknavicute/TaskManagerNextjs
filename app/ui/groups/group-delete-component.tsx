'use client';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteGroup } from '@/app/api/group/route';
import { useTranslations } from 'use-intl';

interface GroupDeleteComponentProps {
    id: number;
}

export default function GroupDeleteComponent(props: GroupDeleteComponentProps) {
    const t = useTranslations('All');
    const router = useRouter();

    return (
        <Button
            onClick={() => {
                deleteGroup(props.id);
                router.push('/group-management/group-list');
            }}
        >
            {t('delete')}
        </Button>
    );
}
