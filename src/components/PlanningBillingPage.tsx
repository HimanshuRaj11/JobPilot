'use client';

import React, { useState } from 'react';
import {
    CreditCard,
    Calendar,
    CheckCircle,
    Star,
    Download,
    Settings,
    Users,
    Briefcase,
    TrendingUp,
    AlertCircle
} from 'lucide-react';

interface Plan {
    id: string;
    name: string;
    price: number;
    period: 'month' | 'year';
    features: string[];
    jobPostings: number;
    candidateViews: number;
    support: string;
    popular?: boolean;
}

interface BillingHistory {
    id: string;
    date: string;
    amount: number;
    plan: string;
    status: 'paid' | 'pending' | 'failed';
    invoice: string;
}

const PlanningBillingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'plans' | 'billing' | 'usage'>('plans');
    const [selectedPlan, setSelectedPlan] = useState<string>('pro');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans: Plan[] = [
        {
            id: 'starter',
            name: 'Starter',
            price: billingCycle === 'monthly' ? 29 : 290,
            period: billingCycle === 'monthly' ? 'month' : 'year',
            features: [
                'Up to 5 job postings',
                'Basic candidate search',
                'Email support',
                'Standard job templates',
                'Basic analytics'
            ],
            jobPostings: 5,
            candidateViews: 100,
            support: 'Email'
        },
        {
            id: 'pro',
            name: 'Professional',
            price: billingCycle === 'monthly' ? 79 : 790,
            period: billingCycle === 'monthly' ? 'month' : 'year',
            features: [
                'Up to 25 job postings',
                'Advanced candidate search',
                'Priority support',
                'Custom job templates',
                'Advanced analytics',
                'Team collaboration',
                'Resume database access'
            ],
            jobPostings: 25,
            candidateViews: 500,
            support: 'Priority',
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: billingCycle === 'monthly' ? 199 : 1990,
            period: billingCycle === 'monthly' ? 'month' : 'year',
            features: [
                'Unlimited job postings',
                'AI-powered matching',
                '24/7 phone support',
                'White-label solution',
                'Custom integrations',
                'Dedicated account manager',
                'Advanced reporting',
                'API access'
            ],
            jobPostings: 999,
            candidateViews: 9999,
            support: '24/7 Phone'
        }
    ];

    const billingHistory: BillingHistory[] = [
        {
            id: 'inv-001',
            date: '2024-08-01',
            amount: 79,
            plan: 'Professional',
            status: 'paid',
            invoice: 'INV-2024-001'
        },
        {
            id: 'inv-002',
            date: '2024-07-01',
            amount: 79,
            plan: 'Professional',
            status: 'paid',
            invoice: 'INV-2024-002'
        },
        {
            id: 'inv-003',
            date: '2024-06-01',
            amount: 79,
            plan: 'Professional',
            status: 'paid',
            invoice: 'INV-2024-003'
        }
    ];

    const currentUsage = {
        jobPostings: { used: 18, limit: 25, percentage: 72 },
        candidateViews: { used: 342, limit: 500, percentage: 68 },
        teamMembers: { used: 3, limit: 10, percentage: 30 }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'text-green-600 bg-green-50';
            case 'pending': return 'text-yellow-600 bg-yellow-50';
            case 'failed': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getUsageColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Plans & Billing</h1>
                    <p className="text-gray-600">Manage your subscription and billing information</p>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: 'plans', label: 'Subscription Plans', icon: Star },
                                { key: 'billing', label: 'Billing History', icon: CreditCard },
                                { key: 'usage', label: 'Usage & Limits', icon: TrendingUp }
                            ].map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key as any)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === key
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Plans Tab */}
                {activeTab === 'plans' && (
                    <div className="space-y-6">
                        {/* Current Plan Status */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                                    <p className="text-gray-600">You're currently on the Professional plan</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="text-green-500" size={20} />
                                    <span className="text-sm text-green-600 font-medium">Active</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{formatPrice(79)}/month</p>
                                    <p className="text-sm text-gray-500">Next billing: September 1, 2024</p>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                    <Settings size={16} className="inline mr-2" />
                                    Manage Plan
                                </button>
                            </div>
                        </div>

                        {/* Billing Cycle Toggle */}
                        <div className="flex justify-center">
                            <div className="bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${billingCycle === 'monthly'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${billingCycle === 'yearly'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500'
                                        }`}
                                >
                                    Yearly (Save 17%)
                                </button>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`bg-white rounded-lg shadow-sm border-2 p-6 relative ${plan.popular ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                                        <div className="mb-4">
                                            <span className="text-3xl font-bold text-gray-900">
                                                {formatPrice(plan.price)}
                                            </span>
                                            <span className="text-gray-500">/{plan.period}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Briefcase size={16} className="mr-2" />
                                            {plan.jobPostings === 999 ? 'Unlimited' : plan.jobPostings} job postings
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Users size={16} className="mr-2" />
                                            {plan.candidateViews === 9999 ? 'Unlimited' : plan.candidateViews} candidate views
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle size={16} className="mr-2 text-green-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-2 px-4 rounded-md font-medium ${selectedPlan === plan.id
                                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                            : plan.popular
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                            }`}
                                        disabled={selectedPlan === plan.id}
                                    >
                                        {selectedPlan === plan.id ? 'Current Plan' : 'Upgrade'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Billing History Tab */}
                {activeTab === 'billing' && (
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
                            <p className="text-gray-600">Download invoices and view payment history</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Plan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Invoice
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {billingHistory.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.plan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {formatPrice(item.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                                                    <Download size={14} />
                                                    <span>{item.invoice}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Usage Tab */}
                {activeTab === 'usage' && (
                    <div className="space-y-6">
                        {/* Current Usage Overview */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Usage</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-700">Job Postings</h3>
                                        <Briefcase size={20} className="text-gray-400" />
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {currentUsage.jobPostings.used}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            / {currentUsage.jobPostings.limit}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getUsageColor(currentUsage.jobPostings.percentage)}`}
                                            style={{ width: `${currentUsage.jobPostings.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {currentUsage.jobPostings.percentage}% used
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-700">Candidate Views</h3>
                                        <Users size={20} className="text-gray-400" />
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {currentUsage.candidateViews.used}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            / {currentUsage.candidateViews.limit}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getUsageColor(currentUsage.candidateViews.percentage)}`}
                                            style={{ width: `${currentUsage.candidateViews.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {currentUsage.candidateViews.percentage}% used
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-gray-700">Team Members</h3>
                                        <Users size={20} className="text-gray-400" />
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {currentUsage.teamMembers.used}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            / {currentUsage.teamMembers.limit}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getUsageColor(currentUsage.teamMembers.percentage)}`}
                                            style={{ width: `${currentUsage.teamMembers.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {currentUsage.teamMembers.percentage}% used
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Usage Alerts */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Alerts</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                                    <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">
                                            Approaching Job Posting Limit
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                            You've used 72% of your job posting limit. Consider upgrading to avoid interruption.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Usage Chart Placeholder */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h3>
                            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Usage chart would be displayed here</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlanningBillingPage;