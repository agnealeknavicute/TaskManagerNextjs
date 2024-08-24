'use client';
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Button, MenuItem } from '@chakra-ui/react';
import CardAssignComponent from './card-assign-component';
import { IUser } from '@/app/types/client-user-model';
import { updateAssignedUsers } from '@/app/api/route';
import { useTranslations } from 'use-intl';

interface CardManAssignCompProps {
    users: IUser[];
    assignedUsers?: string[];
    taskId: number;
}

export default function CardManagerAssignComponent({ users = [], assignedUsers = [], taskId }: CardManAssignCompProps) {
    const t = useTranslations('All');

    const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>(assignedUsers);
    const assignHandler = (assignUser: string) => {
        if (assignUser.trim() && !newAssignedUsers.includes(assignUser)) {
            setNewAssignedUsers([...newAssignedUsers, assignUser]);
        }
    };
    const { isOpen, onOpen, onClose } = useDisclosure();

    const updateUsersHandler = async () => {
        await updateAssignedUsers(taskId, newAssignedUsers);
        onClose();
    };

    return (
        <>
            <MenuItem onClick={onOpen}>{t('Change assigned users')}</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <CardAssignComponent
                            users={users}
                            newAssignedUsers={newAssignedUsers}
                            setNewAssignedUsers={setNewAssignedUsers}
                            assignHandler={assignHandler}
                        />
                        <Button onClick={updateUsersHandler} className=" mt-4 float-end" colorScheme="purple">
                            {t('Submit')}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
