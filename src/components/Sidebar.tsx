"use client";

import { Home, User, Settings, Briefcase, FilePlus, Users, CreditCard, } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Employers Profile", href: "/profile", icon: User },
    { name: "Post A Job", href: "/dashboard/job/post", icon: FilePlus },
    { name: "My Jobs", href: "/jobs", icon: Briefcase },
    { name: "Saved Candidates", href: "/settings", icon: Users },
    { name: "Plans & Billings", href: "/Plans-Billings", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },


];

export default function Sidebar() {
    return (
        <aside
            className={cn(
                "sticky top-0 h-[80vh] w-64 border-r border-gray-200 bg-white p-4 mt-1 "
            )}
        >

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <item.icon size={20} />
                        {item.name}
                    </Link>
                ))}

            </nav>

        </aside>
    );
}
