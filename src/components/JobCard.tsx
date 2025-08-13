'use client'
import { Building, Clock, DollarSign, ExternalLink, Heart, IndianRupee, MapPin, Star, Users, } from 'lucide-react'
import React, { useState } from 'react'
import moment from 'moment'

export default function JobCard({ job }: { job: any }) {

    const [savedJobs, setSavedJobs] = useState(new Set());

    const toggleSaveJob = (jobId: any) => {
        setSavedJobs(prev => {
            const newSaved = new Set(prev);
            if (newSaved.has(jobId)) {
                newSaved.delete(jobId);
            } else {
                newSaved.add(jobId);
            }
            return newSaved;
        });
    };
    return (
        <div>
            <div key={job.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                                    {job.logo}
                                </div>
                            </div>

                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Building className="w-4 h-4 mr-1" />
                                            <span className="font-medium">{job.company}</span>
                                            <div className="flex items-center ml-4">
                                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                <span className="text-sm">{job.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <button
                                        onClick={() => toggleSaveJob(job.id)}
                                        className={`p-2 rounded-lg transition-colors ${savedJobs.has(job.id)
                                            ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                            : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                {/* Location and Job Type */}
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className="flex items-center text-gray-500">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{job.location}</span>
                                        {job.remote && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Remote</span>}
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{job.type}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <IndianRupee className="w-4 h-4" />
                                        <span className="text-sm font-medium">{job.minSalary} -  </span>

                                        <IndianRupee className="w-4 h-4" />
                                        <span className="text-sm font-medium"> {job.maxSalary} </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {/* {job.tags.map((tag: any, index: number) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))} */}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            <span>{job.applicants} applicants</span>
                                        </div>
                                        <span>Post On: {moment(job.createdAt).format('DD-MM-YYYY')}</span>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                                            View Details
                                        </button>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
                                            Apply Now
                                            <ExternalLink className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
