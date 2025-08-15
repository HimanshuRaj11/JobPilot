
"use client";

import VerifyEmailContent from "@/components/VerifyEmailContent";
import { Suspense } from "react";


export default function page() {
    return (
        <Suspense fallback={<div className="p-4 text-gray-500">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
