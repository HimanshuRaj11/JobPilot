'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FetchCompany } from '@/app/Redux/Slice/Company.slice';
import { useDispatch } from 'react-redux';
import Loader from './Loader';

export default function ContactForm({ setSuccess, CompanyRegisterData, setCompanyRegisterData, setSelectedStep, logo, banner }: { setSuccess: (success: boolean) => void, CompanyRegisterData: any, setCompanyRegisterData: any, setSelectedStep: any, logo: any, banner: any }) {


    const [loading, setLoading] = useState(false)
    const [countryCode, setCountryCode] = useState('+91');
    const dispatch = useDispatch();
    const countryOptions = [
        { code: '+880', label: 'Bangladesh', flag: '🇧🇩' },
        { code: '+91', label: 'India', flag: '🇮🇳' },
        { code: '+1', label: 'USA', flag: '🇺🇸' },
    ];
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCompanyRegisterData((preVal: any) => ({
            ...preVal,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/company/register`, { CompanyRegisterData, logo, banner }, { withCredentials: true })
            if (data.success) {
                setSuccess(true)
                dispatch(FetchCompany() as any);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
            return
        }
    }

    return (
        <div className="min-h-screen py-5 text-gray-800 bg-white">
            {
                loading && <Loader />
            }
            {/* Map Location */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Map Location</label>
                <input
                    type="text"
                    name='location'
                    value={CompanyRegisterData.location}
                    onChange={HandleChange}
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <div className="flex">
                    {/* Country Code Select */}
                    <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="border border-gray-300 rounded-l-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {countryOptions.map((option) => (
                            <option key={option.code} value={option.code}>
                                {option.flag} {option.code}
                            </option>
                        ))}
                    </select>

                    {/* Phone Number */}
                    <input
                        type="tel"
                        value={CompanyRegisterData.phone}
                        name='phone'
                        onChange={HandleChange}
                        placeholder="Phone number.."
                        className="w-full border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="mb-8">
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="email"
                        name='email'
                        value={CompanyRegisterData.email}
                        onChange={HandleChange}
                        placeholder="Email address"
                        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
                <button onClick={() => setSelectedStep((pre: number) => (pre + 1))} className="border cursor-pointer border-gray-300 text-gray-600 px-5 py-2 rounded-md hover:bg-gray-100">
                    Previous
                </button>
                <button onClick={handleSubmit} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
                    Submit
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
