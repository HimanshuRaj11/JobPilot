'use client'
import CompanySettingsInfo from '@/components/CompanySettingsInfo'
import React, { useState } from 'react'
import { AtSign, BriefcaseBusiness, CircleUserRound, Globe, UserRound } from 'lucide-react';
import CompanyFoundingDetails from '@/components/CompanyFoundingDetails';
import CompanySocialLinksDetails from '@/components/CompanySocialLinksDetails';
import CompanyContactDetails from '@/components/CompanyContactDetails';
import { useSelector } from 'react-redux';

export default function page() {
    const { Company } = useSelector((state: any) => state.Company);
    const [selectedStep, setSelectedStep] = useState(0);
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
            <div className="w-full flex justify-center items-center ">
                <div className="w-[90%] flex justify-center flex-col items-center">
                    <div className="w-full">
                        <h1 className='font-bold text-2xl mb-5'>Setting</h1>
                    </div>

                    <div className="flex justify-center items-center space-x-10 border-b w-full">
                        {steps.map((step, i) => (
                            <div key={i} onClick={() => setSelectedStep(i)} className={`flex items-center transition-all space-x-1 text-sm cursor-pointer ${selectedStep === i ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                <span className='mr-1'>{step.icon}</span>{step.title}
                            </div>
                        ))}
                    </div>

                    <div className="w-full">
                        {selectedStep === 0 && <CompanySettingsInfo Company={Company} />}
                        {selectedStep === 1 && <CompanyFoundingDetails Company={Company} />}
                        {selectedStep === 2 && <CompanySocialLinksDetails Company={Company} />}
                        {selectedStep === 3 && <CompanyContactDetails Company={Company} />}

                    </div>
                </div>
            </div>

        </div>
    )
}
