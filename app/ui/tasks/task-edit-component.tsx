'use client';
import React from 'react';
import { Modal, ModalOverlay, ModalContent, useDisclosure, MenuItem, grid } from '@chakra-ui/react';
import { TaskStatuses, TaskTypes } from '@/app/types/client-task-models';
import TaskFormComponent from './task-form-component';
import { realTypeToRawType } from '@/app/helpers/types-switch';
import { IUser } from '@/app/types/client-user-model';
import { useTranslations } from 'use-intl';
import { IGroup } from '@/app/types/client-group-model';

interface TaskEditComponentProps {
    title: string | TaskStatuses;
    description: string;
    type: TaskTypes;
    id: number;
    users: IUser[];
    assignedUsers: string[];
    assignedGroup: string;
    groups: IGroup[];
}

export default function TaskEditComponent(props: TaskEditComponentProps) {
    const t = useTranslations('All');
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen}>{t('edit')}</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <TaskFormComponent
                        groups={props.groups}
                        assignedGroup={props.assignedGroup}
                        modal={true}
                        id={props.id}
                        type={realTypeToRawType(props.type)}
                        title={props.title}
                        description={props.description}
                        onClose={onClose}
                        users={props.users}
                        assignedUsers={props.assignedUsers}
                    />
                </ModalContent>
            </Modal>
        </>
    );
}
