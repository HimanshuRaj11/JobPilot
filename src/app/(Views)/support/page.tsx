'use client'
import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronDown, ChevronUp, Search, Users, Briefcase, HelpCircle, Send, MapPin, Clock } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    category: string;
}

const page: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const faqs: FAQItem[] = [
        {
            question: "How do I create a job posting?",
            answer: "To create a job posting, log into your employer account, navigate to the 'Post a Job' section, fill in the required details including job title, description, requirements, and salary range. Your posting will be live within 24 hours after review."
        },
        {
            question: "How can I improve my job search results?",
            answer: "Use specific keywords related to your desired role, set up job alerts for your preferred criteria, complete your profile 100%, and regularly update your skills and experience. Our algorithm prioritizes active and complete profiles."
        },
        {
            question: "What are the different subscription plans?",
            answer: "We offer three plans: Basic (free with limited features), Professional ($29/month with premium job alerts and profile highlighting), and Enterprise (custom pricing for companies with bulk hiring needs)."
        },
        {
            question: "How do I reset my password?",
            answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email. If you don't receive an email within 10 minutes, check your spam folder or contact support."
        },
        {
            question: "Can I edit my job application after submission?",
            answer: "Once submitted, applications cannot be edited. However, you can withdraw your application and resubmit with corrections if the job posting is still active. We recommend reviewing all details before submitting."
        },
        {
            question: "How long do job postings stay active?",
            answer: "Standard job postings remain active for 30 days. Premium postings can stay active for up to 60 days. Employers can renew or extend postings through their dashboard."
        }
    ];

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Support",
            description: "Get detailed help via email",
            contact: "support@jobfinder.com",
            responseTime: "Within 24 hours"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Speak with our support team",
            contact: "+1 (555) 123-4567",
            responseTime: "Mon-Fri 9AM-6PM EST"
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Instant help for urgent issues",
            contact: "Available in app",
            responseTime: "Average 2 minutes"
        }
    ];

    const categories = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'technical', label: 'Technical Issue' },
        { value: 'billing', label: 'Billing & Payments' },
        { value: 'account', label: 'Account Management' },
        { value: 'jobs', label: 'Job Posting Issues' },
        { value: 'feature', label: 'Feature Request' }
    ];

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Thank you for contacting us! We\'ll get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            category: 'general'
        });
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Support Center</h1>
                        <p className="text-lg text-gray-600">We're here to help you succeed in your career journey</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Help Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {contactMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <IconComponent className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-3">{method.description}</p>
                                <p className="font-medium text-blue-600 mb-2">{method.contact}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {method.responseTime}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Brief description of your issue"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                                    placeholder="Please provide as much detail as possible..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                            <p className="text-gray-600">Quick answers to common questions about our platform.</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                                    >
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                        {openFAQ === index ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                    {openFAQ === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <HelpCircle className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-2">Still need help?</h3>
                                    <p className="text-blue-700 text-sm mb-3">
                                        Can't find the answer you're looking for? Our support team is ready to assist you.
                                    </p>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors">
                                        Contact Support →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Additional Resources</h2>
                        <p className="text-gray-300">Explore our help documentation and community</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-4 mb-4 inline-block">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Knowledge Base</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Comprehensive guides and tutorials
                            </p>
                            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors">
                                Browse Articles →
                            </button>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-4 mb-4 inline-block">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Community Forum</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Connect with other users and experts
                            </p>
                            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors">
                                Join Discussion →
                            </button>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-4 mb-4 inline-block">
                                <Briefcase className="h-8 w-8" />
                            </div>
                            <h3 className="font-semibold mb-2">Video Tutorials</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Step-by-step video guides
                            </p>
                            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors">
                                Watch Videos →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;