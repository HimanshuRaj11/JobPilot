'use client'
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, Users, Star, Heart, ExternalLink } from 'lucide-react';
import axios from 'axios';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const JobListings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [savedJobs, setSavedJobs] = useState(new Set());
    const [Jobs, setJobs] = useState<any[]>([])

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
    const fetchJobs = useCallback(async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/job_list/?q=${encodeURIComponent(searchTerm)}`,);
            setJobs(data.jobs);
        } catch (error) {
            return
        }

    }, [searchTerm])

    const SuggestedJobs = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/suggested`,);
            setJobs(data.jobs);
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        if (!searchTerm) SuggestedJobs()
        fetchJobs()
    }, [fetchJobs])

    useEffect(() => {
        if (!searchTerm) SuggestedJobs()
    }, [])
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Dream Job</h1>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search jobs, companies, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Location Filter */}
                        {/* <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select> */}

                        {/* Job Type Filter */}
                        {/* <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Types</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select> */}
                    </div>

                    <div className="mt-4 text-gray-600">
                        {Jobs.length} jobs found
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6 flex justify-center flex-col">
                    {Jobs.map((job) => (
                        <div key={job.id} className='w-full my-2'>
                            <JobCard job={job} />
                        </div>
                    ))}

                    {Jobs.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {/* {Jobs.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                            Load More Jobs
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default JobListings;