import { ITask } from '../../types/client-task-models';
import { CardBody, Card, Text, Heading, Stack, Badge, Box, Spacer, Flex } from '@chakra-ui/react';
import { getTasks } from '@/app/api/task/route';
import Link from 'next/link';
import { statusColor, typeColor } from '@/app/helpers/badge-colors';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function TaskListComponent() {
    const [tasks, t, session] = await Promise.all([getTasks(), getTranslations('All'), getServerSession(authOptions)]);
    let filteredTasks: ITask[] = [];
    if (session?.user.roles.includes('user')) {
        filteredTasks = tasks.filter((task) => task.assignedGroup === session?.user.assignedGroup);
    }

    return (
        <>
            {session?.user.roles.includes('user') ? (
                <Text className="text-center">{t('tasks_assigned_to_your_group')}</Text>
            ) : (
                <Text className="text-center">{t('all_tasks')}</Text>
            )}
            {filteredTasks.map((task: ITask) => (
                <>
                    <Card maxW="sm" className="my-4 mx-auto cursor-pointer" key={task.id}>
                        <Link href={`/task-management/${task.id}`}>
                            <CardBody>
                                <Flex>
                                    <Heading size="xs" textTransform="uppercase">
                                        {task.title}
                                    </Heading>
                                </Flex>

                                <Text pt="2" fontSize="sm">
                                    {task.description}
                                </Text>
                                <Box className="pt-6">
                                    <Stack className="items-center" direction="row">
                                        {statusColor(task.status) === 'default' ? (
                                            <Badge>{t(task.status)}</Badge>
                                        ) : (
                                            <Badge colorScheme={statusColor(task.status)}>{t(task.status)}</Badge>
                                        )}
                                        <Badge colorScheme={typeColor(task.type)}>{t(task.type)}</Badge>
                                        <Spacer />
                                        <Text className="text-xs">{new Date(task.createdOn).toLocaleDateString()}</Text>
                                    </Stack>
                                </Box>
                            </CardBody>
                        </Link>
                    </Card>
                </>
            ))}
        </>
    );
}
