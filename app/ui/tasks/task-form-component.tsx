'use client';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Textarea,
} from '@chakra-ui/react';
import { TaskTypes } from '../../types/client-task-models';
import { postTask, updateTask } from '@/app/api/task/route';
import { useForm } from 'react-hook-form';
import { IUser } from '@/app/types/client-user-model';
import CardAssignComponent from './card-assign-component';
import { useTranslations } from 'use-intl';
import GroupAssignComponent from '../groups/group-assign-component';
import { IGroup } from '@/app/types/client-group-model';

interface TaskFormProps {
    title?: string;
    id?: number;
    description?: string;
    type?: 0 | 1 | 2;
    modal: boolean;
    users: IUser[];
    groups: IGroup[];
    assignedUsers?: string[];
    onClose?: () => void;
    assignedGroup?: string;
}
interface TaskFormValues {
    title: string;
    description: string;
    type: 0 | 1 | 2;
    assignedUsers: string[];
}

export default function TaskFormComponent({
    id,
    title = '',
    description = '',
    type = 1,
    modal,
    assignedUsers = [],
    users = [],
    assignedGroup = '',
    groups,
    onClose,
}: TaskFormProps) {
    const t = useTranslations('All');

    const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>(assignedUsers);
    const [newAssignedGroup, setNewAssignedGroup] = useState<string>(assignedGroup);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TaskFormValues>({
        defaultValues: { title, description, type },
    });
    const assignHandler = (assignUser: string) => {
        if (assignUser.trim() && !newAssignedUsers.includes(assignUser)) {
            setNewAssignedUsers([...newAssignedUsers, assignUser]);
        }
    };
    const assignGroupHandler = (assignGroup: string) => {
        setNewAssignedGroup(assignGroup);
    };
    const onSubmit = async (data: TaskFormValues) => {
        const taskId = id || Date.now();
        if (id && onClose) {
            await updateTask(taskId, data.title, data.description, data.type, newAssignedUsers, newAssignedGroup);
            onClose();
        } else {
            await postTask(data.title, newAssignedGroup, data.description, data.type, newAssignedUsers);
            router.push('/task-management/task-list');
        }
    };

    return (
        <div className="flex justify-center">
            <Box
                className={clsx(' py-6 px-5', {
                    'w-full phone:w-4/5 tablet:w-2/3 laptop:w-[400px]': !modal,
                    'w-full ': modal,
                })}
            >
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
                        <FormHelperText>{t('enter_title')}</FormHelperText>
                    </FormControl>
                    <FormControl className="mb-4" isInvalid={!!errors.description}>
                        <FormLabel>{t('description')}</FormLabel>
                        <Textarea
                            focusBorderColor="#9F7AEA"
                            {...register('description', {
                                required: t('description_required'),
                                minLength: { value: 7, message: t('description_min_length') },
                            })}
                        />
                        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                        <FormHelperText>{t('enter_description')}</FormHelperText>
                    </FormControl>
                    <FormControl className="mb-4">
                        <FormLabel>{t('type')}</FormLabel>
                        <Slider
                            min={0}
                            max={2}
                            step={1}
                            defaultValue={type}
                            onChange={(val: 0 | 1 | 2) => setValue('type', val)}
                        >
                            <SliderTrack bg="purple.100">
                                <SliderFilledTrack bg="purple.500" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                        <FormHelperText className="flex justify-between">
                            <p>{t(TaskTypes.LowUrgency)}</p>
                            <p>{t(TaskTypes.MediumUrgency)}</p>
                            <p>{t(TaskTypes.HighUrgency)}</p>
                        </FormHelperText>
                    </FormControl>
                    <CardAssignComponent
                        users={users}
                        newAssignedUsers={newAssignedUsers}
                        setNewAssignedUsers={setNewAssignedUsers}
                        assignHandler={assignHandler}
                    />
                    {groups && (
                        <GroupAssignComponent
                            assignGroupHandler={assignGroupHandler}
                            setNewAssignedGroup={setNewAssignedGroup}
                            newAssignedGroup={newAssignedGroup}
                            groups={groups}
                        />
                    )}

                    <Button type="submit" className=" mt-4 float-end" colorScheme="purple">
                        {t('submit')}
                    </Button>
                </form>
            </Box>
        </div>
    );
}
