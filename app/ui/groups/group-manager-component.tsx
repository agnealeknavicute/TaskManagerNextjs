'use client';

import { IUser } from '@/app/types/client-user-model';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CardAssignComponent from '../users/users-assign-component';
import { Button, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import GroupDeleteComponent from './group-delete-component';
import { updateGroupAssignedUsers } from '@/app/api/group/route';

interface GroupManagCompProps {
    users: IUser[];
    assignedUsers: string[] | null;
    groupId: number;
}

export default function GroupManagerComponent({ users = [], assignedUsers = [], groupId }: GroupManagCompProps) {
    const freeUsers = users.filter((user) => user.assignedGroup === 0);
    const t = useTranslations('All');
    const router = useRouter();

    const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>(assignedUsers || []);
    const assignHandler = (assignUser: string) => {
        if (assignUser.trim() && !newAssignedUsers.includes(assignUser)) {
            setNewAssignedUsers([...newAssignedUsers, assignUser]);
        }
    };

    const updateUsersHandler = async () => {
        await updateGroupAssignedUsers(groupId, newAssignedUsers);
        router.push('/group-management/group-list');
    };

    return (
        <>
            <CardAssignComponent
                users={freeUsers}
                newAssignedUsers={newAssignedUsers}
                setNewAssignedUsers={setNewAssignedUsers}
                assignHandler={assignHandler}
            />
            <Flex className=" mt-10 ">
                <GroupDeleteComponent id={groupId} />

                <Spacer />
                <Button onClick={updateUsersHandler} className="float-end" colorScheme="purple">
                    {t('submit')}
                </Button>
            </Flex>
        </>
    );
}
