'use client';

import { signup } from '@/app/api/auth';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Spacer } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface SignupFormValues {
    username: string;
    password: string;
}

export default function SignupComponent() {
    const t = useTranslations('All');

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>();
    const onSubmit = async (data: SignupFormValues) => {
        const res = await signup({
            username: data.username,
            password: data.password,
        });
        if (res?.error) {
            console.log(res?.error);
            return;
        } else {
            return router.push('/auth-management/login');
        }
    };
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="pb-6 text-lg text-center">{t('signup')}</h1>

                <FormControl className="mb-4" isInvalid={!!errors.username}>
                    <FormLabel>{t('username')}</FormLabel>
                    <Input
                        type="text"
                        focusBorderColor="#9F7AEA"
                        {...register('username', {
                            required: t('username_required'),
                            minLength: { value: 5, message: t('username_min_length') },
                        })}
                    />
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    <FormHelperText>{t('enter_username')}</FormHelperText>
                </FormControl>

                <FormControl className="mb-4" isInvalid={!!errors.password}>
                    <FormLabel>{t('password')}</FormLabel>
                    <Input
                        type="password"
                        focusBorderColor="#9F7AEA"
                        {...register('password', {
                            required: t('password_required'),
                            minLength: { value: 7, message: t('password_min_length') },
                        })}
                    />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    <FormHelperText>{t('enter_password')}</FormHelperText>
                </FormControl>

                <div className="flex">
                    <Button
                        onClick={() => router.push('/auth-management/login')}
                        className="mt-4"
                        variant="outline"
                        colorScheme="purple"
                    >
                        {t('login')}
                    </Button>
                    <Spacer />
                    <Button type="submit" className="mt-4" colorScheme="purple">
                        {t('submit')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
