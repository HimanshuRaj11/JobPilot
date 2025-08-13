// components/HiringDashboard.tsx
"use client";

import { Briefcase, Users, CalendarCheck, Plus } from "lucide-react";

export default function DashboardOverview() {
    return (
        <div className="w-full min-h-screen p-6">
            {/* Header */}


            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Briefcase className="text-blue-600" size={28} />
                        <div>
                            <p className="text-sm text-gray-500">Open Positions</p>
                            <p className="text-xl font-bold text-gray-800">5</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Users className="text-green-600" size={28} />
                        <div>
                            <p className="text-sm text-gray-500">Total Applicants</p>
                            <p className="text-xl font-bold text-gray-800">48</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                    <div className="flex items-center gap-3">
                        <CalendarCheck className="text-purple-600" size={28} />
                        <div>
                            <p className="text-sm text-gray-500">Interviews Scheduled</p>
                            <p className="text-xl font-bold text-gray-800">7</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Job Posts
                </h2>
                <div className="space-y-4">
                    {[
                        { title: "Frontend Developer", applicants: 12, status: "Open" },
                        { title: "Backend Developer", applicants: 8, status: "Interviewing" },
                        { title: "UI/UX Designer", applicants: 5, status: "Closed" },
                    ].map((job, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between border-b pb-3 last:border-b-0"
                        >
                            <div>
                                <p className="font-medium text-gray-800">{job.title}</p>
                                <p className="text-sm text-gray-500">
                                    {job.applicants} applicants
                                </p>
                            </div>
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded ${job.status === "Open"
                                    ? "bg-green-100 text-green-700"
                                    : job.status === "Interviewing"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {job.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
