'use client';

import { useState } from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    PlusCircle,
    X,
    ArrowRight,
    Link2Icon,
} from 'lucide-react';

const socialOptions = [
    { label: 'Facebook', value: 'facebook', icon: <Facebook className="w-4 h-4 mr-1" /> },
    { label: 'Twitter', value: 'twitter', icon: <Twitter className="w-4 h-4 mr-1" /> },
    { label: 'Instagram', value: 'instagram', icon: <Instagram className="w-4 h-4 mr-1" /> },
    { label: 'Youtube', value: 'youtube', icon: <Youtube className="w-4 h-4 mr-1" /> },
    { label: 'website', value: 'website', icon: <Link2Icon className="w-4 h-4 mr-1" /> },
];

type SocialLink = {
    platform: string;
    url: string;
};

export default function CompanySocialLinksDetails({ Company }: { Company: any }) {
    const [links, setLinks] = useState<SocialLink[]>([
        { platform: 'facebook', url: '' },
    ]);

    const handleAddLink = () => {
        setLinks([...links, { platform: 'facebook', url: '' }]);
    };

    const handleChange = (index: number, field: keyof SocialLink, value: string) => {
        const updatedLinks = [...links];
        updatedLinks[index][field] = value;
        setLinks(updatedLinks);
    };

    const handleRemove = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    const getPlatformIcon = (platform: string) =>
        socialOptions.find((s) => s.value === platform)?.icon || null;

    return (
        <div className="min-h-screen py-5 text-gray-800 bg-white">
            {links.map((link, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-sm font-medium mb-1">Social Link {index + 1}</label>
                    <div className="flex gap-2">
                        {/* Platform Select */}
                        <div className="relative w-1/3">
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={link.platform}
                                onChange={(e) => handleChange(index, 'platform', e.target.value)}
                            >
                                {socialOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-2 top-2.5">{getPlatformIcon(link.platform)}</div>
                        </div>

                        {/* URL Input */}
                        <input
                            type="url"
                            placeholder="Profile link/url..."
                            value={link.url}
                            onChange={(e) => handleChange(index, 'url', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemove(index)}
                            className="text-gray-400 hover:text-red-500"
                            type="button"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}

            {/* Add new link button */}
            <div className="mt-4 mb-8 text-center">
                <button
                    onClick={handleAddLink}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-1 mx-auto"
                >
                    <PlusCircle className="w-5 h-5" />
                    Add New Social Link
                </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
                <button className="border border-gray-300 text-gray-600 px-5 py-2 rounded-md hover:bg-gray-100">
                    Previous
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2">
                    Save & Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
