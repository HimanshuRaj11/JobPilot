'use client'
import JobCard from '@/components/JobCard'
import Loader from '@/components/Loader'
import axios from 'axios'
import { Link } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function page() {
    // const { User } = useSelector((state: any) => state.User)
    const [Jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const GetJobs = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/jobs/my_jobs`, { withCredentials: true })
        if (data.success) {
            setJobs(data.jobs)
            console.log(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        GetJobs()
    }, [])
    return (

        <div className='w-full flex justify-center '>
            <div className='w-full m-5 md:w-[80%] lg:w-[60%]'>
                {
                    loading && <Loader />
                }
                {Jobs?.length > 0 ? (
                    Jobs?.map((job: any) => (
                        <div key={job.id}>
                            <JobCard job={job} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No jobs found</p>
                )}
            </div>
        </div>
    )
}
