'use client';
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Button, MenuItem } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import { IGroup } from '@/app/types/client-group-model';
import GroupAssignComponent from './group-assign-component';
import { updateAssignedGroup } from '@/app/api/task/route';

interface GroupWrapAssignCompProps {
    groups: IGroup[];
    assignedGroup?: string;
    taskId: number;
}

export default function GroupAssignWrapComponent({
    groups = [],
    assignedGroup = '',
    taskId,
}: GroupWrapAssignCompProps) {
    const t = useTranslations('All');

    const [newAssignedGroup, setNewAssignedGroup] = useState<string>(assignedGroup);
    const assignGroupHandler = (assignGroup: string) => {
        setNewAssignedGroup(assignGroup);
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const updateTaskGroupHandler = async () => {
        await updateAssignedGroup(taskId, newAssignedGroup);
        onClose();
    };
    return (
        <>
            <MenuItem onClick={onOpen}>Change group</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <GroupAssignComponent
                            assignGroupHandler={assignGroupHandler}
                            setNewAssignedGroup={setNewAssignedGroup}
                            newAssignedGroup={newAssignedGroup}
                            groups={groups}
                        />
                        <Button onClick={updateTaskGroupHandler} className=" mt-4 float-end" colorScheme="purple">
                            {t('submit')}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
