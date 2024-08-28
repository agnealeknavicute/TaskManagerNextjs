import { statusColor, typeColor } from '@/app/helpers/badge-colors';
import { Text, Heading, Stack, Box, Divider, Spacer, Badge, Flex } from '@chakra-ui/react';
import React from 'react';
import { TaskCardMenu } from './card-menu-component';
import TaskEditComponent from './task-edit-component';
import CardStatusMenuComponent from './card-status-component';
import CardDeleteComponent from './card-delete-component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CardManagerAssignComponent from './card-manager-assign-component';
import { getTranslations } from 'next-intl/server';
import GroupAssignWrapComponent from '../groups/group-assign-wrap-component';
import { getAssignedUsernames, getTask } from '@/app/api/task/route';
import { getGroup, getGroupName, getGroups } from '@/app/api/group/route';
import { getUsers } from '@/app/api/user/route';

export default async function TaskCardComponent({ id }: { id: string }) {
    const t = await getTranslations('All');
    const task = await getTask(id);
    let groupName: null | string = null;
    if (task) {
        groupName = await getGroupName(task?.assignedGroup);
    }
    const groups = await getGroups();
    const users = await getUsers();
    const assignedUsernames: string[] | null = await getAssignedUsernames(task);
    let assignedGroupUsernames: string[] | null = null;
    if (task?.assignedGroup) {
        const taskGroup = await getGroup(task?.assignedGroup);
        assignedGroupUsernames = await getAssignedUsernames(taskGroup);
    }

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
                                <TaskCardMenu menuTitle={t('actions')}>
                                    <TaskEditComponent
                                        groups={groups}
                                        assignedGroup={groupName || ''}
                                        users={users}
                                        assignedUsers={assignedUsernames || []}
                                        id={task.id}
                                        type={task.type}
                                        title={task.title}
                                        description={task.description}
                                    />
                                    <CardDeleteComponent id={task.id} />
                                </TaskCardMenu>
                            )}
                            {session?.user.roles.includes('manager') && (
                                <TaskCardMenu menuTitle={t('actions')}>
                                    <CardManagerAssignComponent
                                        taskId={task.id}
                                        users={users}
                                        assignedUsers={assignedUsernames || []}
                                    />
                                    <GroupAssignWrapComponent
                                        assignedGroup={groupName || ''}
                                        taskId={task?.id}
                                        groups={groups}
                                    />
                                </TaskCardMenu>
                            )}
                        </Box>
                        <Flex>
                            <Text>{task.description}</Text>
                            <Spacer />
                            {groupName && <Text className="text-md  text-slate-700">Group name: {groupName}</Text>}
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
                                {t(task.status)}
                            </Badge>
                        )}

                        <Badge className="ml-4" colorScheme={typeColor(task.type)}>
                            {t(task.type)}
                        </Badge>
                    </Box>
                </Box>
            ) : (
                ''
            )}
        </>
    );
}
