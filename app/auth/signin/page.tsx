"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during sign in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-6"
        >
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Access
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-zinc-400">
            Sign in to access your admin dashboard
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-zinc-900/50 backdrop-blur-xl py-8 px-4 shadow-xl border border-white/5 rounded-2xl sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium mb-2 text-zinc-400 group-hover:text-sky-400 transition-colors">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                          text-white transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-sky-500/40
                          hover:border-sky-500/50"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-zinc-400 group-hover:text-sky-400 transition-colors">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                          text-white transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-sky-500/40
                          hover:border-sky-500/50"
                  placeholder="Enter your password"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
                        px-4 py-3.5 text-sm font-medium text-white shadow-lg
                        transition-all duration-200 hover:from-sky-400 hover:to-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign in</span>
                )}
              </motion.button>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center space-y-4"
            >
              <Link href="/auth/signup" className="text-sky-400 hover:text-sky-300 text-sm transition-colors">
                Don&apos;t have an account? Sign up
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}