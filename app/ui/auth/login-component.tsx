'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Spacer } from '@chakra-ui/react';

interface LoginFormValues {
    username: string;
    password: string;
}

export default function LoginComponent() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();
    const onSubmit = async (data: LoginFormValues) => {
        const res = await signIn('credentials', {
            username: data.username,
            password: data.password,
            callbackUrl: '/task-management/task-list',
        });
        if (res?.error) {
            console.log(res?.error);
            return;
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="pb-6 text-lg text-center">Login</h1>

                <FormControl className="mb-4" isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        focusBorderColor="#9F7AEA"
                        {...register('username', {
                            required: 'Username is required',
                            minLength: { value: 5, message: 'Username should be at least 5 characters long' },
                        })}
                    />
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    <FormHelperText>Enter username</FormHelperText>
                </FormControl>
                <FormControl className="mb-4" isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        focusBorderColor="#9F7AEA"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 7, message: 'Password should be at least 7 characters long' },
                        })}
                    />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    <FormHelperText>Enter password</FormHelperText>
                </FormControl>
                <div className="flex">
                    <Button
                        onClick={() => router.push('/auth-management/signup')}
                        className=" mt-4 "
                        variant="outline"
                        colorScheme="purple"
                    >
                        Signup
                    </Button>
                    <Spacer />
                    <Button type="submit" className=" mt-4 " colorScheme="purple">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
