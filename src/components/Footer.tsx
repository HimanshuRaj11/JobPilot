import { Briefcase } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <div className="mt-5 flex justify-center items-center bg-gray-100 py-4">

            {/* <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <span className="ml-3 text-xl font-bold">HireConnect</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                The modern hiring platform that connects companies with top talent worldwide.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <div className="space-y-2">
                                <a href="#" className="text-gray-400 hover:text-white block">About</a>
                                <a href="#" className="text-gray-400 hover:text-white block">Careers</a>
                                <a href="#" className="text-gray-400 hover:text-white block">Contact</a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <div className="space-y-2">
                                <a href="#" className="text-gray-400 hover:text-white block">Help Center</a>
                                <a href="#" className="text-gray-400 hover:text-white block">Privacy</a>
                                <a href="#" className="text-gray-400 hover:text-white block">Terms</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 HireConnect. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
            <footer className="text-center text-xs text-gray-400">
                © 2025 JobPilot - Job Board. All rights Reserved
            </footer>
        </div>
    )
}
