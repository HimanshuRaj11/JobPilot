"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface JobFormData {
    title: string;
    description?: string;
    location?: string;
    minSalary?: number;
    maxSalary?: number;
    employmentType?: string;
    role?: string;
    experienceLevel?: string;
    remote?: boolean;
    skills?: string;
    requirements?: string;
    benefits?: string;
}

export default function JobPostingForm() {
    const router = useRouter()
    const InitialFormData = {
        title: "",
        description: "",
        location: "",
        minSalary: undefined,
        maxSalary: undefined,
        employmentType: "",
        role: "",
        experienceLevel: "",
        remote: false,
        skills: "",
        requirements: "",
        benefits: "",
    }
    const [formData, setFormData] = useState<JobFormData>(InitialFormData);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;

        if (target instanceof HTMLInputElement && target.type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [target.name]: target.checked,
            }));
        }
        else if (target.type === "number") {
            setFormData((prev) => ({
                ...prev,
                [target.name]: target.value ? Number(target.value) : undefined,
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/post`, formData, { withCredentials: true })
            if (data.success) {
                router.push('/dashboard')
                toast.success(data.message)
                setFormData(InitialFormData)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 bg-white  rounded-lg space-y-4"
        >
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

            <div>
                <label className="block font-medium">Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div>
                <label className="block font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">Min Salary</label>
                    <input
                        type="number"
                        name="minSalary"
                        value={formData.minSalary}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Max Salary</label>
                    <input
                        type="number"
                        name="maxSalary"
                        value={formData.maxSalary}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium">Employment Type</label>
                <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="">Select type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Role</label>
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div>
                <label className="block font-medium">Experience Level</label>
                <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="">Select level</option>
                    <option value="fresher">Fresher</option>
                    <option value="1 year">1 year</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="5+ years">5+ years</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="remote"
                    checked={formData.remote}
                    onChange={handleChange}
                />
                <label className="font-medium">Remote</label>
            </div>

            <div>
                <label className="block font-medium">Skills</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Comma separated"
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div>
                <label className="block font-medium">Requirements</label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div>
                <label className="block font-medium">Benefits</label>
                <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Post Job
            </button>
        </form>
    );
}
