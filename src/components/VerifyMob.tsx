'use client';

import React, { useState } from 'react';

const VerifyMobileModal = ({ setPopup }: { setPopup: any }) => {
    const [otp, setOtp] = useState('');

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                    <h2 className="text-lg font-semibold">Great! Almost done!</h2>
                    <p className="text-sm text-gray-700">Please verify your mobile no</p>
                </div>
                <hr />

                {/* Content */}
                <div className="px-6 py-6 space-y-4">
                    {/* Email Verification Info */}
                    <div className="flex items-start bg-green-100 rounded-lg p-3 space-x-3">
                        <div className="text-2xl">📧</div>
                        <p className="text-sm text-gray-800">
                            A verification link has been sent to your email. Please check your inbox and verify.
                        </p>
                    </div>

                    {/* OTP Instruction */}
                    <div className="flex items-start bg-red-100 rounded-lg p-3 space-x-3">
                        <div className="text-2xl">💬</div>
                        <p className="text-sm text-gray-800">
                            Enter the One Time Password (OTP) which has been sent to <strong>(+91 92222*****442)</strong>
                        </p>
                    </div>

                    {/* OTP Input */}
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg placeholder-gray-400"
                        placeholder="Enter Your OTP Here"
                    />

                    {/* Links */}
                    <div className="text-sm">
                        <p className="text-gray-700">
                            Didn't receive OTP?{' '}
                            <button className="text-blue-500 hover:underline font-medium">Resend OTP</button>
                        </p>
                        <p className="mt-2 text-gray-600">
                            <span className="font-medium">Having Trouble?</span>{' '}
                            <button className="text-black underline text-sm">Report Issue!</button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-between">
                    <button onClick={() => setPopup(false)} className="px-6 py-2 border border-gray-300 rounded-full text-black shadow-sm hover:bg-gray-100 cursor-pointer">
                        Close
                    </button>
                    <button className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
                        Verify Mobile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyMobileModal;
