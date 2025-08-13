"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CompanySettingsInfo({ Company }: { Company: any }) {
    const [companyName, setCompanyName] = useState("");
    const [about, setAbout] = useState("");

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Tabs */}


            {/* Logo & Banner Section */}
            <div className="mb-6">
                <h2 className="font-medium text-gray-800 mb-4">Logo & Banner Image</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Upload Logo */}
                    <div className="flex flex-col items-start">
                        <div className="w-32 h-32 relative rounded overflow-hidden border">
                            <img
                                src={`${Company?.logoUrl}`}
                                alt="Logo"
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">3.5 MB</p>
                        <div className="flex space-x-2 text-sm mt-1">
                            <button className="text-red-500 hover:underline">Remove</button>
                            <button className="text-blue-600 hover:underline">Replace</button>
                        </div>
                    </div>

                    {/* Banner Image */}
                    <div className="flex flex-col items-start flex-1">
                        <div className="w-full h-32 md:h-32 relative rounded overflow-hidden border">
                            <img
                                src={`${Company?.bannerUrl}`}
                                alt="Banner"
                                className=" object-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">4.3 MB</p>
                        <div className="flex space-x-2 text-sm mt-1">
                            <button className="text-red-500 hover:underline">Remove</button>
                            <button className="text-blue-600 hover:underline">Replace</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Name */}
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Company name</label>
                <input
                    type="text"
                    value={Company?.name}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder=""
                />
            </div>

            {/* About Us */}
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">About us</label>
                <textarea
                    value={Company?.description}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write down about your company here. Let the candidate know who we are..."
                    rows={5}
                    className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                ></textarea>
                {/* Toolbar buttons */}
                <div className="flex space-x-3 mt-2 text-gray-500">
                    <button>B</button>
                    <button>I</button>
                    <button>U</button>
                    <button>Link</button>
                    <button>• List</button>
                </div>
            </div>

            {/* Save Button */}
            <div>
                <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Save Change
                </button>
            </div>
        </div>
    );
}
