'use client';
import Link from "next/link";
import { useState } from "react";
// import MobileMenu

export default function Navbar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 border-b text-white border-white/5 bg-black/60 backdrop-blur-xl z-50">
                {/* this div houses all the element inside the navbar */}
                <div className="mx-auto max-w-7xl">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3">
                            <Link href={'/'} className="flex flex-row items-center space-x-2">
                                <div className="h-10 w-10 bg-gradient-to-br from-sky-400 to-blue-400 flex items-center justify-center rounded-md shrink-0">
                                    {/* svg for logo */}
                                    <svg
                                        className="h-6 w-6 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                {/* Brand Name */}
                                <span className="text-lg font-semibold whitespace-nowrap">
                                    Anonymous Guard
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}