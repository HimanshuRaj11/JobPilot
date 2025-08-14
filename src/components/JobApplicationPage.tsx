'use client'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const getStatusColor = (status: any['status']) => {
    switch (status) {
        case 'applied':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'reviewing':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'shortlisted':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'rejected':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'hired':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function JobApplicationPage() {
    const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');


    const [Applications, setApplications] = useState([]);

    const filteredApplications = Applications.filter((app: any) => {
        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
        const matchesSearch = app.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });



    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const prevStatus = selectedApplication.status
        try {
            setSelectedApplication((prev: any) => ({
                ...prev,
                status: e.target.value
            }))
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/applications/status_update`, { id: selectedApplication.id, status: e.target.value }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error: any) {
            setSelectedApplication((prev: any) => ({
                ...prev,
                status: prevStatus
            }))
            toast.error(error.response.data.message)
        }

    }


    const getJobs = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/applications`, { withCredentials: true })
            setApplications(data.Applications)
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getJobs()
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                    <p className="text-gray-600 mt-2">Review and manage job applications for your company</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Applications List */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm border">
                            {/* Search and Filter */}
                            <div className="p-4 border-b">
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full mt-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="reviewing">Reviewing</option>
                                    <option value="shortlisted">Shortlisted</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="hired">Hired</option>
                                </select>
                            </div>

                            {/* Applications List */}
                            <div className="divide-y max-h-96 overflow-y-auto">
                                {filteredApplications.length > 0 && filteredApplications?.map((application: any) => {
                                    const ApplicationUser = application?.user
                                    const ApplicationJob = application?.job

                                    return (
                                        <div
                                            key={application.id}
                                            onClick={() => setSelectedApplication(application)}
                                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedApplication?.id === application.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                                }`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{ApplicationUser.name}</h3>
                                                    <p className="text-sm text-gray-600">{ApplicationJob.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{moment(application.appliedAt).format('DD-MM-YYYY')}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-md border ${getStatusColor(application.status)}`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3">
                        {selectedApplication ? (
                            <div className="bg-white rounded-lg shadow-sm border">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.user.name}</h2>
                                            <p className="text-lg text-gray-600">{selectedApplication.job.role}</p>
                                            <p className="text-sm text-gray-500">{selectedApplication.department} Department</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <select
                                                value={selectedApplication.status}
                                                onChange={handleStatusChange}
                                                // onChange={(e) => updateApplicationStatus(selectedApplication.id, e.target.value)}
                                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewing">Reviewing</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="hired">Hired</option>
                                            </select>
                                            <span className={`px-3 py-2 text-sm rounded-md border ${getStatusColor(selectedApplication.status)}`}>
                                                {selectedApplication.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">Email:</span> {selectedApplication.user.email}</p>
                                                <p><span className="font-medium">Phone:</span> {selectedApplication.user.phone}</p>
                                                <p><span className="font-medium">Applied:</span>{moment(selectedApplication.appliedAt).format('DD-MM-YYYY')}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Job Details</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium">Experience:</span> {selectedApplication.experience} years</p>
                                                <p><span className="font-medium">Salary Range:</span> Rs. {selectedApplication.job.minSalary} - {selectedApplication.job.maxSalary}</p>
                                                <p><span className="font-medium">Availability:</span> {selectedApplication.availability}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}

                                    {/* <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedApplication.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div> */}

                                    {/* Education */}

                                    {/* <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                                        <div className="space-y-3">
                                            {selectedApplication.education.map((edu, index) => (
                                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                                                    <p className="text-sm text-gray-600">{edu.institution}</p>
                                                    <p className="text-xs text-gray-500">Graduated: {edu.year}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}

                                    {/* Cover Letter */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Cover Letter</h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 leading-relaxed">{selectedApplication.coverLetter}</p>
                                        </div>
                                    </div>

                                    {/* Resume */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>
                                        <div className="flex items-center gap-3 p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{selectedApplication.resume}</p>
                                                <p className="text-sm text-gray-500">PDF Document</p>
                                            </div>
                                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                                                Download
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 border-t">
                                        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                            Schedule Interview
                                        </button>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                            Send Message
                                        </button>
                                        <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                                            Add Notes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm border h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                                    <p className="text-gray-500">Choose an application from the list to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}