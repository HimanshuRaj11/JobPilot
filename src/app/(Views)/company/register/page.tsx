"use client";
import CompanyFoundingForm from '@/components/CompanyFoundingInfoForm';
import CompanyInfoForm from '@/components/CompanyInfoForm'
import ContactForm from '@/components/ContactForm';
import SuccessPage from '@/components/SetUpSuccess';
import SocialLinksForm from '@/components/SocialLinksForm';
import { AtSign, BriefcaseBusiness, CircleUserRound, Globe, UserRound } from 'lucide-react';
import React, { useState } from 'react'

interface CompanyState {
    name: string;
    websiteUrl?: string;

    location?: string;
    established?: Date | null;
    phone?: string;
    email?: string;
    industry?: string;
    size?: string;
    type?: "",

    description?: string;
    Address: any[];
    SocialLinks: any[];
}
export default function page() {
    const [selectedStep, setSelectedStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const [logo, setLogo] = useState<string | null>(null);
    const [banner, setBanner] = useState<string | null>(null);

    const [CompanyRegisterData, setCompanyRegisterData] = useState<CompanyState>({
        name: "",
        websiteUrl: "",
        location: "",
        established: null,
        phone: "",
        email: "",
        industry: "",
        type: "",
        size: "",
        description: "",
        Address: [],
        SocialLinks: [],
    });

    const steps = [{
        title: 'Company Info',
        icon: <UserRound />
    },
    {
        title: 'Founding Info',
        icon: <CircleUserRound />
    },
    {
        title: 'Social Media Profile',
        icon: <Globe />
    },
    {
        title: 'Contact',
        icon: <AtSign />
    }
    ]
    return (
        <div>
            <div className="flex items-center justify-between h-20 px-16 ">
                <div className="text-2xl font-semibold text-blue-600 flex items-center space-x-2">

                </div>
                {/* <div className="text-sm text-gray-500">
                    <span>Setup Progress</span>
                    <div className="w-32 h-1 bg-gray-200 rounded-full mt-1">
                        <div className="w-1/6 h-full bg-blue-500 rounded-full"></div>
                    </div>
                </div> */}
            </div>
            {
                !success ? (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-[60%] flex justify-center flex-col items-center">

                            <div className="flex justify-center items-center space-x-10 border-b w-full">
                                {steps.map((step, i) => (
                                    <div key={i} onClick={() => setSelectedStep(i)} className={`flex items-center transition-all space-x-1 text-sm cursor-pointer ${selectedStep === i ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                        <span className='mr-1'>{step.icon}</span>{step.title}
                                    </div>
                                ))}
                            </div>

                            <div className="w-full">
                                {selectedStep === 0 && <CompanyInfoForm CompanyRegisterData={CompanyRegisterData} setCompanyRegisterData={setCompanyRegisterData} setSelectedStep={setSelectedStep} setLogo={setLogo} setBanner={setBanner} />}
                                {selectedStep === 1 && <CompanyFoundingForm CompanyRegisterData={CompanyRegisterData} setCompanyRegisterData={setCompanyRegisterData} setSelectedStep={setSelectedStep} />}
                                {selectedStep === 2 && <SocialLinksForm CompanyRegisterData={CompanyRegisterData} setCompanyRegisterData={setCompanyRegisterData} setSelectedStep={setSelectedStep} />}
                                {selectedStep === 3 && <ContactForm setSuccess={setSuccess} CompanyRegisterData={CompanyRegisterData} setCompanyRegisterData={setCompanyRegisterData} setSelectedStep={setSelectedStep} logo={logo} banner={banner} />}

                            </div>
                        </div>
                    </div>

                ) : (
                    <SuccessPage />
                )
            }
        </div>
    )
}
