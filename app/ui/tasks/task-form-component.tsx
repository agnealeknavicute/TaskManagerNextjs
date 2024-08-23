'use client';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Tag,
    TagCloseButton,
    TagLabel,
    Textarea,
} from '@chakra-ui/react';
import { TaskTypes } from '../../types/client-task-models';
import { postTask, updateTask } from '@/app/api/route';
import { useForm } from 'react-hook-form';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import { IUser } from '@/app/types/client-user-model';

interface TaskFormProps {
    title?: string;
    id?: number;
    description?: string;
    type?: 0 | 1 | 2;
    modal: boolean;
    users: IUser[];
    assignedUsers?: string[];
    onClose?: () => void;
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
    onClose,
}: TaskFormProps) {
    const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>(assignedUsers);
    const [assignUser, setAssignUser] = useState<string>('');
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TaskFormValues>({
        defaultValues: { title, description, type },
    });
    const assignHandler = () => {
        if (assignUser.trim()) {
            setNewAssignedUsers([...newAssignedUsers, assignUser]);
            setAssignUser('');
        }
    };
    const onSubmit = async (data: TaskFormValues) => {
        const taskId = id || Date.now();
        if (id && onClose) {
            await updateTask(taskId, data.title, data.description, data.type, newAssignedUsers);
            onClose();
        } else {
            await postTask(data.title, data.description, data.type, newAssignedUsers);
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
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            focusBorderColor="#9F7AEA"
                            {...register('title', {
                                required: 'Title is required',
                                minLength: { value: 3, message: 'Title should be at least 3 characters long' },
                            })}
                        />
                        <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                        <FormHelperText>Enter the short title of the task</FormHelperText>
                    </FormControl>
                    <FormControl className="mb-4" isInvalid={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            focusBorderColor="#9F7AEA"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: { value: 7, message: 'Description should be at least 7 characters long' },
                            })}
                        />
                        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                        <FormHelperText>Enter the description of the task</FormHelperText>
                    </FormControl>
                    <FormControl className="mb-4">
                        <FormLabel>Type</FormLabel>
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
                            <p>{TaskTypes.LowUrgency}</p>
                            <p>{TaskTypes.MediumUrgency}</p>
                            <p>{TaskTypes.HighUrgency}</p>
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Assigned users</FormLabel>
                        <AutoComplete
                            onChange={(value: string) => {
                                setAssignUser(value);
                            }}
                            openOnFocus
                        >
                            <Flex>
                                <AutoCompleteInput colorScheme="purple" variant="outline" />
                                <Button onClick={assignHandler} className="ml-2">
                                    Add
                                </Button>
                            </Flex>

                            <AutoCompleteList>
                                {users.map((user, ind) => (
                                    <AutoCompleteItem
                                        value={user.username}
                                        key={`option-${ind}`}
                                        textTransform="capitalize"
                                    >
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
                                            setNewAssignedUsers(
                                                newAssignedUsers.filter((assignedUser) => assignedUser !== user),
                                            );
                                        }}
                                    />
                                </Tag>
                            ))}
                        </Flex>
                    </FormControl>
                    <Button type="submit" className=" mt-4 float-end" colorScheme="purple">
                        Submit
                    </Button>
                </form>
            </Box>
        </div>
    );
}
