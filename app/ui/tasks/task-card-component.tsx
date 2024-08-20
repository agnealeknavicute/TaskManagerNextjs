import { typeColor } from '@/app/helpers/badge-colors';
import { getTask } from '@/app/seed/route';
import { Text, Heading, Stack, Box, Divider, Spacer, Badge } from '@chakra-ui/react';
import React from 'react';
import { TaskCardMenu } from './card-menu-component';
import TaskEditComponent from './task-edit-component';
import CardStatusMenuComponent from './card-status-component';
import CardDeleteComponent from './card-delete-component';

export default async function TaskCardComponent({ id }: { id: string }) {
    const task = await getTask(id);

    return (
        <>
            {task ? (
                <Box className="w-2/3  mx-auto">
                    <Stack spacing="5">
                        <Box className="flex items-center">
                            <Heading size="md">{task.title}</Heading>
                            <Spacer />
                            <TaskCardMenu menuTitle="Actions">
                                <TaskEditComponent
                                    id={task.id}
                                    type={task.type}
                                    title={task.title}
                                    description={task.description}
                                />
                                <CardDeleteComponent id={task.id} />
                            </TaskCardMenu>
                        </Box>
                        <Text>{task.description}</Text>
                    </Stack>
                    <Divider className="mt-4 mb-1" />
                    <Box className="flex items-center">
                        <Text className="text-xs text-slate-700">{new Date(task.createdOn).toLocaleDateString()}</Text>
                        <Spacer />
                        <CardStatusMenuComponent task={task} />

                        <Badge className="ml-4" colorScheme={typeColor(task.type)}>
                            {task.type}
                        </Badge>
                    </Box>
                </Box>
            ) : null}
        </>
    );
}
