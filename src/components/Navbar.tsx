"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, UserRound, Bell, X, ChevronDown, LogOut, Settings, User as UserIcon, Building } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUser, LogoutUser } from "@/app/Redux/Slice/User.slice";
import { FetchCompany } from "@/app/Redux/Slice/Company.slice";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function Navbar() {
    const { User, loading } = useSelector((state: any) => state.User);
    const { Company } = useSelector((state: any) => state.Company);
    console.log(User, Company);

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);
    const dispatch = useDispatch();

    const menuItems = [
        { name: "Home", href: "/" },
        ...(Company ? [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Find Candidates", href: "/find-candidates" },
            { name: "My Jobs", href: "/jobs" },
        ] : []),
        { name: "Applications", href: "/applications" },
        { name: "Support", href: "/support" },
    ];

    const profileMenuItems = [
        { name: "Profile", href: "/profile", icon: UserIcon },
        { name: "Settings", href: "/settings", icon: Settings },
        ...(Company ? [{ name: "Company Profile", href: "/dashboard", icon: Building }] : []),
        ...(User?.role == 'company' && !Company ? [{ name: "Register Company Profile", href: "/company/register", icon: Building }] : [])
    ];

    // Function to check if a link is active
    const isActiveLink = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    const handleLogout = useCallback(
        async () => {
            try {
                await dispatch(LogoutUser() as any);
                setIsProfileOpen(false);
                router.push('/login')
            } catch (error) {
                console.error("Logout error:", error);
            }
        }, [])

    useEffect(() => {
        dispatch(FetchUser() as any);
        dispatch(FetchCompany() as any);
    }, [dispatch, handleLogout]);


    return (
        <header className="w-full sticky top-0 z-50 bg-white">
            {loading && <Loader />}

            {/* Top Info Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 text-sm text-gray-600 py-2 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Left: Contact Info */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                            <Phone size={14} />
                            <span className="font-medium">+91 7320869391</span>
                        </div>
                    </div>

                    {/* Right: Language Selector */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://flagcdn.com/w20/in.png"
                                alt="India Flag"
                                width={18}
                                height={12}
                                className="rounded-sm shadow-sm"
                            />
                            <select className="bg-transparent text-sm outline-none cursor-pointer hover:text-blue-600 transition-colors">
                                <option>English</option>
                                <option>हिंदी</option>
                                <option>Spanish</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white shadow-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <span className="text-white font-bold text-sm">J</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                JobPilot
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        {User ? (
                            <div className="hidden lg:flex space-x-8 items-center">
                                {menuItems.map((item) => {
                                    const active = isActiveLink(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`transition-colors font-medium relative group ${active
                                                ? 'text-blue-600'
                                                : 'text-gray-600 hover:text-blue-600'
                                                }`}
                                        >
                                            {item.name}
                                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${active
                                                ? 'w-full'
                                                : 'w-0 group-hover:w-full'
                                                }`}></span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center space-x-4">
                                <Link
                                    href="/register"
                                    className={`transition-colors font-medium ${isActiveLink('/register')
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/login"
                                    className={`px-6 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg ${isActiveLink('/login')
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}

                        {/* Right Side - Authenticated User */}
                        {User && (
                            <div className="hidden lg:flex items-center space-x-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group">
                                    <Bell size={20} />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                                            {notificationCount > 9 ? '9+' : notificationCount}
                                        </span>
                                    )}
                                </button>

                                {/* Post Job Button - Company Only */}
                                {Company && (
                                    <Link
                                        href="/dashboard/job/post"
                                        className={`px-5 py-2 rounded-lg transition-all font-medium shadow-md hover:shadow-lg hover:scale-105 transform ${isActiveLink('/dashboard/job/post')
                                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                                            }`}
                                    >
                                        + Post Job
                                    </Link>
                                )}

                                {/* Profile Dropdown */}
                                <div className="relative profile-menu-container">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                            {User?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Profile Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{User?.name || 'User'}</p>
                                                <p className="text-xs text-gray-500">{User?.email}</p>
                                                {Company && (
                                                    <p className="text-xs text-blue-600 font-medium mt-1">{Company?.name}</p>
                                                )}
                                            </div>
                                            {profileMenuItems.map((item) => {
                                                const active = isActiveLink(item.href);
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${active
                                                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                            }`}
                                                        onClick={() => setIsProfileOpen(false)}
                                                    >
                                                        <item.icon size={16} />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                );
                                            })}
                                            <hr className="my-2 border-gray-100" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                            >
                                                <LogOut size={16} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden mobile-menu-container">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
                        <div className="px-4 py-4 space-y-2">
                            {User ? (
                                <>
                                    {/* User Info */}
                                    <div className="flex items-center space-x-3 py-3 px-2 bg-blue-50 rounded-lg mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                            {User?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{User?.name || 'User'}</p>
                                            <p className="text-sm text-gray-500">{User?.email}</p>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    {menuItems.map((item) => {
                                        const active = isActiveLink(item.href);
                                        return (
                                            <Link
                                                key={item.name}
                                                href={'/'}
                                                className={`block py-3 px-4 rounded-lg transition-colors font-medium ${active
                                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push(item.href);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}

                                    {/* Profile Links */}
                                    {profileMenuItems.map((item) => {
                                        const active = isActiveLink(item.href);
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${active
                                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsOpen(false);
                                                    router.push(item.href);
                                                }}
                                            >
                                                <item.icon size={18} />
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}

                                    {/* Post Job Button - Mobile */}
                                    {Company && (
                                        <Link
                                            href="/dashboard/job/post"
                                            className={`block text-center py-3 px-4 rounded-lg transition-all font-medium shadow-md mt-4 ${isActiveLink('/dashboard/job/post')
                                                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsOpen(false);
                                                router.push('/dashboard/job/post');
                                            }}
                                        >
                                            + Post A Job
                                        </Link>
                                    )}

                                    {/* Logout Button */}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center space-x-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left mt-2"
                                    >
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </>
                            ) : (
                                // Non-authenticated mobile menu
                                <div className="space-y-2">
                                    <Link
                                        href="/register"
                                        className={`block py-3 px-4 rounded-lg transition-colors font-medium text-center ${isActiveLink('/register')
                                            ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        href="/login"
                                        className={`block py-3 px-4 rounded-lg transition-colors font-medium text-center shadow-md ${isActiveLink('/login')
                                            ? 'bg-blue-700 text-white'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/login');
                                            setIsOpen(false);
                                        }}
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}