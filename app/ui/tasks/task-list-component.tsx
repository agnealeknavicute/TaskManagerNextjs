import { ITask } from '../../types/client-task-models';
import {
    CardBody,
    Card,
    Text,
    Heading,
    Stack,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Badge,
    Box,
    Spacer,
    Flex,
} from '@chakra-ui/react';
import { getTasks } from '@/app/api/route';
import Link from 'next/link';
import { statusColor, typeColor } from '@/app/helpers/badge-colors';

export default async function TaskListComponent() {
    const tasks = await getTasks();

    return (
        <>
            {tasks.map((task: ITask) => (
                <Card maxW="sm" className="my-4 mx-auto cursor-pointer" key={task.id}>
                    <Link href={`/task-management/${task.id}`}>
                        <CardBody>
                            <Flex>
                                <Heading size="xs" textTransform="uppercase">
                                    {task.title}
                                </Heading>
                                <Spacer />
                                <AvatarGroup size="sm" max={2}>
                                    {task.assigned.map((user) => (
                                        <Avatar name={user} />
                                    ))}
                                </AvatarGroup>
                            </Flex>

                            <Text pt="2" fontSize="sm">
                                {task.description}
                            </Text>
                            <Box className="pt-6">
                                <Stack className="items-center" direction="row">
                                    {statusColor(task.status) === 'default' ? (
                                        <Badge>{task.status}</Badge>
                                    ) : (
                                        <Badge colorScheme={statusColor(task.status)}>{task.status}</Badge>
                                    )}
                                    <Badge colorScheme={typeColor(task.type)}>{task.type}</Badge>
                                    <Spacer />
                                    <Text className="text-xs">{new Date(task.createdOn).toLocaleDateString()}</Text>
                                </Stack>
                            </Box>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </>
    );
}
