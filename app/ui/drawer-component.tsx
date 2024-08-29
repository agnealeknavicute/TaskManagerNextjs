'use client';

import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Text,
    List,
    ListItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import SignoutComponent from './auth/signout-component';
import { useTranslations } from 'next-intl';

interface DrawerComponentProps {
    roles: string[];
    assignedGroup: string;
}

export default function DrawerComponent({ roles, assignedGroup }: DrawerComponentProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const t = useTranslations('All');
    return (
        <>
            <Text className="hover:cursor-pointer" onClick={onOpen}>
                {t('open_menu')}
            </Text>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{t('more_actions')}</DrawerHeader>
                    <DrawerBody>
                        {roles && (
                            <List>
                                {roles.includes('admin') && (
                                    <ListItem className="my-4 cursor-pointer">
                                        <a href="/users-management/users-list" className="px-4 ">
                                            {t('user_list')}
                                        </a>
                                    </ListItem>
                                )}
                                <ListItem className="my-4">
                                    <a href="/task-management/task-list" className="px-4 hover:cursor-pointer">
                                        {t('task_list')}
                                    </a>
                                </ListItem>
                                {roles.includes('admin') || roles.includes('manager') ? (
                                    <ListItem className="my-4">
                                        <a href="/group-management/group-list" className="px-4 hover:cursor-pointer">
                                            {t('group_list')}
                                        </a>
                                    </ListItem>
                                ) : (
                                    ''
                                )}

                                <ListItem className="my-4">
                                    {roles.includes('admin') && (
                                        <Link href="/task-management/task-adding" className="px-4 hover:cursor-pointer">
                                            {t('new_task')}
                                        </Link>
                                    )}
                                </ListItem>
                            </List>
                        )}
                        <SignoutComponent />
                        <Text className="mt-6 font-semibold">
                            {t('current_role')}: {roles}
                        </Text>
                        <Text className=" font-semibold">
                            {t('assigned_group')}: {assignedGroup}
                        </Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
