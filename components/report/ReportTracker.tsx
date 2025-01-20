"use client";

import { useState } from "react";
import { Search, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportDetails {
  id: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
}

export function ReportTracker() {
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReportDetails(null);
    setLoading(true);

    if (!reportId.trim()) {
      setError("Please enter a report ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/reports/${reportId}/details`);
      if (!response.ok) {
        throw new Error("Report not found");
      }
      const data = await response.json();
      setReportDetails(data);
    } catch (err) {
      setError("Unable to find report. Please check the ID and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400"
        >
          <Search className="w-4 h-4" />
          Track Your Report Status
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent"
        >
          Track Your Report
          <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Stay Informed
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-zinc-400 max-w-xl mx-auto"
        >
          Enter your report ID to check the current status and updates
        </motion.p>
      </motion.div>

      {/* Dynamic Layout Container */}
      <div className="flex justify-center">
        <motion.div
          layout
          className={`transition-all duration-300 ease-in-out 
          ${reportDetails ? "w-full grid md:grid-cols-2 gap-8" : "max-w-lg w-full"}`}
        >
          {/* Form Section */}
          <motion.div
            layout
            className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/5 p-8 w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2 text-zinc-400 group-hover:text-sky-400 transition-colors">
                  Report ID
                </label>
                <input
                  type="text"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                           text-white transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-sky-500/40
                           hover:border-sky-500/50"
                  placeholder="Enter your report ID"
                  disabled={loading}
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
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
                         px-4 py-3.5 text-sm font-medium text-white shadow-lg
                         transition-all duration-200 hover:from-sky-400 hover:to-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>{loading ? "Searching..." : "Track Report"}</span>
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {reportDetails && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl p-8 h-full"
              >
                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  Report Details
                </h2>

                <div className="grid gap-4">
                  <motion.div 
                    className="flex flex-col space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                      <span className="text-zinc-400">Status</span>
                      <span
                        className={`font-medium ${getStatusColor(
                          reportDetails.status
                        )} 
                          px-3 py-1 rounded-full bg-white/5`}
                      >
                        {reportDetails.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-red-400 italic px-3">
                      Status will be updated when admin verifies it.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-zinc-400">Report ID</span>
                    <span className="text-white font-mono">
                      {reportDetails.reportId || reportDetails.id}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="text-zinc-400">Submitted On</span>
                    <span className="text-white">
                      {new Date(reportDetails.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="p-3 rounded-lg bg-white/5 space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <span className="text-zinc-400 text-sm">Title</span>
                    <span className="text-white block font-medium">
                      {reportDetails.title}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="p-3 rounded-lg bg-white/5 space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <span className="text-zinc-400 text-sm">Location</span>
                    <span className="text-white block font-medium">
                      {reportDetails.location}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="p-3 rounded-lg bg-white/5 space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-zinc-400 text-sm">Description</span>
                    <p className="text-white text-sm leading-relaxed">
                      {reportDetails.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: "text-yellow-400",
    processing: "text-sky-400",
    completed: "text-emerald-400",
    failed: "text-red-400",
  };
  return statusColors[status.toLowerCase()] || "text-white";
}