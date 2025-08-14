'use client'
import JobApplicationPage from '@/components/JobApplicationPage'
import UserJobApplication from '@/components/UserJobApplication'
import React from 'react'
import { useSelector } from 'react-redux'

export default function page() {
    const { User } = useSelector((state: any) => state.User)

    return (
        <div>
            {
                User?.role == 'company' ? <JobApplicationPage /> : <UserJobApplication />

            }
        </div>
    )
}
