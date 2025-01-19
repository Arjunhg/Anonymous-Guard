'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full border-b text-white border-white/5 
                ${scrolled ? 'bg-black/80' : 'bg-transparent'} 
                backdrop-blur-xl z-50 transition-all duration-300`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3">
                            <Link href={'/'} className="group flex flex-row items-center space-x-2">
                                <div className="h-10 w-10 bg-gradient-to-br from-sky-400 to-blue-400 
                                    flex items-center justify-center rounded-md shrink-0
                                    transition-transform duration-300 group-hover:scale-105">
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
                                <span className="text-lg font-semibold whitespace-nowrap
                                    group-hover:text-sky-400 transition-colors">
                                    AnonGuard
                                </span>
                            </Link>
                        </div>

                        {/* Main Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['submit-report', 'track-report', 'resources'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    className="relative text-sm text-zinc-400 hover:text-white transition-colors
                                        after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] 
                                        after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full"
                                >
                                    {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Link>
                            ))}
                        </div>

                        {/* Emergency Button */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href={'/contact'}
                                className="hidden md:block text-sm text-zinc-400 hover:text-white 
                                    transition-colors relative after:absolute after:left-0 after:bottom-[-4px] 
                                    after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full"
                            >
                                Contact
                            </Link>
                            <button className="group flex h-9 items-center gap-2 rounded-full 
                                bg-red-500/10 pl-4 pr-5 text-sm font-medium text-red-500 
                                ring-1 ring-inset ring-red-500/20 transition-all 
                                hover:bg-red-500/20 hover:scale-105">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite]"/>
                                Emergency: 100
                            </button>

                            {/* Mobile Menu Button */}
                            <button 
                                className="md:hidden p-2 text-zinc-400 hover:text-white
                                    transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg
                                    className={`h-6 w-6 transition-transform duration-300 
                                        ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isMobileMenuOpen 
                                            ? "M6 18L18 6M6 6l12 12" 
                                            : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-x-0 top-16 bg-black/90 backdrop-blur-xl 
                transform transition-transform duration-300 ease-in-out md:hidden
                ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="p-4 space-y-4">
                    {['submit-report', 'track-report', 'resources', 'contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            className="block py-2 text-base text-zinc-400 hover:text-white 
                                transition-colors hover:bg-white/5 rounded-lg px-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}