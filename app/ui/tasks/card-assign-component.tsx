'use client';
import { IUser } from '@/app/types/client-user-model';
import { Flex, TagLabel, Tag, TagCloseButton, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteList, AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import React, { useState } from 'react';

interface CardAssignComponentProps {
    users: IUser[];
    assignHandler: (assignUser: string) => void;
    newAssignedUsers: string[];
    setNewAssignedUsers: (newAssignedUsers: string[]) => void;
}

export default function CardAssignComponent({
    setNewAssignedUsers,
    users,
    assignHandler,
    newAssignedUsers,
}: CardAssignComponentProps) {
    const [assignUser, setAssignUser] = useState<string>('');

    return (
        <FormControl>
            <FormLabel>Assign users</FormLabel>
            <AutoComplete
                onChange={(value: string) => {
                    setAssignUser(value);
                }}
                openOnFocus
            >
                <Flex>
                    <AutoCompleteInput colorScheme="purple" variant="outline" />
                    <Button onClick={() => assignHandler(assignUser)} className="ml-2">
                        Add
                    </Button>
                </Flex>

                <AutoCompleteList>
                    {users.map((user, ind) => (
                        <AutoCompleteItem value={user.username} key={`option-${ind}`} textTransform="capitalize">
                            {user.username}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
            <Flex className="mt-3">
                {newAssignedUsers.map((user, index) => (
                    <Tag
                        className="mr-1"
                        size="md"
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="purple"
                    >
                        <TagLabel>{user}</TagLabel>
                        <TagCloseButton
                            onClick={() => {
                                setNewAssignedUsers(newAssignedUsers.filter((assignedUser) => assignedUser !== user));
                            }}
                        />
                    </Tag>
                ))}
            </Flex>
        </FormControl>
    );
}
