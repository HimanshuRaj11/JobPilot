'use client'
import CompanyRegister from '@/components/CompanyRegister'
import RegisterUser from '@/components/RegisterUser'
import React, { useState } from 'react'

export default function page() {
    const [activeTab, setActiveTab] = useState<"company" | "user">("user");

    return (
        <div className="w-full h-screen  flex flex-col items-center justify-center ">
            {/* Toggle Buttons */}
            <div className="flex space-x-4 mb-2 bg-white p-2 rounded-xl shadow">

                <button
                    onClick={() => setActiveTab("user")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "user"
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 hover:bg-gray-200"
                        }`}
                >
                    User
                </button>
                <button
                    onClick={() => setActiveTab("company")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === "company"
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 hover:bg-gray-200"
                        }`}
                >
                    Company
                </button>
            </div>

            {/* Form Section */}
            <div className=" w-full flex justify-center items-center">
                {activeTab === "company" ? <CompanyRegister /> : <RegisterUser />}
            </div>
        </div>
    );
}