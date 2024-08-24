import { getUser } from '@/app/api/route';
import { Card, Flex, Avatar, Heading, Text, Spacer } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function UserCardComponent({ id }: { id: string }) {
    const user = await getUser(id);
    const t = await getTranslations('All');
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
                    <Text>
                        {t('Roles')}: {user.roles}
                    </Text>
                </Card>
            )}
        </>
    );
}
