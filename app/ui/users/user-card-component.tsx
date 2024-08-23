import { getUser } from '@/app/api/route';
import { Card, Flex, Avatar, Heading, Text, Spacer } from '@chakra-ui/react';
import React from 'react';

export default async function UserCardComponent({ id }: { id: string }) {
    const user = await getUser(id);
    return (
        <>
            {user && (
                <Card className="w-1/3 px-5 py-4 mx-auto">
                    <Flex className="items-center my-3">
                        <Avatar className="mr-2" size="sm" name={user.username} />
                        <Heading size="xs" textTransform="uppercase">
                            {user.username}
                        </Heading>
                        <Spacer />
                        <Text>{user._id}</Text>
                    </Flex>
                    <Text>Roles: {user.roles}</Text>
                </Card>
            )}
        </>
    );
}
