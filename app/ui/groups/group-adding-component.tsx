'use client';

import { IUser } from '@/app/types/client-user-model';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Box } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import CardAssignComponent from '../users/users-assign-component';
import { useState } from 'react';
import { createGroup } from '@/app/api/group/route';

interface GroupFormValues {
    title: string;
}

export default function GroupAddingComponent({ users = [] }: { users: IUser[] }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GroupFormValues>();
    const t = useTranslations('All');
    const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>([]);

    const onSubmit = async (data: GroupFormValues) => {
        await createGroup(data.title, newAssignedUsers);
        reset();
        setNewAssignedUsers([]);
    };
    const assignHandler = (assignUser: string) => {
        if (assignUser.trim() && !newAssignedUsers.includes(assignUser)) {
            setNewAssignedUsers([...newAssignedUsers, assignUser]);
        }
    };
    return (
        <>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className="mb-4" isInvalid={!!errors.title}>
                        <FormLabel>{t('title')}</FormLabel>
                        <Input
                            type="text"
                            focusBorderColor="#9F7AEA"
                            {...register('title', {
                                required: t('title_required'),
                                minLength: { value: 3, message: t('title_min_length') },
                            })}
                        />
                        <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                    </FormControl>
                    <CardAssignComponent
                        users={users}
                        newAssignedUsers={newAssignedUsers}
                        setNewAssignedUsers={setNewAssignedUsers}
                        assignHandler={assignHandler}
                    />
                    <Button type="submit" className=" mt-4 float-end" colorScheme="purple">
                        {t('submit')}
                    </Button>
                </form>
            </Box>
        </>
    );
}
