'use client';
import { updateTaskStatus } from '@/app/api/route';
import { ITask, TaskStatuses } from '@/app/types/client-task-models';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslations } from 'use-intl';

interface CardStatusComponentProps {
    task: ITask;
}

export default function CardStatusMenuComponent(props: CardStatusComponentProps) {
    const t = useTranslations('All');
    const [taskStatus, setTaskStatus] = useState<TaskStatuses>(props.task.status);

    const statusMenuItems = Object.values(TaskStatuses).map((status, index) => {
        if (status !== taskStatus) {
            return (
                <MenuItem
                    onClick={() => {
                        if (taskStatus) {
                            updateTaskStatus(status, props.task.id);
                            setTaskStatus(status);
                        }
                    }}
                    key={index}
                >
                    {t(status)}
                </MenuItem>
            );
        } else {
            return null;
        }
    });

    return (
        <Menu>
            <MenuButton size="xs" colorScheme="purple" as={Button} rightIcon={<ChevronDownIcon />}>
                {t(taskStatus)}
            </MenuButton>
            <MenuList>{statusMenuItems}</MenuList>
        </Menu>
    );
}
