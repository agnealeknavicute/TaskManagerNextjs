'use client';
import React from 'react';
import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface TaskCardMenuProps {
    menuTitle: string;
    children: React.ReactNode;
}

export function TaskCardMenu(props: TaskCardMenuProps) {
    return (
        <Menu>
            <MenuButton size="xs" colorScheme="purple" as={Button} rightIcon={<ChevronDownIcon />}>
                {props.menuTitle}
            </MenuButton>
            <MenuList>{props.children}</MenuList>
        </Menu>
    );
}
