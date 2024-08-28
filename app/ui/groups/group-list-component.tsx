import { IGroup } from '@/app/types/client-group-model';
import { CardBody, Card, Text, Heading, Spacer, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import GroupAddingComponent from './group-adding-component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getGroups } from '@/app/api/group/route';
import { getUsers } from '@/app/api/user/route';

export default async function groupListComponent() {
    const groups = await getGroups();
    const users = await getUsers();
    const freeUsers = users.filter((user) => user.assignedGroup === 0);
    const session = await getServerSession(authOptions);
    return (
        <>
            {session?.user.roles.includes('admin') && (
                <Card maxW="sm" className=" my-4 mx-auto px-2 py-2">
                    <Text className="mb-4 text-xl">New Group</Text>
                    <GroupAddingComponent users={freeUsers} />
                </Card>
            )}

            {groups.map((group: IGroup) => (
                <Card maxW="sm" className="my-4 mx-auto cursor-pointer" key={group._id}>
                    <Link href={`/group-management/${group.id}`}>
                        <CardBody>
                            <Flex>
                                <Heading size="xs" textTransform="uppercase">
                                    {group.title}
                                </Heading>
                                <Spacer />
                                {group.assignedUsers.length + ' '}assigned
                            </Flex>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </>
    );
}
