import { getUsers } from '@/app/api/route';
import React from 'react';
import { CardBody, Card, Heading, Stack, Avatar, AvatarGroup, Badge, Box, Spacer, Flex } from '@chakra-ui/react';
import Link from 'next/link';
export default async function UserListComponent() {
    const users = await getUsers();
    return (
        <>
            {users.map((user, index) => (
                <Card maxW="sm" className="my-4 mx-auto cursor-pointer" key={index}>
                    <Link href={`/users-management/${user._id}`}>
                        <CardBody>
                            <Flex className="items-center">
                                <Avatar className="mr-2" size="sm" name={user.username} />
                                <Heading size="xs" textTransform="uppercase">
                                    {user.username}
                                </Heading>
                            </Flex>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </>
    );
}
