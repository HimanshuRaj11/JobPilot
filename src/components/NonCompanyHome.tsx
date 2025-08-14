import { ArrowRight, Users, Briefcase, Target, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';

export default function NonCompanyHomePage() {
    const [hoveredFeature, setHoveredFeature] = useState<any>(null);

    const features = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Top Talent Pool",
            description: "Access thousands of qualified candidates actively seeking opportunities"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Smart Matching",
            description: "AI-powered algorithms match the right candidates to your specific requirements"
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Easy Management",
            description: "Streamlined dashboard to manage applications, interviews, and hiring process"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            company: "TechStart Inc.",
            role: "HR Director",
            quote: "Found our perfect developer in just 2 weeks. The quality of candidates is exceptional!",
            rating: 5
        },
        {
            name: "Mike Rodriguez",
            company: "Growth Labs",
            role: "CEO",
            quote: "This platform revolutionized our hiring process. Highly recommend to any growing company.",
            rating: 5
        }
    ];

    const benefits = [
        "Post unlimited job listings",
        "Access to verified candidate profiles",
        "Advanced filtering and search tools",
        "Real-time application tracking",
        "Interview scheduling integration",
        "24/7 customer support"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                            Trusted by 500+ Companies
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Find Your Next
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                Star Employee
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Connect with top talent and streamline your hiring process. Join thousands of companies
                            who trust our platform to find the perfect candidates for their teams.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="/company/register"
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                            >
                                Register Your Company
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button className="text-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                                Learn More
                            </button>
                        </div>

                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-blue-600">10K+</div>
                                <div className="text-gray-600 mt-1">Active Candidates</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-600">500+</div>
                                <div className="text-gray-600 mt-1">Companies</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600">95%</div>
                                <div className="text-gray-600 mt-1">Success Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-orange-600">2 Weeks</div>
                                <div className="text-gray-600 mt-1">Avg. Hire Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Why Companies Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform is designed to make hiring faster, smarter, and more effective than ever before.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature: any, index: number) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={`inline-flex p-3 rounded-lg mb-6 transition-colors ${hoveredFeature === index
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Everything You Need to Hire Successfully
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Get access to all the tools and features that make hiring effortless and effective.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-300 mr-3 flex-shrink-0" />
                                        <span className="text-lg">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="/company/register"
                                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg mt-8 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Start Hiring Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <div className="space-y-4">
                                    <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Loved by HR Teams Everywhere
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-lg mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Transform Your Hiring?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Join hundreds of companies who have already revolutionized their recruitment process.
                    </p>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg inline-block">
                        <a
                            href="/company/register"
                            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                            Register Your Company Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </div>

                    <p className="text-gray-500 mt-6">
                        Free to get started • No credit card required • Setup in minutes
                    </p>
                </div>
            </section>


        </div>
    );
}