'use client';

import { Link, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function CompanyFoundingForm({ CompanyRegisterData, setCompanyRegisterData, setSelectedStep }: { CompanyRegisterData: any, setCompanyRegisterData: any, setSelectedStep: any }) {

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setCompanyRegisterData((preVal: any) => ({
            ...preVal,
            [name]: value,
        }))
    }

    return (
        <div className="min-h-screen py-5 text-gray-800 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Organization Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Organization Type</label>
                    <select onChange={HandleChange} name='type' value={CompanyRegisterData.type} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option value={'Private'}>Private</option>
                        <option value={"Public"}>Public</option>
                        <option value={'Non-profit'}>Non-profit</option>
                    </select>
                </div>

                {/* Industry Types */}
                <div>
                    <label className="block text-sm font-medium mb-1">Industry Types</label>
                    <select onChange={HandleChange} value={CompanyRegisterData.industry} name='industry' className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option value={'IT'}>IT</option>
                        <option value={'Finance'}>Finance</option>
                        <option value={`Healthcare`}>Healthcare</option>
                        <option value={`Stock & Finance`}>Stock & Finance</option>
                    </select>
                </div>

                {/* Team Size */}
                <div>
                    <label className="block text-sm font-medium mb-1">Team Size</label>
                    <select onChange={HandleChange} value={CompanyRegisterData.size} name='size' className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option value={'1-10'}>1-10</option>
                        <option value={`11-50`}>11-50</option>
                        <option value={'51-100'}>51 - 100</option>
                        <option value={'100+'}>100+</option>
                    </select>
                </div>
            </div>

            {/* Year + Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Year of Establishment */}
                <div>
                    <label className="block text-sm font-medium mb-1">Year of Establishment</label>
                    <div className="relative">
                        <input
                            type="date"
                            name='established'
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={CompanyRegisterData.established ? CompanyRegisterData.established.toISOString().split("T")[0] : ""}
                            onChange={HandleChange}
                        />
                        <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Company Website */}
                <div>
                    <label className="block text-sm font-medium mb-1">Company Website</label>
                    <div className="relative">
                        <input
                            type="url"
                            name='websiteUrl'
                            value={CompanyRegisterData.websiteUrl}
                            onChange={HandleChange}
                            placeholder="Website url..."
                            className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Link className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Company Vision */}
            {/* <div className="mb-8">
                <label className="block text-sm font-medium mb-1">Company Vision</label>
                <textarea
                    rows={5}
                    placeholder="Tell us about your company vision..."
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                /> */}

            {/* Text format icons */}
            {/* <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                    <button className="hover:text-black font-bold">B</button>
                    <button className="italic hover:text-black">I</button>
                    <button className="underline hover:text-black">U</button>
                    <button className="hover:text-black">🔗</button>
                    <button className="hover:text-black">•</button>
                    <button className="hover:text-black">≡</button>
                </div> */}
            {/* </div> */}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
                <button onClick={() => setSelectedStep((pre: number) => (pre - 1))} className="border cursor-pointer border-gray-300 text-gray-600 px-5 py-2 rounded-md hover:bg-gray-100">
                    Previous
                </button>
                <button onClick={() => setSelectedStep((pre: number) => (pre + 1))} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
                    Save & Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
