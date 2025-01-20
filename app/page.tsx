'use client';
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: _, status } = useSession();
  
  // Add fade-in effect on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return(
    <main className="relative px-4 sm:px-6 lg:px-8 pt-32 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section with improved responsiveness */}
        <div className="flex flex-col items-center text-center reveal">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border 
            border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400
            transform transition-transform hover:scale-105">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure & Anonymous Reporting
          </div>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent
              animate-text-gradient">
              Report Incident.
            </span>
            <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text 
              text-transparent animate-text-gradient-reverse">
              Protect Identity.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400
            animate-fade-in">
            Make your community safer without compromising your safety. Our
            advanced encryption ensures your identity remains completely
            anonymous.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link href={"/submit-report"}>
              <button className="group relative flex h-12 items-center justify-center gap-2 
                rounded-xl bg-sky-500 px-6 sm:px-8 text-sm font-medium text-white 
                transition-all hover:bg-sky-400 hover:scale-105">
                Make Anonymous Report
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>

            <Link href={"/how-it-works"}>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/5 px-8 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10">
                How it Works
              </button>
            </Link>

            {/* New Admin Button */}
            <Link href={status === "authenticated" ? "/dashboard" : "/auth/signin"}>
              <button className="flex h-12 items-center justify-center gap-2 
                rounded-xl bg-zinc-900/80 px-8 text-sm font-medium text-zinc-400
                ring-1 ring-inset ring-zinc-800 transition-all 
                hover:bg-zinc-800 hover:text-zinc-300 hover:ring-zinc-700">
                {status === "authenticated" ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Admin Dashboard</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Admin Sign In</span>
                  </>
                )}
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid Section */}
        <div className="mt-32 sm:mt-40 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal">
          {[
             {
              title: "Military-Grade Encryption",
              description:
                "Your identity is protected with state-of-the-art encryption protocols",
              icon: (
                <svg
                  className="h-6 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
            },
            {
              title: "Real-time Processing",
              description:
                "Instant verification and secure routing of all reports",
              icon: (
                <svg
                  className="h-6 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: "Secure Communication",
              description: "Two-way anonymous channel with law enforcement",
              icon: (
                <svg
                  className="h-6 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              ),
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 sm:p-8
                transition-all duration-300 hover:bg-zinc-800/80 hover:transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent 
                opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-sky-500/10 p-3
                  transform transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium text-white
                  transition-colors group-hover:text-sky-400">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400
                  transition-colors group-hover:text-zinc-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 sm:mt-40 rounded-2xl bg-zinc-900 p-8 reveal
          transform transition-transform hover:scale-[1.01]">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "100K+", label: "Reports Filed" },
              { value: "100%", label: "Anonymity Rate" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, i) => (
              <div key={i} className="text-center transform transition-transform
                hover:scale-105">
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 
                  to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-32 sm:mt-40 mb-20 flex justify-center reveal">
          <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 
            px-5 py-2 text-sm text-zinc-400 transform transition-transform 
            hover:scale-105">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by Law Enforcement Nationwide
          </div>
        </div>
      </div>
    </main>
  )
}