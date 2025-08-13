"use client";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>

                {/* Inner Glow */}
                <div className="absolute inset-2 border-4 border-transparent border-b-cyan-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
        </div>
    );
}
