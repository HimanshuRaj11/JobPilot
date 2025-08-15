'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { FetchUser } from "@/app/Redux/Slice/User.slice";
import { toast } from 'react-toastify';

export default function page() {
    const params = useSearchParams();
    const token = params.get("token");
    const [message, setMessage] = useState("Verifying...");
    const dispatch = useDispatch()
    const router = useRouter()

    const verifyEmail = async () => {
        try {
            if (!token) {
                setMessage("Invalid verification link.");
                return;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verify-email?token=${encodeURIComponent(token as string)}`, { withCredentials: true })
            console.log(data);

            if (data.success) {
                toast.success(data.message)
                dispatch(FetchUser() as any);
                router.push('/')
            }
        } catch (error) {
            return error
        }
    }

    useEffect(() => {

        verifyEmail()
    }, []);
    return (
        <div>{message}</div>
    )
}
