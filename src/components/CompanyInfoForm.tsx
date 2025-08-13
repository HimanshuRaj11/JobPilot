'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CompanyInfoForm({ CompanyRegisterData, setCompanyRegisterData, setSelectedStep, setBanner, setLogo }: { CompanyRegisterData: any, setCompanyRegisterData: any, setSelectedStep: any, setLogo: any, setBanner: any }) {


    const [previewLogo, setPreviewLogo] = useState<string>("");
    const [previewBanner, setPreviewBanner] = useState<string>("");

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Reads file as base64
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "logo" | "banner"
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const base64 = await fileToBase64(file) as string;

        if (file) {
            if (type === "logo") {
                setLogo(base64);
                setPreviewLogo(URL.createObjectURL(file));
            } else {
                setBanner(base64);
                setPreviewBanner(URL.createObjectURL(file));
            }
        }
    };

    const handleDrop = async (
        e: React.DragEvent<HTMLDivElement>,
        type: "logo" | "banner"
    ) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;

        const base64 = await fileToBase64(file) as string;
        if (file) {
            if (type === "logo") {
                setLogo(base64);
                setPreviewLogo(URL.createObjectURL(file));
            } else {
                setBanner(base64);
                setPreviewBanner(URL.createObjectURL(file));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCompanyRegisterData((preVal: any) => ({
            ...preVal,
            [name]: value,
        }))
    }

    return (
        <div className=" bg-white py-5 text-gray-800">

            {/* Upload Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Logo & Banner Image</h3>
                <div className="flex flex-col md:flex-row justify-between w-full">
                    {/* Upload Logo */}
                    <div className="flex flex-col items-center w-[30%]">
                        <div
                            className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center w-full cursor-pointer"
                            onDrop={(e) => handleDrop(e, "logo")}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("logoInput")?.click()}
                        >
                            {previewLogo ? (
                                <img src={previewLogo} alt="Preview" className="h-40 w-auto object-cover rounded-md" />
                            ) : (
                                <>
                                    <div className="text-3xl">⬆️</div>
                                    <p className="font-semibold mt-2">Browse photo or drop here</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        A photo larger than 400 pixels works best. Max photo size 5 MB.
                                    </p>
                                </>
                            )}
                            <input
                                type="file"
                                id="logoInput"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "logo")}
                            />
                        </div>
                    </div>

                    {/* Upload Banner */}

                    <div className="flex flex-col items-center w-[60%]">
                        <div
                            className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center w-full cursor-pointer"
                            onDrop={(e) => handleDrop(e, "banner")}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("bannerInput")?.click()}
                        >
                            {previewBanner ? (
                                <img src={previewBanner} alt="Preview" className="h-40 w-auto object-cover rounded-md" />
                            ) : (
                                <>
                                    <div className="text-3xl">⬆️</div>
                                    <p className="font-semibold mt-2">Browse photo or drop here</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Banner images optimal dimension 1520×400. Supported format JPEG, PNG. Max
                                        photo size 5 MB.
                                    </p>
                                </>
                            )}
                            <input
                                type="file"
                                id="bannerInput"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "banner")}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Company Info Fields */}
            <div className="space-y-4">
                {/* Company Name */}
                <div>
                    <label className="block text-sm mb-1 font-medium">Company name</label>
                    <input
                        name='name'
                        value={CompanyRegisterData.name}
                        onChange={HandleChange}
                        type="text"
                        placeholder='Enter your company name'
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                {/* About Us */}
                <div>
                    <label className="block text-sm mb-1 font-medium">About Us</label>
                    <textarea
                        name='description'
                        value={CompanyRegisterData.description}
                        onChange={HandleChange}
                        rows={5}
                        placeholder="Write down about your company here. Let the candidate know who we are..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    {/* Fake Rich Text Icons */}
                    <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
                        <button className="hover:text-black font-bold">B</button>
                        <button className="italic hover:text-black">I</button>
                        <button className="underline hover:text-black">U</button>
                        <button className="hover:text-black">🔗</button>
                        <button className="hover:text-black">•</button>
                        <button className="hover:text-black">≡</button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
                <button onClick={() => setSelectedStep((pre: number) => (pre + 1))} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all">
                    Save & Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>


        </div>
    );
}
