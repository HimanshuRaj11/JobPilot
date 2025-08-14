'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FetchUser } from "@/app/Redux/Slice/User.slice";
import { FetchCompany } from '@/app/Redux/Slice/Company.slice';
// Zod validation schema
const UserRegisterSchema = z.object({
    name: z.string()
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),

    email: z.string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),

    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number must be exactly 10 digits')
        .regex(/^\d+$/, 'Phone number should only contain digits'),

    gender: z.enum(['Male', 'Female', 'Other']).optional()
        .refine(val => val !== undefined, {
            message: 'Please select a gender'
        }),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

    confirmPassword: z.string()
        .min(1, 'Please confirm your password'),

    agreeToTerms: z.boolean()
        .refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof UserRegisterSchema>;

const RegisterUser = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<FormData>({
        resolver: zodResolver(UserRegisterSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            gender: undefined,
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        }
    });

    const selectedGender = watch('gender');

    const handleGenderSelect = (gender: 'Male' | 'Female' | 'Other') => {
        setValue('gender', gender, { shouldValidate: true });
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                phone: data.phone,
                gender: data.gender,
                role: "user",
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`,
                payload
            );

            if (response.data.success) {
                dispatch(FetchUser() as any);
                dispatch(FetchCompany() as any);
                router.push('/');
                toast.success(response.data.message || 'Registration successful!');
            } else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error: any) {
            const errorMessage = 'Something went wrong. Please try again!';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterClick = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div className="w-[75%] flex h-[90vh] items-center justify-center bg-[#f9faff] p-4 rounded-2xl shadow-lg">
            <div className="w-full max-w-5xl flex overflow-hidden justify-center items-center">
                {/* Left Gradient Placeholder */}
                <div className="w-1/2 hidden h-[80vh] md:flex items-center justify-center bg-gradient-to-b from-pink-200 to-purple-600">
                    <span className="text-lg text-white font-semibold">IMG Placeholder</span>
                </div>

                {/* Right Register Form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register To find Jobs</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register('name')}
                                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter Your Full Name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Mobile No */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Mobile No <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center border border-gray-300 rounded-md px-2 bg-white">
                                    <img
                                        src="https://flagcdn.com/in.svg"
                                        alt="India"
                                        className="w-5 h-4 mr-1"
                                    />
                                    <span className="text-sm">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    className={`flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Official Email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-3">
                                {(['Male', 'Female', 'Other'] as const).map((gender) => (
                                    <button
                                        type="button"
                                        key={gender}
                                        onClick={() => handleGenderSelect(gender)}
                                        className={`px-4 py-2 rounded-full border transition-all ${selectedGender === gender
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'border-gray-300 text-gray-700 hover:bg-blue-50'
                                            }`}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                            {errors.gender && (
                                <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm text-gray-700 mb-1">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Terms & Checkbox */}
                        <div>
                            <div className="flex items-start space-x-2 text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    {...register('agreeToTerms')}
                                    className="mt-1"
                                />
                                <p>
                                    All your information is collected, stored and processed as per our data
                                    processing guidelines. By signing on, you agree to our{' '}
                                    <Link href="#" className="text-blue-500 underline">
                                        privacy policy
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="#" className="text-blue-500 underline">
                                        terms of use
                                    </Link>
                                    .
                                </p>
                            </div>
                            {errors.agreeToTerms && (
                                <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms.message}</p>
                            )}
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            onClick={handleRegisterClick}
                            disabled={!isValid || isLoading}
                            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-full hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;