"use client";

import React, { useState } from "react";

export default function JobPostForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");
    const [employmentType, setEmploymentType] = useState("Full-time");
    const [role, setRole] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("2-5 years");
    const [remote, setRemote] = useState(false);
    const [skills, setSkills] = useState("");
    const [requirements, setRequirements] = useState("");
    const [benefits, setBenefits] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function validate() {
        if (!title.trim()) return "Title is required";
        if (minSalary && maxSalary && Number(minSalary) > Number(maxSalary))
            return "Min salary cannot be greater than max salary";
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        setLoading(true);

        try {
            const payload = {
                title,
                description,

                location,
                minSalary: minSalary ? Number(minSalary) : undefined,
                maxSalary: maxSalary ? Number(maxSalary) : undefined,
                employmentType,
                role,
                experienceLevel,
                remote,
                skills,
                requirements,
                benefits,
            };

            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data?.message || "Failed to post job");

            setSuccess("Job posted successfully");
            // optionally clear form
            setTitle("");
            setDescription("");

            setLocation("");
            setMinSalary("");
            setMaxSalary("");
            setRole("");
            setSkills("");
            setRequirements("");
            setBenefits("");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6  rounded-2xl ">
            <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>

            {error && (
                <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>
            )}
            {success && (
                <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="e.g. Senior Full Stack Developer"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="A clear and concise description of the role"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="City, Country"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Min Salary (₹)</label>
                        <input
                            type="number"
                            value={minSalary}
                            onChange={(e) => setMinSalary(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="e.g. 500000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Max Salary (₹)</label>
                        <input
                            type="number"
                            value={maxSalary}

                            onChange={(e) => setMaxSalary(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="e.g. 1200000"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Employment Type</label>
                        <select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                            <option>Temporary</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Experience Level</label>
                        <select
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            <option>Freshers</option>
                            <option>1-2 years</option>
                            <option>2-5 years</option>
                            <option>5+ years</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={remote}
                                onChange={(e) => setRemote(e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            />
                            <span className="text-sm">Remote OK</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="e.g. Backend Engineer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                    <input
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="Next.js, Node.js, TypeScript"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Requirements</label>
                    <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="What are the must-have requirements?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Benefits</label>
                    <textarea
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                        rows={2}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="Health insurance, PTO, etc."
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Posting..." : "Post Job"}
                    </button>
                </div>
            </form>
        </div>
    );
}
