'use client'
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, Users, Star, Heart, ExternalLink } from 'lucide-react';

const JobListings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [savedJobs, setSavedJobs] = useState(new Set());

    // Sample job data
    const jobs = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120k - $150k',
            logo: '🚀',
            description: 'Join our team to build cutting-edge web applications using React, TypeScript, and modern frameworks.',
            tags: ['React', 'TypeScript', 'JavaScript', 'CSS'],
            postedDate: '2 days ago',
            applicants: 47,
            rating: 4.5,
            remote: true
        },
        {
            id: 2,
            title: 'Product Manager',
            company: 'Innovation Labs',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$100k - $130k',
            logo: '💡',
            description: 'Lead product strategy and work cross-functionally to deliver exceptional user experiences.',
            tags: ['Strategy', 'Analytics', 'Agile', 'Leadership'],
            postedDate: '1 week ago',
            applicants: 23,
            rating: 4.2,
            remote: false
        },
        {
            id: 3,
            title: 'UX/UI Designer',
            company: 'Design Studio Pro',
            location: 'Austin, TX',
            type: 'Contract',
            salary: '$80k - $95k',
            logo: '🎨',
            description: 'Create beautiful and intuitive user interfaces for mobile and web applications.',
            tags: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
            postedDate: '3 days ago',
            applicants: 31,
            rating: 4.7,
            remote: true
        },
        {
            id: 4,
            title: 'Backend Engineer',
            company: 'CloudTech Solutions',
            location: 'Seattle, WA',
            type: 'Full-time',
            salary: '$110k - $140k',
            logo: '☁️',
            description: 'Build scalable backend systems and APIs to support millions of users worldwide.',
            tags: ['Node.js', 'Python', 'AWS', 'Docker'],
            postedDate: '5 days ago',
            applicants: 62,
            rating: 4.3,
            remote: true
        },
        {
            id: 5,
            title: 'Data Scientist',
            company: 'AI Innovations',
            location: 'Boston, MA',
            type: 'Full-time',
            salary: '$130k - $160k',
            logo: '📊',
            description: 'Analyze complex datasets and build machine learning models to drive business insights.',
            tags: ['Python', 'R', 'Machine Learning', 'SQL'],
            postedDate: '1 day ago',
            applicants: 18,
            rating: 4.6,
            remote: false
        },
        {
            id: 6,
            title: 'Marketing Coordinator',
            company: 'Growth Marketing Co.',
            location: 'Los Angeles, CA',
            type: 'Part-time',
            salary: '$45k - $55k',
            logo: '📈',
            description: 'Execute marketing campaigns and coordinate with various teams to drive brand awareness.',
            tags: ['Social Media', 'Content', 'Analytics', 'SEO'],
            postedDate: '4 days ago',
            applicants: 29,
            rating: 4.1,
            remote: true
        }
    ];

    const locations = [...new Set(jobs.map(job => job.location))];
    const jobTypes = [...new Set(jobs.map(job => job.type))];

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesLocation = !selectedLocation || job.location === selectedLocation;
            const matchesType = !selectedType || job.type === selectedType;

            return matchesSearch && matchesLocation && matchesType;
        });
    }, [searchTerm, selectedLocation, selectedType]);

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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
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
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>

                        {/* Job Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Types</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4 text-gray-600">
                        {filteredJobs.length} jobs found
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {filteredJobs.map((job) => (
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
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    <span className="text-sm font-medium">{job.salary}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {job.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        <span>{job.applicants} applicants</span>
                                                    </div>
                                                    <span>{job.postedDate}</span>
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
                    ))}

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {filteredJobs.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                            Load More Jobs
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListings;