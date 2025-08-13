import Link from "next/link";

// app/success/page.tsx (Next.js 13+ with App Router)
export default function SuccessPage() {
    return (
        <div className="h-[80vh] flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon Circle */}
                <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-10 h-10 text-blue-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-xl font-semibold text-gray-800">
                    🎉 Congratulations, Your profile is 100% complete!
                </h2>

                {/* Sub text */}
                <p className="mt-2 text-gray-500 text-sm">
                    Donec hendrerit, ante mattis pellentesque eleifend, tortor urna
                    malesuada ante, eget aliquam nulla augue hendrerit ligula. Nunc
                    mauris arcu, mattis sed sem vitae.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link href={'/dashboard'}>
                        <button className="px-5 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition">
                            View Dashboard
                        </button>
                    </Link>
                    <Link href={`/dashboard/settings`}>
                        <button className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
