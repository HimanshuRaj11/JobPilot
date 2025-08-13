"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";

export default function CompanyContactDetails() {
    const { Company } = useSelector((state: any) => state.Company)
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            {/* Contact Information */}
            <div>
                <h2 className="text-lg font-medium mb-4">Contact Information</h2>

                {/* Map Location */}
                <input
                    type="text"
                    value={Company?.location}
                    placeholder="Map Location"
                    className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-1 focus:ring-blue-500 outline-none"
                />

                {/* Phone */}
                <div className="flex items-center border rounded-md overflow-hidden mb-4">
                    <span className="px-3 py-2 bg-gray-100 border-r flex items-center gap-1">
                        <img
                            src="https://flagcdn.com/w20/in.png"
                            alt="in"
                            className="w-5 h-3"
                        />
                        +91
                    </span>
                    <input
                        type="tel"
                        placeholder="Phone number.."
                        value={Company?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-3 py-2 outline-none"
                    />
                </div>

                {/* Email */}
                <div className="flex items-center border rounded-md overflow-hidden mb-4">
                    <span className="px-3 py-2 bg-gray-100 border-r flex items-center">
                        📧
                    </span>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={Company?.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-3 py-2 outline-none"
                    />
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </div>

            {/* Change Password */}
            <div className="border-t pt-6">
                <h2 className="text-lg font-medium mb-4">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Current Password */}
                    <div className="relative">
                        <input
                            type={showPassword.current ? "text" : "password"}
                            placeholder="Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 pr-10 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => ({
                                    ...prev,
                                    current: !prev.current,
                                }))
                            }
                            className="absolute right-3 top-2.5 text-gray-500"
                        >
                            {showPassword.current ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            placeholder="Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 pr-10 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => ({
                                    ...prev,
                                    new: !prev.new,
                                }))
                            }
                            className="absolute right-3 top-2.5 text-gray-500"
                        >
                            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 pr-10 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => ({
                                    ...prev,
                                    confirm: !prev.confirm,
                                }))
                            }
                            className="absolute right-3 top-2.5 text-gray-500"
                        >
                            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Change Password
                </button>
            </div>

            {/* Delete Account */}
            <div className="border-t pt-6">
                <h2 className="text-lg font-medium mb-2">Delete Your Company</h2>
                <p className="text-gray-500 text-sm mb-4">
                    If you delete your Jobpilot account, you will no longer be able to get
                    information about matched jobs, following employers, and job alerts.
                    You will be removed from all services of Jobpilot.com.
                </p>
                <button className="flex items-center gap-2 text-red-600 hover:underline">
                    ❌ Close Account
                </button>
            </div>
        </div>
    );
}
