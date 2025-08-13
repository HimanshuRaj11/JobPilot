'use client';

import { Link, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CompanyFoundingDetails() {
    const [date, setDate] = useState('');
    const { Company } = useSelector((state: any) => state.Company)
    return (
        <div className="min-h-screen py-5 text-gray-800 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Organization Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Organization Type</label>
                    <select value={Company?.type} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option>Private</option>
                        <option>Public</option>
                        <option>Non-profit</option>
                    </select>
                </div>

                {/* Industry Types */}
                <div>
                    <label className="block text-sm font-medium mb-1">Industry Types</label>
                    <select value={Company?.industry} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option>IT</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                    </select>
                </div>

                {/* Team Size */}
                <div>
                    <label className="block text-sm font-medium mb-1">Team Size</label>
                    <select value={Company?.size} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select...</option>
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51+</option>
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Company Website */}
                <div>
                    <label className="block text-sm font-medium mb-1">Company Website</label>
                    <div className="relative">
                        <input
                            value={Company?.websiteUrl}
                            type="url"
                            placeholder="Website url..."
                            className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Link className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Company Vision */}
            <div className="mb-8">
                <label className="block text-sm font-medium mb-1">Company Vision</label>
                <textarea
                    rows={5}
                    placeholder="Tell us about your company vision..."
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                {/* Text format icons */}
                <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                    <button className="hover:text-black font-bold">B</button>
                    <button className="italic hover:text-black">I</button>
                    <button className="underline hover:text-black">U</button>
                    <button className="hover:text-black">🔗</button>
                    <button className="hover:text-black">•</button>
                    <button className="hover:text-black">≡</button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
                <button className="border border-gray-300 text-gray-600 px-5 py-2 rounded-md hover:bg-gray-100">
                    Previous
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
                    Save & Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
