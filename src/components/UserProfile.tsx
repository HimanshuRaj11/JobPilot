"use client";

import { useState } from "react";
import { User as UserIcon, Briefcase, Mail, Building, Edit } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";



export default function ProfileDashboard() {
    const { User } = useSelector((state: any) => state.User)
    const { Company } = useSelector((state: any) => state.Company)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 max-w-md w-full p-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                        {User?.image ? (
                            <img
                                src={User?.image}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <UserIcon size={48} />
                            </div>
                        )}
                    </div>

                    {/* Name & Role */}
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        {User?.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Briefcase size={14} />
                        {User?.role}
                    </p>
                </div>

                {/* Email */}
                <div className="mt-4 flex items-center gap-2 text-gray-600 justify-center">
                    <Mail size={16} />
                    <span className="text-sm">{User?.email}</span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 items-center">
                    <Link
                        href="/edit-profile"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-full transition"
                    >
                        <Edit size={16} /> Edit Profile
                    </Link>

                    {!Company && (
                        <Link
                            href="/company/register"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
                        >
                            <Building size={16} /> Register Company
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
