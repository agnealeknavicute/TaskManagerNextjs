'use client';
import { IGroup } from '@/app/types/client-group-model';
import { Flex, TagLabel, Tag, TagCloseButton, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteList, AutoCompleteItem } from '@choc-ui/chakra-autocomplete';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

interface GroupAssignComponentProps {
    groups: IGroup[];
    assignGroupHandler: (assignGroup: string) => void;
    newAssignedGroup: string;
    setNewAssignedGroup: (newAssignedGroup: string) => void;
}

export default function GroupAssignComponent({
    setNewAssignedGroup,
    groups,
    assignGroupHandler,
    newAssignedGroup,
}: GroupAssignComponentProps) {
    const t = useTranslations('All');

    const [assignGroup, setAssignGroup] = useState<string>('');

    return (
        <FormControl>
            <FormLabel>{t('assign_group')}</FormLabel>
            <AutoComplete
                onChange={(value: string) => {
                    setAssignGroup(value);
                }}
                openOnFocus
            >
                <Flex>
                    <AutoCompleteInput value={assignGroup} colorScheme="purple" variant="outline" />
                    <Button
                        onClick={() => {
                            assignGroupHandler(assignGroup);
                            setAssignGroup('');
                        }}
                        className="ml-2"
                    >
                        {t('add')}
                    </Button>
                </Flex>

                <AutoCompleteList>
                    {groups.map((group, ind) => (
                        <AutoCompleteItem value={group.title} key={`option-${ind}`} textTransform="capitalize">
                            {group.title}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
            <Flex className="mt-3">
                {newAssignedGroup && (
                    <Tag
                        className="mr-1"
                        size="md"
                        key={assignGroup}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="purple"
                    >
                        <TagLabel>{newAssignedGroup}</TagLabel>
                        <TagCloseButton
                            onClick={() => {
                                setNewAssignedGroup('');
                            }}
                        />
                    </Tag>
                )}
            </Flex>
        </FormControl>
    );
}
