'use client'
import axios from 'axios';
import { Calendar, MapPin, Building2, Filter, Search, ExternalLink } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'


const getStatusColor = (status: string): string => {
    const colors = {
        applied: 'bg-blue-100 text-blue-800 border-blue-200',
        interview: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        offer: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
        withdrawn: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getJobTypeColor = (jobType: string): string => {
    const colors = {
        'full-time': 'bg-purple-100 text-purple-800',
        'part-time': 'bg-indigo-100 text-indigo-800',
        'contract': 'bg-orange-100 text-orange-800',
        'internship': 'bg-pink-100 text-pink-800'
    };
    return colors[jobType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};


export default function UserJobApplication() {

    const [Applications, setApplications] = useState([]);

    const getApplications = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/applications/user_applied`, { withCredentials: true })
            if (data.success) {
                setApplications(data.Applications)
            }
        } catch (error) {
            return error
        }
    }
    console.log(Applications);

    useEffect(() => {
        getApplications()
    }, [])
    return (
        <div className='px-24 mt-2 min-h-screen'>
            <h1>My Applications</h1>
            {
                Applications.length > 0 && Applications.map((application: any) => (
                    <div key={application.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.job.role}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Building2 className="w-4 h-4 mr-2" />
                                            <span className="font-medium">{application.job.company.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs capitalize font-medium ${getJobTypeColor(application.job.employmentType)}`}>
                                            {application.job.employmentType}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {application.job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Applied {moment(application.appliedAt).format('DD-MM-YYYY')}
                                    </div>
                                    {application.job.maxSalary && (
                                        <div className="font-medium text-green-600">
                                            {application.job.minSalary} -
                                            {application.job.maxSalary}
                                        </div>
                                    )}
                                </div>

                                {application.notes && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-gray-700">{application.notes}</p>
                                    </div>
                                )}
                            </div>

                            {application.applicationUrl && (
                                <div className="flex-shrink-0">
                                    <a
                                        href={application.applicationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Application
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            }


        </div>
    )
}
