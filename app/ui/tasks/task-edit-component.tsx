'use client';
import React from 'react';
import { Modal, ModalOverlay, ModalContent, useDisclosure, MenuItem } from '@chakra-ui/react';
import { TaskStatuses, TaskTypes } from '@/app/types/client-task-models';
import TaskFormComponent from './task-form-component';
import { realTypeToRawType } from '@/app/helpers/types-switch';

interface TaskEditComponentProps {
    title: string | TaskStatuses;
    description: string;
    type: TaskTypes;
    id: number;
}

export default function TaskEditComponent(props: TaskEditComponentProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen}>Edit</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <TaskFormComponent
                        modal={true}
                        id={props.id}
                        type={realTypeToRawType(props.type)}
                        title={props.title}
                        description={props.description}
                        onClose={onClose}
                    />
                </ModalContent>
            </Modal>
        </>
    );
}
