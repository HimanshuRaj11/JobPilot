'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { FetchUser } from "@/app/Redux/Slice/User.slice";
import { FetchCompany } from "@/app/Redux/Slice/Company.slice";
const CompanyLogin = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [LoginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData((preVal) => ({
            ...preVal, [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`, { email: LoginData.email, password: LoginData.password })
            if (data.success) {
                router.push('/')
                dispatch(FetchUser() as any);
                dispatch(FetchCompany() as any);
                toast.success(data.message)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className=" w-[75%] flex items-center justify-center bg-[#f9faff] p-10  rounded-2xl shadow-xl ">
            <div className="w-full max-w-4xl flex overflow-hidden">
                {/* Left Gradient Placeholder */}
                <div className="w-1/2 hidden bg-gradient-to-b from-pink-200 to-purple-600 md:flex items-center justify-center">
                    <span className="text-lg text-white font-semibold">IMG Placeholder</span>
                </div>

                {/* Right Login Form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                value={LoginData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="text-left text-sm">
                            <button type="button" className="text-blue-500 hover:underline">
                                Login with OTP
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Enter your password</label>
                            <input
                                type="password"
                                name='password'
                                value={LoginData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="text-left">
                            <a href="#" className="text-xs text-blue-500 hover:underline">
                                🔐 Forgot Password ?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-all"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-blue-500 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompanyLogin;
