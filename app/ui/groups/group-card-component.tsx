import { Heading, Stack, Box, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import GroupManagerAssignComponent from './group-manag-assign-component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAssignedUsernames, getGroup } from '@/app/api/group/route';
import { getUsers } from '@/app/api/user/route';

export default async function GroupCardComponent({ id }: { id: number }) {
    const group = await getGroup(id);
    const users = await getUsers();
    const session = await getServerSession(authOptions);
    const assignedUsernames: string[] | null = await getAssignedUsernames(group);
    return (
        <>
            {group ? (
                <Box className="w-2/3  mx-auto">
                    <Stack spacing="5">
                        <Box className="">
                            <Heading size="md">{group.title}</Heading>
                            {session?.user.roles.includes('admin') ? (
                                <GroupManagerAssignComponent
                                    groupId={group.id}
                                    assignedUsers={assignedUsernames || []}
                                    users={users}
                                />
                            ) : (
                                <List className="mt-6">
                                    {assignedUsernames?.map((user) => <ListItem>{user}</ListItem>)}
                                </List>
                            )}
                        </Box>
                    </Stack>
                </Box>
            ) : null}
        </>
    );
}
