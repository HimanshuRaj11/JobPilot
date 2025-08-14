'use client'

import { useState, useMemo } from 'react'
import { Search, MapPin, Calendar, Star, Filter, Users, Briefcase } from 'lucide-react'

interface Candidate {
    id: string
    name: string
    title: string
    location: string
    experience: number
    skills: string[]
    rating: number
    availability: 'Available' | 'Busy' | 'Not Available'
    lastActive: string
    avatar: string
    summary: string
    hourlyRate: number
}

// Mock data
const mockCandidates: Candidate[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        experience: 6,
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        rating: 4.9,
        availability: 'Available',
        lastActive: '2 hours ago',
        avatar: '👩‍💻',
        summary: 'Passionate frontend developer with expertise in modern React ecosystem.',
        hourlyRate: 85
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        title: 'Full Stack Engineer',
        location: 'New York, NY',
        experience: 4,
        skills: ['Node.js', 'React', 'Python', 'AWS'],
        rating: 4.7,
        availability: 'Busy',
        lastActive: '1 day ago',
        avatar: '👨‍💻',
        summary: 'Full-stack developer specializing in scalable web applications.',
        hourlyRate: 75
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        title: 'UI/UX Designer & Developer',
        location: 'Austin, TX',
        experience: 5,
        skills: ['Figma', 'React', 'CSS', 'Design Systems'],
        rating: 4.8,
        availability: 'Available',
        lastActive: '30 minutes ago',
        avatar: '🎨',
        summary: 'Creative designer who codes, bridging the gap between design and development.',
        hourlyRate: 70
    },
    {
        id: '4',
        name: 'David Kim',
        title: 'Backend Developer',
        location: 'Seattle, WA',
        experience: 7,
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        rating: 4.6,
        availability: 'Available',
        lastActive: '4 hours ago',
        avatar: '⚙️',
        summary: 'Backend specialist with strong experience in enterprise applications.',
        hourlyRate: 90
    },
    {
        id: '5',
        name: 'Priya Patel',
        title: 'DevOps Engineer',
        location: 'Remote',
        experience: 8,
        skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
        rating: 4.9,
        availability: 'Not Available',
        lastActive: '1 week ago',
        avatar: '☁️',
        summary: 'DevOps expert focused on scalable infrastructure and automation.',
        hourlyRate: 95
    },
    {
        id: '6',
        name: 'Alex Thompson',
        title: 'Mobile Developer',
        location: 'Los Angeles, CA',
        experience: 3,
        skills: ['React Native', 'Swift', 'Flutter', 'Firebase'],
        rating: 4.5,
        availability: 'Available',
        lastActive: '6 hours ago',
        avatar: '📱',
        summary: 'Mobile app developer with cross-platform expertise.',
        hourlyRate: 65
    }
]

export default function FindCandidates() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')
    const [experienceRange, setExperienceRange] = useState<[number, number]>([0, 10])
    const [showFilters, setShowFilters] = useState(false)

    // Get all unique skills
    const allSkills = useMemo(() => {
        const skills = new Set<string>()
        mockCandidates.forEach(candidate => {
            candidate.skills.forEach(skill => skills.add(skill))
        })
        return Array.from(skills).sort()
    }, [])

    // Filter candidates
    const filteredCandidates = useMemo(() => {
        return mockCandidates.filter(candidate => {
            const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesSkills = selectedSkills.length === 0 ||
                selectedSkills.some(skill => candidate.skills.includes(skill))

            const matchesAvailability = availabilityFilter === 'all' ||
                candidate.availability === availabilityFilter

            const matchesExperience = candidate.experience >= experienceRange[0] &&
                candidate.experience <= experienceRange[1]

            return matchesSearch && matchesSkills && matchesAvailability && matchesExperience
        })
    }, [searchTerm, selectedSkills, availabilityFilter, experienceRange])

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        )
    }

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case 'Available': return 'bg-green-100 text-green-800'
            case 'Busy': return 'bg-yellow-100 text-yellow-800'
            case 'Not Available': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Find Candidates</h1>
                            <p className="mt-2 text-gray-600">Discover talented professionals for your projects</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-500">
                                <Users className="w-4 h-4 mr-1" />
                                {filteredCandidates.length} candidates found
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-80 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>

                            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search candidates..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Availability
                                    </label>
                                    <select
                                        value={availabilityFilter}
                                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All</option>
                                        <option value="Available">Available</option>
                                        <option value="Busy">Busy</option>
                                        <option value="Not Available">Not Available</option>
                                    </select>
                                </div>

                                {/* Experience Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience: {experienceRange[0]}-{experienceRange[1]} years
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={experienceRange[1]}
                                        onChange={(e) => setExperienceRange([experienceRange[0], parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Skills
                                    </label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {allSkills.map(skill => (
                                            <label key={skill} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSkills.includes(skill)}
                                                    onChange={() => toggleSkill(skill)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedSkills([])
                                        setAvailabilityFilter('all')
                                        setExperienceRange([0, 10])
                                    }}
                                    className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Candidates List */}
                    <div className="flex-1">
                        <div className="space-y-6">
                            {filteredCandidates.map(candidate => (
                                <div key={candidate.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="text-3xl">{candidate.avatar}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(candidate.availability)}`}>
                                                            {candidate.availability}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 font-medium">{candidate.title}</p>
                                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {candidate.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Briefcase className="w-4 h-4 mr-1" />
                                                            {candidate.experience} years exp
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {candidate.lastActive}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center mb-1">
                                                    {renderStars(candidate.rating)}
                                                    <span className="ml-1 text-sm text-gray-600">{candidate.rating}</span>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    ${candidate.hourlyRate}/hr
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-gray-600">{candidate.summary}</p>

                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {candidate.skills.map(skill => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-3">
                                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                                Contact Candidate
                                            </button>
                                            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                                                View Profile
                                            </button>
                                            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                ⭐ Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredCandidates.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}