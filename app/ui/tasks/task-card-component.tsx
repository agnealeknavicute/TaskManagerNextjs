import { statusColor, typeColor } from '@/app/helpers/badge-colors';
import { getTask, getUsers } from '@/app/api/route';
import { Text, Heading, Stack, Box, Divider, Spacer, Badge, Flex, AvatarGroup, Avatar } from '@chakra-ui/react';
import React from 'react';
import { TaskCardMenu } from './card-menu-component';
import TaskEditComponent from './task-edit-component';
import CardStatusMenuComponent from './card-status-component';
import CardDeleteComponent from './card-delete-component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function TaskCardComponent({ id }: { id: string }) {
    const task = await getTask(id);
    const users = await getUsers();
    const session = await getServerSession(authOptions);
    return (
        <>
            {task ? (
                <Box className="w-2/3  mx-auto">
                    <Stack spacing="5">
                        <Box className="flex items-center">
                            <Heading size="md">{task.title}</Heading>
                            <Spacer />
                            {session?.user.roles.includes('admin') && (
                                <TaskCardMenu menuTitle="Actions">
                                    <TaskEditComponent
                                        users={users}
                                        assignedUsers={task.assigned}
                                        id={task.id}
                                        type={task.type}
                                        title={task.title}
                                        description={task.description}
                                    />
                                    <CardDeleteComponent id={task.id} />
                                </TaskCardMenu>
                            )}
                        </Box>
                        <Flex>
                            <Text>{task.description}</Text>
                            <Spacer />
                            <AvatarGroup size="sm" max={2}>
                                {task.assigned.map((user) => (
                                    <Avatar name={user} />
                                ))}
                            </AvatarGroup>
                        </Flex>
                    </Stack>
                    <Divider className="mt-4 mb-1" />
                    <Box className="flex items-center">
                        <Text className="text-xs text-slate-700">{new Date(task.createdOn).toLocaleDateString()}</Text>
                        <Spacer />
                        {session?.user.roles.includes('admin') ? (
                            <CardStatusMenuComponent task={task} />
                        ) : (
                            <Badge className="ml-4" colorScheme={statusColor(task.status)}>
                                {task.status}
                            </Badge>
                        )}

                        <Badge className="ml-4" colorScheme={typeColor(task.type)}>
                            {task.type}
                        </Badge>
                    </Box>
                </Box>
            ) : null}
        </>
    );
}
